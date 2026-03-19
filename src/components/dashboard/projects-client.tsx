'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

type Project = { id: string; title: string; status: string; category: string | null; deadline: string | null };

export function ProjectsClient({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [title, setTitle] = useState('');

  async function addProject() {
    const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, status: 'PLANNING' }) });
    if (!res.ok) return toast.error('Failed creating project');
    const project = await res.json();
    setProjects((p) => [project, ...p]);
    setTitle('');
    toast.success('Project created');
  }

  async function removeProject(id: string) {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New project title" className="flex-1 rounded-lg border border-input bg-card p-3" />
        <button onClick={addProject} className="rounded-lg bg-primary px-4 text-primary-foreground">Add</button>
      </div>
      <div className="grid gap-3">
        {projects.map((project) => (
          <article key={project.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <Link href={`/dashboard/projects/${project.id}`} className="font-semibold hover:text-primary">{project.title}</Link>
              <div className="flex gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs">{project.status}</span>
                <button onClick={() => removeProject(project.id)} className="text-xs text-red-400">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
