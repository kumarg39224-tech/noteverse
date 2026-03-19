'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const next = saved ?? 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('light', next === 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  return <button onClick={toggle} className="rounded-lg border border-border px-3 py-2 text-sm">Theme: {theme}</button>;
}
