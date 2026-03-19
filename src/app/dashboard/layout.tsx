import { Sidebar } from '@/components/layout/dashboard-shell';
import Topbar from '@/components/layout/topbar-client';
import { requireUser } from '@/lib/server-auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar name={user.name ?? 'Creator'} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
