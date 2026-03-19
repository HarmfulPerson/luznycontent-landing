'use client';

import Image from 'next/image';
import { useReveal, useParallax } from '@/hooks/useScrollAnimations';
import TextReveal from './TextReveal';
import InstagramIcon from './InstagramIcon';

export default function About() {
  const { ref: sectionRef, isVisible } = useReveal(0.1);
  const { ref: imgParallax, offset } = useParallax(0.15);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden" id="o-mnie" ref={sectionRef}>
      {/* Organic blob accent */}
      <div className="absolute -top-20 right-0 w-64 h-64 bg-[var(--color-primary)]/5 blob-shape pointer-events-none" />

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div ref={imgParallax} className="relative group" style={{ transform: `translateY(${offset}px)` }}>
          <div
            className="absolute -inset-4 border-2 border-[var(--color-brand-brown)]/15 rounded-2xl transition-all duration-700 ease-out"
            style={{
              transform: isVisible ? 'rotate(-2deg) scale(1)' : 'rotate(-8deg) scale(0.8)',
              opacity: isVisible ? 1 : 0,
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
          />
          <div
            className="relative aspect-[3/4] bg-[var(--color-brand-beige)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out"
            style={{
              transform: isVisible ? 'scale(1)' : 'scale(0.85)',
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? 'blur(0px)' : 'blur(10px)',
            }}
          >
            <Image
              src="/julia-portrait.jpg"
              alt="Julia Jabłońska"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <span
              className="text-[var(--color-primary)] font-bold tracking-[0.3em] uppercase text-xs inline-block transition-all duration-500 ease-out"
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: '300ms',
              }}
            >
              Poznaj mnie
            </span>
            <TextReveal
              text="O Mnie"
              as="h2"
              className="text-4xl md:text-5xl font-black serif-heading mt-2 uppercase text-[var(--color-brand-brown)]"
              staggerMs={80}
            />
          </div>

          {/* Decorative line in logo style */}
          <div
            className="flex items-center gap-3 transition-all duration-700"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '400ms' }}
          >
            <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
            <div className="w-3 h-3 bg-[var(--color-primary)]/30 blob-shape" />
          </div>

          <p
            className="text-[var(--color-brand-brown)]/70 text-lg leading-relaxed font-light transition-all duration-700 ease-out"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '500ms',
            }}
          >
            Na co dzień oprócz bycia content creatorem jestem również modelką.
            Wykorzystuję swoje estetyczne i kreatywne umiejętności, by pomagać
            rozwijać obecność w social mediach — tworzę trendy, naturalne wideo
            i zdjęcia, które przyciągają uwagę i budują zaufanie do marki.
          </p>

          <p
            className="text-[var(--color-brand-brown)]/70 text-lg leading-relaxed font-light transition-all duration-700 ease-out"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '650ms',
            }}
          >
            Szukasz kogoś, kto stworzy autentyczny content do Twoich social
            mediów? Chętnie pomogę!
          </p>

          <div
            className="flex gap-4 transition-all duration-700 ease-out"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '800ms',
            }}
          >
            <a href="https://instagram.com/luznycontent" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 border border-[var(--color-primary)]/25 text-[var(--color-primary)]/70 font-medium rounded-full hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all duration-300 text-sm tracking-[0.05em] cursor-pointer">
              <InstagramIcon className="w-4 h-4" />
              luznycontent
            </a>
            <a href="https://instagram.com/juliajablo" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 border border-[var(--color-brand-brown)]/20 text-[var(--color-brand-brown)]/60 font-medium rounded-full hover:border-[var(--color-brand-brown)]/40 hover:text-[var(--color-brand-brown)] transition-all duration-300 text-sm tracking-[0.05em] cursor-pointer">
              <InstagramIcon className="w-4 h-4" />
              juliajablo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
