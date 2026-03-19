import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApiUser } from '@/lib/api-auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const { id } = await params;
  const existing = await db.contentItem.findFirst({ where: { id, project: { userId: user.id } } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const body = await req.json();
  const item = await db.contentItem.update({ where: { id }, data: body });
  return NextResponse.json(item);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const { id } = await params;
  const existing = await db.contentItem.findFirst({ where: { id, project: { userId: user.id } } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await db.contentItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
