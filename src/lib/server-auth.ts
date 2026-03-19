import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/auth/login');
  return session.user;
}
