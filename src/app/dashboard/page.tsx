import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/server-auth';
import { ProductivityChart } from '@/components/dashboard/productivity-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default async function DashboardPage() {
  const user = await requireUser();
  const [projects, tasks, activity] = await Promise.all([
    db.project.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' }, take: 5 }),
    db.task.findMany({ where: { project: { userId: user.id }, completed: false }, include: { project: true }, orderBy: { dueDate: 'asc' }, take: 5 }),
    db.activityLog.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, take: 5 })
  ]);

  const chartData = [
    { day: 'Mon', value: 4 },
    { day: 'Tue', value: 6 },
    { day: 'Wed', value: 8 },
    { day: 'Thu', value: 5 },
    { day: 'Fri', value: 9 },
    { day: 'Sat', value: 7 },
    { day: 'Sun', value: 6 }
  ];

  return (
    <div className="space-y-6">
      <QuickActions />
      <section className="grid gap-4 md:grid-cols-4">
        {[['Active projects', String(projects.length)], ['Open tasks', String(tasks.length)], ['Upcoming deadlines', String(tasks.filter(t => t.dueDate).length)], ['Weekly streak', '5 days']].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </section>
      <ProductivityChart data={chartData} />
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="font-semibold">Upcoming deadlines</h3>
          <div className="mt-3 space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-lg bg-muted/50 p-3 text-sm">{task.title} · {task.project.title}</div>
            ))}
            {tasks.length === 0 && <p className="text-sm text-muted-foreground">No deadlines yet.</p>}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="font-semibold">Recent activity</h3>
          <div className="mt-3 space-y-2">
            {activity.map((a) => <div key={a.id} className="rounded-lg bg-muted/50 p-3 text-sm">{a.message}</div>)}
          </div>
          <Link href="/dashboard/analytics" className="mt-4 inline-block text-sm text-primary">View full analytics →</Link>
        </div>
      </section>
    </div>
  );
}
