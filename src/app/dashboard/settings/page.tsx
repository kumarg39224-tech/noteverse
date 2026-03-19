import { ThemeToggle } from '@/components/ui/theme-toggle';
export default function SettingsPage() {
  return (
    <div className="max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <p className="text-muted-foreground">Manage theme, profile, and workspace preferences.</p>
      <div className="rounded-lg bg-muted/60 p-4 text-sm text-muted-foreground">Profile settings and integrations are ready for extension.</div>
      <ThemeToggle />
    </div>
  );
}
