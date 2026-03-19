import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApiUser } from '@/lib/api-auth';
import { projectSchema } from '@/lib/validations';

export async function GET() {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const projects = await db.project.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' } });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const user = await getApiUser();
  if (user instanceof NextResponse) return user;
  const parsed = projectSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const project = await db.project.create({
    data: {
      ...parsed.data,
      deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : null,
      userId: user.id
    }
  });
  return NextResponse.json(project);
}
