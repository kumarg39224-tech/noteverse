'use client';

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
      <p className="font-semibold text-red-300">Something went wrong loading this page.</p>
      <button onClick={() => reset()} className="mt-3 rounded-md bg-red-500 px-3 py-1 text-sm">Try again</button>
    </div>
  );
}
