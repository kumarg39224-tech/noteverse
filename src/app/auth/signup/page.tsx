import Link from 'next/link';
import { SignupForm } from '@/components/forms/auth-forms';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mb-6 mt-2 text-muted-foreground">Start organizing your creative output.</p>
        <SignupForm />
        <p className="mt-4 text-sm text-muted-foreground">Already have an account? <Link href="/auth/login" className="text-primary">Login</Link></p>
      </section>
    </main>
  );
}
