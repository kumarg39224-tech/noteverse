import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApiUser } from '@/lib/api-auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const { id } = await params;
  const existing = await db.note.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const note = await db.note.update({ where: { id }, data: await req.json() });
  return NextResponse.json(note);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const { id } = await params;
  const existing = await db.note.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await db.note.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
