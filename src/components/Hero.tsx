'use client';

import { useParallax } from '@/hooks/useScrollAnimations';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const { ref: parallaxRef, offset } = useParallax(0.2);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={parallaxRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-[var(--color-brand-cream)]">
      {/* Organic blob decorations — matching logo's fluid curves */}
      <div
        className="absolute top-32 -left-20 w-72 h-72 bg-[var(--color-primary)]/8 blob-shape transition-all duration-[2s] ease-out"
        style={{ transform: `translateY(${offset * 0.5}px) scale(${loaded ? 1 : 0.3})`, opacity: loaded ? 1 : 0 }}
      />
      <div
        className="absolute bottom-20 -right-16 w-96 h-96 bg-[var(--color-brand-brown)]/5 blob-shape-2 transition-all duration-[2s] ease-out"
        style={{ transform: `translateY(${offset * -0.3}px) scale(${loaded ? 1 : 0.3})`, opacity: loaded ? 1 : 0 }}
      />
      <div
        className="absolute top-1/4 right-1/3 w-4 h-4 bg-[var(--color-primary)]/20 blob-shape transition-all duration-[3s]"
        style={{ transform: `translateY(${offset * -0.8}px)` }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[var(--color-brand-brown)]/15 blob-shape-2 transition-all duration-[3s]"
        style={{ transform: `translateY(${offset * 0.6}px)` }}
      />

      {/* Thin organic line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px bg-[var(--color-brand-brown)]/5 rotate-12" />

      <div className="relative z-10 text-center max-w-4xl">
        {/* Logo large */}
        <div
          className="mb-10 transition-all duration-1000 ease-out"
          style={{
            transform: loaded ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.8)',
            opacity: loaded ? 1 : 0,
            transitionDelay: '200ms',
          }}
        >
          <Image src="/logo.jpg" alt="Luzny Content" width={280} height={280} className="mx-auto rounded-3xl shadow-2xl" priority />
        </div>

        {/* Subtitle */}
        <p
          className="text-sm md:text-base font-semibold tracking-[0.35em] uppercase mb-8 text-[var(--color-brand-brown)]/60 transition-all duration-700 ease-out"
          style={{
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            opacity: loaded ? 1 : 0,
            transitionDelay: '500ms',
          }}
        >
          UGC Content Creator
        </p>

        <p
          className="text-[var(--color-brand-brown)]/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light italic transition-all duration-700 ease-out"
          style={{
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            opacity: loaded ? 1 : 0,
            transitionDelay: '800ms',
            filter: loaded ? 'blur(0px)' : 'blur(8px)',
          }}
        >
          &ldquo;Tworzę autentyczny, estetyczny content, który sprzedaje.
          Trendy wideo i zdjęcia dla Twojej marki.&rdquo;
        </p>

        <div
          className="flex flex-col md:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out"
          style={{
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            opacity: loaded ? 1 : 0,
            transitionDelay: '1000ms',
          }}
        >
          <a href="#portfolio" className="w-full md:w-auto px-8 py-3 border border-[var(--color-brand-brown)]/25 text-[var(--color-brand-brown)]/70 text-sm font-medium tracking-[0.15em] uppercase hover:border-[var(--color-brand-brown)]/50 hover:text-[var(--color-brand-brown)] transition-all duration-300 rounded-full cursor-pointer text-center">
            Zobacz portfolio
          </a>
          <a href="#kontakt" className="w-full md:w-auto px-8 py-3 bg-[var(--color-primary)]/15 text-[var(--color-primary)] text-sm font-medium tracking-[0.15em] uppercase hover:bg-[var(--color-primary)]/25 transition-all duration-300 rounded-full cursor-pointer text-center">
            Współpracujmy
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-700"
        style={{ opacity: loaded ? 1 : 0, transitionDelay: '1300ms' }}
      >
        <span className="material-symbols-outlined text-[var(--color-primary)]/50 text-4xl animate-bounce">expand_more</span>
      </div>
    </section>
  );
}
