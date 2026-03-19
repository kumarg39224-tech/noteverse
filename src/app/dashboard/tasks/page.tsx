import { db } from '@/lib/db';
import { requireUser } from '@/lib/server-auth';
import { TasksClient } from '@/components/dashboard/tasks-client';

export default async function TasksPage() {
  const user = await requireUser();
  const [tasks, projects] = await Promise.all([
    db.task.findMany({ where: { project: { userId: user.id } }, include: { project: true }, orderBy: { createdAt: 'desc' } }),
    db.project.findMany({ where: { userId: user.id }, select: { id: true, title: true } })
  ]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tasks</h2>
      <TasksClient initial={tasks.map((t) => ({ ...t, priority: t.priority as 'LOW'|'MEDIUM'|'HIGH'|'URGENT' }))} projects={projects} />
    </div>
  );
}
