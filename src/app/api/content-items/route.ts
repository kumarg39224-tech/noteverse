import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApiUser } from '@/lib/api-auth';
import { contentItemSchema } from '@/lib/validations';

export async function GET() {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const items = await db.contentItem.findMany({ where: { project: { userId: user.id } }, include: { project: true }, orderBy: { publishDate: 'asc' } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const parsed = contentItemSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const item = await db.contentItem.create({ data: { ...parsed.data, publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : null } });
  return NextResponse.json(item);
}
