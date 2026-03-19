'use client';

import { useState } from 'react';
import { toast } from 'sonner';

type Note = { id: string; title: string; body: string; project: { title: string } | null };
type ContentItem = { id: string; title: string; platform: string; status: string; publishDate: string | null };

export function NotesClient({ initialNotes, initialItems }: { initialNotes: Note[]; initialItems: ContentItem[] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function createNote() {
    const res = await fetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, body }) });
    if (!res.ok) return toast.error('Note creation failed');
    const created = await res.json();
    setNotes((n) => [{ ...created, project: null }, ...n]);
    setTitle(''); setBody('');
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-semibold">Notes</h3>
        <div className="mt-3 space-y-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" className="w-full rounded-lg border border-input bg-background p-2" />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Note body" className="h-24 w-full rounded-lg border border-input bg-background p-2" />
          <button onClick={createNote} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">Save note</button>
        </div>
        <div className="mt-4 space-y-2">
          {notes.map((note) => <article key={note.id} className="rounded-lg bg-muted/50 p-3"><h4 className="font-medium">{note.title}</h4><p className="text-sm text-muted-foreground">{note.body}</p></article>)}
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-semibold">Content planner</h3>
        <div className="mt-4 space-y-2">
          {initialItems.map((item) => (
            <div key={item.id} className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.platform} · {item.status} · {item.publishDate?.slice(0, 10) ?? 'No date'}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
