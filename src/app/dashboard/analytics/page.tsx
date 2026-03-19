import { db } from '@/lib/db';
import { requireUser } from '@/lib/server-auth';
import { ProductivityChart } from '@/components/dashboard/productivity-chart';

export default async function AnalyticsPage() {
  const user = await requireUser();
  const [taskDone, activeProjects, upcoming, contentPublished] = await Promise.all([
    db.task.count({ where: { project: { userId: user.id }, completed: true } }),
    db.project.count({ where: { userId: user.id, status: { not: 'DONE' } } }),
    db.task.count({ where: { project: { userId: user.id }, completed: false, dueDate: { gte: new Date() } } }),
    db.contentItem.count({ where: { project: { userId: user.id }, status: 'PUBLISHED' } })
  ]);
  const trend = [{ day: 'W1', value: 12 }, { day: 'W2', value: 16 }, { day: 'W3', value: 11 }, { day: 'W4', value: 19 }];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {[['Tasks completed', taskDone], ['Active projects', activeProjects], ['Upcoming deadlines', upcoming], ['Published content', contentPublished]].map(([label, value]) => (
          <div key={String(label)} className="rounded-xl border border-border bg-card p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-bold">{String(value)}</p></div>
        ))}
      </div>
      <ProductivityChart data={trend} />
    </div>
  );
}
