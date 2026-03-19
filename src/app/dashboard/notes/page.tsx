import { db } from '@/lib/db';
import { requireUser } from '@/lib/server-auth';
import { NotesClient } from '@/components/dashboard/notes-client';

export default async function NotesPage() {
  const user = await requireUser();
  const [notes, items] = await Promise.all([
    db.note.findMany({ where: { userId: user.id }, include: { project: { select: { title: true } } }, orderBy: { updatedAt: 'desc' } }),
    db.contentItem.findMany({ where: { project: { userId: user.id } }, orderBy: { publishDate: 'asc' } })
  ]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Notes & Content Planner</h2>
      <NotesClient initialNotes={notes} initialItems={items.map((i) => ({ ...i, publishDate: i.publishDate?.toISOString() ?? null }))} />
    </div>
  );
}
