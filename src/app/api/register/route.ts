import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/lib/db';
import { signupSchema } from '@/lib/validations';

export async function POST(req: Request) {
  const payload = await req.json();
  const parsed = signupSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return NextResponse.json({ error: 'Email already exists' }, { status: 409 });

  const user = await db.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hash(parsed.data.password, 10)
    }
  });

  await db.activityLog.create({ data: { userId: user.id, message: 'Signed up to CreatorFlow' } });
  return NextResponse.json({ ok: true });
}
