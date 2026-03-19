'use client';

import { useScrollProgress } from '@/hooks/useScrollAnimations';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed right-0 top-0 w-1 h-full z-[60] pointer-events-none">
      {/* Track */}
      <div className="absolute inset-0 bg-[var(--color-brand-brown)]/5" />
      {/* Progress */}
      <div
        className="absolute top-0 left-0 w-full rounded-b-full transition-none"
        style={{
          height: `${progress * 100}%`,
          background: 'linear-gradient(180deg, var(--color-primary), var(--color-brand-brown))',
        }}
      />
      {/* Dot indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/40 transition-none"
        style={{
          top: `calc(${progress * 100}% - 6px)`,
          opacity: progress > 0.01 ? 1 : 0,
        }}
      />
    </div>
  );
}
