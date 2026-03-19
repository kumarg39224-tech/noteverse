import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/server-auth';

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const project = await db.project.findFirst({ where: { id, userId: user.id }, include: { tasks: true, notes: true, content: true } });
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">{project.title}</h2>
        <p className="text-muted-foreground">{project.description ?? 'No description yet.'}</p>
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4"><h3 className="font-semibold">Tasks</h3><p className="mt-2 text-3xl font-bold">{project.tasks.length}</p></div>
        <div className="rounded-xl border border-border bg-card p-4"><h3 className="font-semibold">Notes</h3><p className="mt-2 text-3xl font-bold">{project.notes.length}</p></div>
        <div className="rounded-xl border border-border bg-card p-4"><h3 className="font-semibold">Content items</h3><p className="mt-2 text-3xl font-bold">{project.content.length}</p></div>
      </section>
    </div>
  );
}
