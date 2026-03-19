import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApiUser } from '@/lib/api-auth';
import { noteSchema } from '@/lib/validations';

export async function GET() {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const notes = await db.note.findMany({ where: { userId: user.id }, include: { project: true }, orderBy: { updatedAt: 'desc' } });
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const parsed = noteSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const note = await db.note.create({ data: { ...parsed.data, userId: user.id } });
  return NextResponse.json(note);
}
