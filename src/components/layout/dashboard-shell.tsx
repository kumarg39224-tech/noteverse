import Link from 'next/link';

const nav = [
  ['Overview', '/dashboard'],
  ['Projects', '/dashboard/projects'],
  ['Tasks', '/dashboard/tasks'],
  ['Notes', '/dashboard/notes'],
  ['Analytics', '/dashboard/analytics'],
  ['Settings', '/dashboard/settings']
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-border/60 bg-card/60 p-4 md:block">
      <p className="mb-4 text-xl font-bold">CreatorFlow</p>
      <nav className="space-y-2">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{label}</Link>
        ))}
      </nav>
    </aside>
  );
}
