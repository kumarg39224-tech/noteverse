import Link from 'next/link';

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">CreatorFlow</Link>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
          <Link href="/auth/signup" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Get Started</Link>
        </div>
      </nav>
    </header>
  );
}
