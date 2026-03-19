import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApiUser } from '@/lib/api-auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const { id } = await params;
  const existing = await db.task.findFirst({ where: { id, project: { userId: user.id } } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const body = await req.json();
  const task = await db.task.update({ where: { id }, data: { ...body, dueDate: body.dueDate ? new Date(body.dueDate) : undefined } });
  return NextResponse.json(task);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const { id } = await params;
  const existing = await db.task.findFirst({ where: { id, project: { userId: user.id } } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await db.task.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
