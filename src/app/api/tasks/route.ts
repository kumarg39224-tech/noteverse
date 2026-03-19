import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApiUser } from '@/lib/api-auth';
import { taskSchema } from '@/lib/validations';

export async function GET() {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const tasks = await db.task.findMany({ where: { project: { userId: user.id } }, include: { project: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const parsed = taskSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const task = await db.task.create({
    data: { ...parsed.data, dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null, assigneeId: user.id }
  });
  return NextResponse.json(task);
}
