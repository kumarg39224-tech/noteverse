'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type Task = { id: string; title: string; completed: boolean; priority: 'LOW'|'MEDIUM'|'HIGH'|'URGENT'; projectId: string; project: { title: string } };
type Project = { id: string; title: string };

export function TasksClient({ initial, projects }: { initial: Task[]; projects: Project[] }) {
  const [tasks, setTasks] = useState(initial);
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('ALL');
  const [projectId, setProjectId] = useState('ALL');

  const filtered = useMemo(() => tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) &&
    (priority === 'ALL' || t.priority === priority) &&
    (projectId === 'ALL' || t.projectId === projectId)
  ), [tasks, query, priority, projectId]);

  async function toggle(task: Task) {
    const res = await fetch(`/api/tasks/${task.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !task.completed }) });
    if (!res.ok) return toast.error('Could not update task');
    setTasks((current) => current.map((t) => t.id === task.id ? { ...t, completed: !t.completed } : t));
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks" className="rounded-lg border border-input bg-card p-2" />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded-lg border border-input bg-card p-2"><option value="ALL">All priority</option><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>URGENT</option></select>
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="rounded-lg border border-input bg-card p-2"><option value="ALL">All projects</option>{projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select>
      </div>
      <div className="space-y-2">
        {filtered.map((task) => (
          <div key={task.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
            <div>
              <p className={task.completed ? 'line-through text-muted-foreground' : 'font-medium'}>{task.title}</p>
              <p className="text-xs text-muted-foreground">{task.project.title} · {task.priority}</p>
            </div>
            <button onClick={() => toggle(task)} className="rounded-lg border border-border px-3 py-1 text-xs">{task.completed ? 'Reopen' : 'Complete'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
