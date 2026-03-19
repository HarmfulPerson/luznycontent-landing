'use client';

import { useState, FormEvent } from 'react';
import { useReveal, useMagneticHover } from '@/hooks/useScrollAnimations';
import TextReveal from './TextReveal';
import InstagramIcon from './InstagramIcon';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const { ref, isVisible } = useReveal(0.1);
  const btnMagnetic = useMagneticHover(0.2);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="py-24 bg-[var(--color-brand-dark)] text-white overflow-hidden relative" id="kontakt" ref={ref}>
      {/* Organic decorations */}
      <div className="absolute top-10 right-20 w-48 h-48 bg-[var(--color-primary)]/5 blob-shape pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-[var(--color-brand-brown)]/10 blob-shape-2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <TextReveal
              text="Zacznijmy coś razem"
              as="h2"
              className="text-4xl md:text-5xl font-black serif-heading uppercase mb-6 leading-tight"
              staggerMs={50}
            />

            {/* Decorative separator in logo style */}
            <div
              className="flex items-center gap-3 mb-8 transition-all duration-700"
              style={{ opacity: isVisible ? 1 : 0, transitionDelay: '300ms' }}
            >
              <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
              <div className="w-3 h-3 bg-[var(--color-primary)]/30 blob-shape" />
            </div>

            <p
              className="text-white/50 text-lg mb-10 font-light transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '400ms',
              }}
            >
              Masz pomysł na współpracę? Szukasz autentycznego twórcy UGC lub twarzy do kampanii? Napisz do mnie!
            </p>
            <div
              className="space-y-6 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transitionDelay: '600ms',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white/40 text-lg">mail</span>
                <span className="text-white/60 text-sm">kontakt@luznycontent.pl</span>
              </div>
              <div className="flex gap-3 mt-2">
                <a href="https://instagram.com/luznycontent" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/60 font-medium rounded-full hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-all duration-300 text-sm tracking-[0.05em] cursor-pointer">
                  <InstagramIcon className="w-4 h-4" />
                  luznycontent
                </a>
                <a href="https://instagram.com/juliajablo" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/60 font-medium rounded-full hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-all duration-300 text-sm tracking-[0.05em] cursor-pointer">
                  <InstagramIcon className="w-4 h-4" />
                  juliajablo
                </a>
              </div>
            </div>
          </div>

          <div
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
              filter: isVisible ? 'blur(0px)' : 'blur(8px)',
              transitionDelay: '300ms',
            }}
          >
            {sent ? (
              <div className="flex items-center justify-center bg-white/5 p-12 rounded-2xl border border-white/10 h-full">
                <div className="text-center space-y-4">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-5xl">check_circle</span>
                  <h3 className="text-2xl font-bold serif-heading">Wysłano!</h3>
                  <p className="text-white/50">Odpowiem najszybciej jak to możliwe.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-[var(--color-primary)]/30 transition-colors duration-500">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] font-semibold text-white/30">Imię</label>
                    <input
                      type="text" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/15 focus:border-[var(--color-primary)] py-2 outline-none transition-colors text-white"
                      placeholder="Twoje imię"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] font-semibold text-white/30">E-mail</label>
                    <input
                      type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/15 focus:border-[var(--color-primary)] py-2 outline-none transition-colors text-white"
                      placeholder="email@przyklad.pl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.3em] font-semibold text-white/30">Wiadomość</label>
                  <textarea
                    required rows={4} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[var(--color-primary)] py-2 outline-none transition-colors resize-none text-white"
                    placeholder="O czym chcesz porozmawiać?"
                  />
                </div>
                <div ref={btnMagnetic.ref} onMouseMove={btnMagnetic.onMouseMove} onMouseLeave={btnMagnetic.onMouseLeave} className="transition-transform duration-200">
                  <button type="submit"
                    className="w-full py-3.5 bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/25 font-medium uppercase tracking-[0.15em] text-sm rounded-full hover:bg-[var(--color-primary)]/25 hover:border-[var(--color-primary)]/40 transition-all duration-300 cursor-pointer">
                    Wyślij wiadomość
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
