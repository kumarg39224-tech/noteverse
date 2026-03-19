'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function ProductivityChart({ data }: { data: Array<{ day: string; value: number }> }) {
  return (
    <div className="h-72 rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold">Productivity trend</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
