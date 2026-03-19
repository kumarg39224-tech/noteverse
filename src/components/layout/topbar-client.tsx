'use client';

import { signOut } from 'next-auth/react';

export default function Topbar({ name }: { name: string }) {
  return (
    <header className="flex items-center justify-between border-b border-border/60 px-6 py-4">
      <h1 className="text-lg font-semibold">Welcome, {name}</h1>
      <button onClick={() => signOut({ callbackUrl: '/' })} className="rounded-lg border border-border px-3 py-2 text-sm">Logout</button>
    </header>
  );
}
