'use client';

import { useReveal } from '@/hooks/useScrollAnimations';
import TextReveal from './TextReveal';

const services = [
  {
    icon: 'video_camera_back',
    title: 'UGC Content',
    description: 'Tworzę naturalne, angażujące treści wideo i zdjęciowe dopasowane do Twojej marki. Autentyczność, która konwertuje.',
    num: '01',
    gradient: 'from-[var(--color-primary)]/20 to-[var(--color-primary)]/5',
    accentBorder: 'var(--color-primary)',
  },
  {
    icon: 'camera_alt',
    title: 'Modelka',
    description: 'Sesje zdjęciowe editorial, commercial i lookbook. Profesjonalne podejście i świadomość obiektywu w każdym projekcie.',
    num: '02',
    gradient: 'from-[var(--color-brand-brown)]/15 to-[var(--color-brand-brown)]/5',
    accentBorder: 'var(--color-brand-brown)',
  },
  {
    icon: 'language',
    title: 'Social Media',
    description: 'Współprace na Instagramie, reelsy, stories i posty promujące Twoją markę w sposób spójny i estetyczny.',
    num: '03',
    gradient: 'from-[var(--color-primary)]/15 to-[var(--color-brand-brown)]/5',
    accentBorder: 'var(--color-primary)',
  },
];

export default function Services() {
  const { ref, isVisible } = useReveal(0.1);

  return (
    <section className="py-24 bg-[var(--color-brand-cream)] relative overflow-hidden" id="uslugi" ref={ref}>
      <div className="absolute top-10 left-10 w-40 h-40 bg-[var(--color-primary)]/5 blob-shape-2 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[var(--color-brand-brown)]/5 blob-shape pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-14">
          <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.3em] uppercase">Co mogę dla Ciebie zrobić</span>
          <TextReveal
            text="Usługi"
            as="h2"
            className="text-4xl md:text-5xl font-black serif-heading uppercase text-[var(--color-brand-brown)] mt-2"
            staggerMs={80}
          />
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-[2px] bg-[var(--color-primary)]/30 transition-all duration-700"
              style={{ width: isVisible ? '40px' : '0px', transitionDelay: '400ms' }} />
            <div className="w-3 h-3 bg-[var(--color-primary)]/20 blob-shape transition-all duration-500"
              style={{ opacity: isVisible ? 1 : 0, transitionDelay: '500ms' }} />
            <div className="h-[2px] bg-[var(--color-primary)]/30 transition-all duration-700"
              style={{ width: isVisible ? '40px' : '0px', transitionDelay: '400ms' }} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="relative group cursor-pointer transition-all duration-700 ease-out"
              style={{
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.9)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${300 + i * 150}ms`,
              }}
            >
              {/* Large background number */}
              <span className="absolute -top-6 -left-2 text-[7rem] font-black serif-heading leading-none text-[var(--color-brand-brown)]/[0.04] select-none pointer-events-none group-hover:text-[var(--color-primary)]/[0.08] transition-colors duration-500">
                {s.num}
              </span>

              {/* Card */}
              <div
                className={`relative bg-gradient-to-br ${s.gradient} backdrop-blur-sm p-8 rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`}
                style={{ borderLeft: `3px solid ${s.accentBorder}` }}
              >
                {/* Blob accent */}
                <div
                  className="absolute -bottom-8 -right-8 w-32 h-32 blob-shape group-hover:opacity-[0.08] opacity-0 transition-all duration-700 group-hover:scale-110"
                  style={{ background: s.accentBorder }}
                />

                {/* Icon with ring */}
                <div className="relative mb-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rounded-xl group-hover:scale-110"
                    style={{ background: `color-mix(in srgb, ${s.accentBorder} 12%, transparent)` }}
                  >
                    <span className="material-symbols-outlined text-2xl transition-colors duration-300" style={{ color: s.accentBorder }}>{s.icon}</span>
                  </div>
                  <div
                    className="absolute -inset-2 rounded-3xl border-2 border-dashed opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:rotate-6"
                    style={{ borderColor: s.accentBorder }}
                  />
                </div>

                <h3 className="text-2xl font-black serif-heading uppercase text-[var(--color-brand-brown)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-[var(--color-brand-brown)]/50 font-light text-sm leading-relaxed relative z-10">
                  {s.description}
                </p>

                {/* Arrow hint */}
                <div className="mt-6 flex items-center gap-2 text-[var(--color-primary)]/0 group-hover:text-[var(--color-primary)] transition-all duration-300">
                  <span className="text-xs font-semibold uppercase tracking-widest">Więcej</span>
                  <span className="material-symbols-outlined text-sm translate-x-0 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
