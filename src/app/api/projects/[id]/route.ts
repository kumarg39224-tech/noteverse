import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApiUser } from '@/lib/api-auth';
import { projectSchema } from '@/lib/validations';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const { id } = await params;
  const existing = await db.project.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const parsed = projectSchema.partial().safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const project = await db.project.update({
    where: { id },
    data: { ...parsed.data, deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : undefined }
  });
  return NextResponse.json(project);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const { id } = await params;
  const existing = await db.project.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await db.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
