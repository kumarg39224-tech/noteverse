import { db } from '@/lib/db';
import { requireUser } from '@/lib/server-auth';
import { ProjectsClient } from '@/components/dashboard/projects-client';

export default async function ProjectsPage() {
  const user = await requireUser();
  const projects = await db.project.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' } });
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      <ProjectsClient initial={projects.map((p) => ({ ...p, deadline: p.deadline?.toISOString() ?? null }))} />
    </div>
  );
}
