'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema } from '@/lib/validations';
import { z } from 'zod';
import { toast } from 'sonner';

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(async (values) => {
      const res = await signIn('credentials', { ...values, redirect: false });
      if (res?.error) return toast.error('Invalid credentials');
      toast.success('Welcome back!');
      router.push('/dashboard');
    })}>
      <input {...form.register('email')} placeholder="Email" className="w-full rounded-lg border border-input bg-card p-3" />
      <input {...form.register('password')} type="password" placeholder="Password" className="w-full rounded-lg border border-input bg-card p-3" />
      <button className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground">Login</button>
    </form>
  );
}

export function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({ resolver: zodResolver(signupSchema) });

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(async (values) => {
      const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      if (!res.ok) return toast.error('Signup failed');
      await signIn('credentials', { email: values.email, password: values.password, redirect: false });
      toast.success('Account created');
      router.push('/dashboard');
    })}>
      <input {...form.register('name')} placeholder="Full name" className="w-full rounded-lg border border-input bg-card p-3" />
      <input {...form.register('email')} placeholder="Email" className="w-full rounded-lg border border-input bg-card p-3" />
      <input {...form.register('password')} type="password" placeholder="Password" className="w-full rounded-lg border border-input bg-card p-3" />
      <button className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground">Create account</button>
    </form>
  );
}
