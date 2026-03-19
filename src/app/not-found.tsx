import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-muted-foreground">The page you requested does not exist.</p>
      <Link href="/" className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">Back home</Link>
    </main>
  );
}
