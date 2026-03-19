'use client';

import { useReveal, useMagneticHover } from '@/hooks/useScrollAnimations';
import TextReveal from './TextReveal';

const services = [
  {
    icon: 'video_camera_back',
    title: 'UGC Content',
    description: 'Tworzę naturalne, angażujące treści wideo i zdjęciowe dopasowane do Twojej marki. Autentyczność, która konwertuje.',
    accent: 'var(--color-primary)',
  },
  {
    icon: 'camera_alt',
    title: 'Modelka',
    description: 'Sesje zdjęciowe editorial, commercial i lookbook. Profesjonalne podejście i świadomość obiektywu w każdym projekcie.',
    accent: 'var(--color-brand-brown)',
  },
  {
    icon: 'language',
    title: 'Social Media',
    description: 'Współprace na Instagramie, reelsy, stories i posty promujące Twoją markę w sposób spójny i estetyczny.',
    accent: 'var(--color-primary)',
  },
];

function ServiceCard({ service, index, isVisible }: { service: typeof services[0]; index: number; isVisible: boolean }) {
  const magnetic = useMagneticHover(0.15);

  return (
    <div
      ref={magnetic.ref}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl border border-[var(--color-brand-brown)]/8 hover:shadow-2xl transition-all duration-700 ease-out group cursor-pointer relative overflow-hidden"
      style={{
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.9)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${300 + index * 150}ms`,
      }}
    >
      {/* Organic blob background accent */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 blob-shape opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `color-mix(in srgb, ${service.accent} 8%, transparent)` }}
      />

      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 relative"
        style={{ background: `color-mix(in srgb, ${service.accent} 10%, transparent)` }}
      >
        <span className="material-symbols-outlined text-3xl transition-colors" style={{ color: service.accent }}>{service.icon}</span>
      </div>
      <h3 className="text-2xl font-bold serif-heading mb-4 uppercase text-[var(--color-brand-brown)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-[var(--color-brand-brown)]/60 font-light leading-relaxed">{service.description}</p>
    </div>
  );
}

export default function Services() {
  const { ref, isVisible } = useReveal(0.1);

  return (
    <section className="py-24 bg-[var(--color-brand-cream)] relative overflow-hidden" id="uslugi" ref={ref}>
      {/* Organic background accents */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[var(--color-primary)]/5 blob-shape-2 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[var(--color-brand-brown)]/5 blob-shape pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <TextReveal
            text="Usługi"
            as="h2"
            className="text-4xl md:text-5xl font-black serif-heading uppercase text-[var(--color-brand-brown)]"
            staggerMs={80}
          />
          <div className="flex items-center justify-center gap-2 mt-6">
            <div
              className="h-[2px] bg-[var(--color-primary)]/30 transition-all duration-700"
              style={{ width: isVisible ? '40px' : '0px', transitionDelay: '400ms' }}
            />
            <div
              className="w-3 h-3 bg-[var(--color-primary)]/20 blob-shape transition-all duration-500"
              style={{ opacity: isVisible ? 1 : 0, transitionDelay: '500ms' }}
            />
            <div
              className="h-[2px] bg-[var(--color-primary)]/30 transition-all duration-700"
              style={{ width: isVisible ? '40px' : '0px', transitionDelay: '400ms' }}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
