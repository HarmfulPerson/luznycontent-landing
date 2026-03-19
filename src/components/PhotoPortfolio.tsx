'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useScrollAnimations';
import TextReveal from './TextReveal';

const photos = [
  { id: '1', src: '/images/photo-1.jpg', label: 'Lifestyle' },
  { id: '2', src: '/images/photo-2.jpg', label: 'Travel' },
  { id: '3', src: '/images/photo-3.jpg', label: 'Product' },
  { id: '4', src: '/images/photo-4.jpg', label: 'Creative' },
  { id: '5', src: '/images/photo-5.jpg', label: 'Fashion' },
  { id: '6', src: '/images/photo-6.jpg', label: 'Brand' },
];

export default function PhotoPortfolio() {
  const { ref, isVisible } = useReveal(0.05);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="text-center mb-12">
        <TextReveal
          text="Portfolio Foto"
          as="h2"
          className="text-4xl md:text-5xl font-black serif-heading uppercase"
          staggerMs={60}
        />
        <p
          className="text-[var(--color-primary)] tracking-widest uppercase text-sm mt-4 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transitionDelay: '300ms' }}
        >
          Wybrane realizacje
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer transition-all duration-700 ease-out"
            style={{
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(80px) scale(0.85)',
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? 'blur(0px)' : 'blur(6px)',
              transitionDelay: `${200 + i * 120}ms`,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.label}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Desktop: overlay on hover. Mobile: always visible label at bottom */}
            <div className="absolute inset-0 bg-[var(--color-brand-dark)]/0 md:group-hover:bg-[var(--color-brand-dark)]/50 transition-all duration-500 hidden md:flex items-center justify-center">
              <span className="text-white font-bold tracking-widest uppercase border-b border-white/40 pb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {photo.label}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-brand-dark)]/70 to-transparent p-4 md:hidden">
              <span className="text-white text-sm font-bold tracking-widest uppercase">
                {photo.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
