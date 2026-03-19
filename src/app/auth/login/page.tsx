import Link from 'next/link';
import { LoginForm } from '@/components/forms/auth-forms';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mb-6 mt-2 text-muted-foreground">Login to your CreatorFlow workspace.</p>
        <LoginForm />
        <p className="mt-4 text-sm text-muted-foreground">No account? <Link href="/auth/signup" className="text-primary">Sign up</Link></p>
      </section>
    </main>
  );
}
