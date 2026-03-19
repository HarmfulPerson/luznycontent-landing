'use client';

import { useReveal } from '@/hooks/useScrollAnimations';

export default function Collaborations() {
  const { ref, isVisible } = useReveal(0.2);
  const brands = ['Marka 1', 'Marka 2', 'Marka 3', 'Marka 4', 'Marka 5', 'Marka 6'];

  return (
    <section className="py-20 bg-[var(--color-brand-cream)] border-y border-[var(--color-brand-brown)]/5 overflow-hidden relative" id="wspolprace" ref={ref}>
      {/* Small organic blob */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-[var(--color-primary)]/10 blob-shape pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-xs font-semibold uppercase tracking-[0.35em] text-center mb-12 text-[var(--color-brand-brown)]/50 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          Współpracowałam m.in. z
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="text-2xl font-black serif-heading text-[var(--color-brand-brown)] opacity-25 grayscale hover:opacity-100 hover:grayscale-0 hover:text-[var(--color-primary)] transition-all duration-500 cursor-pointer"
              style={{
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)',
                opacity: isVisible ? 0.25 : 0,
                transitionDelay: `${i * 100}ms`,
                transitionDuration: '600ms',
              }}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
