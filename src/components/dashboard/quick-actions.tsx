'use client';

import { useState } from 'react';

export function QuickActions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="rounded-lg border border-border px-3 py-2 text-sm">Quick actions ⌘K</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-24" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold">Quick action</h3>
            <p className="mt-2 text-sm text-muted-foreground">Jump to projects, tasks, notes, or analytics from one command surface.</p>
          </div>
        </div>
      )}
    </>
  );
}
