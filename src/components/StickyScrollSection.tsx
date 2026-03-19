'use client';

import { ReactNode, useState, useRef, useEffect, useMemo, memo, FormEvent } from 'react';
import Image from 'next/image';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import InstagramIcon from './InstagramIcon';
import PhotoGallery from './PhotoGallery';
import VideoPlayer from './VideoPlayer';

// ═══════════════════════════════════════════════════════════════════════════
// STEP DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

interface Step {
  id: string;
  bg: string;
  content: () => ReactNode;
}

const steps: Step[] = [
  // ── 1. Hero ──
  {
    id: 'hero',
    bg: 'var(--color-brand-cream)',
    content: () => (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <Image src="/logo.jpg" alt="Luzny Content" width={260} height={260} className="rounded-3xl shadow-2xl mb-8" priority />
        <p className="text-sm font-semibold tracking-[0.35em] uppercase text-[var(--color-brand-brown)]/60 mb-6">UGC Content Creator</p>
        <p className="text-[var(--color-brand-brown)]/50 text-lg max-w-xl font-light italic">
          &ldquo;Tworzę autentyczny, estetyczny content, który sprzedaje.&rdquo;
        </p>
      </div>
    ),
  },
  // ── 2. O mnie ──
  {
    id: 'o-mnie',
    bg: 'var(--color-brand-soft)',
    content: () => (
      <div className="grid grid-cols-2 gap-16 items-center h-full max-w-6xl mx-auto px-12">
        <div className="flex items-center justify-center">
          <div className="relative w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/julia-portrait.jpg" alt="Julia Jabłońska" fill className="object-cover" sizes="300px" />
          </div>
        </div>
        <div className="space-y-6">
          <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.3em] uppercase">Poznaj mnie</span>
          <h2 className="text-4xl lg:text-5xl font-black serif-heading uppercase text-[var(--color-brand-brown)] leading-tight">O Mnie</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
            <div className="w-2 h-2 bg-[var(--color-primary)]/30 blob-shape" />
          </div>
          <p className="text-[var(--color-brand-brown)]/60 text-lg font-light leading-relaxed">
            Na co dzień oprócz bycia content creatorem jestem również modelką.
            Łączę estetyczne i kreatywne umiejętności, by pomagać rozwijać obecność w social mediach.
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com/luznycontent" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-[var(--color-primary)]/25 text-[var(--color-primary)]/70 font-medium rounded-full hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all text-sm cursor-pointer">
              <InstagramIcon className="w-4 h-4" /> luznycontent
            </a>
            <a href="https://instagram.com/juliajablo" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-[var(--color-brand-brown)]/20 text-[var(--color-brand-brown)]/60 font-medium rounded-full hover:border-[var(--color-brand-brown)]/40 transition-all text-sm cursor-pointer">
              <InstagramIcon className="w-4 h-4" /> juliajablo
            </a>
          </div>
        </div>
      </div>
    ),
  },
  // ── 3. Usługi ──
  {
    id: 'uslugi',
    bg: 'var(--color-brand-cream)',
    content: () => {
      const items = [
        {
          icon: 'video_camera_back',
          title: 'UGC Content',
          desc: 'Naturalne, angażujące treści wideo i zdjęciowe dopasowane do Twojej marki.',
          num: '01',
          gradient: 'from-[var(--color-primary)]/20 to-[var(--color-primary)]/5',
          accentBorder: 'var(--color-primary)',
        },
        {
          icon: 'camera_alt',
          title: 'Modelka',
          desc: 'Sesje editorial, commercial i lookbook. Profesjonalne podejście.',
          num: '02',
          gradient: 'from-[var(--color-brand-brown)]/15 to-[var(--color-brand-brown)]/5',
          accentBorder: 'var(--color-brand-brown)',
        },
        {
          icon: 'language',
          title: 'Social Media',
          desc: 'Reelsy, stories i posty promujące Twoją markę estetycznie.',
          num: '03',
          gradient: 'from-[var(--color-primary)]/15 to-[var(--color-brand-brown)]/5',
          accentBorder: 'var(--color-primary)',
        },
      ];
      return (
        <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-8">
          <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.3em] uppercase mb-3">Co mogę dla Ciebie zrobić</span>
          <h2 className="text-4xl lg:text-5xl font-black serif-heading uppercase text-[var(--color-brand-brown)] text-center mb-14">Usługi</h2>
          <div className="grid grid-cols-3 gap-8 w-full">
            {items.map((s, i) => (
              <div
                key={s.title}
                className="relative group cursor-pointer"
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
                  {/* Blob accent in corner */}
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 blob-shape opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                    style={{ background: s.accentBorder, opacity: 0 }}
                  />
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
                    {/* Decorative ring */}
                    <div
                      className="absolute -inset-2 rounded-3xl border-2 border-dashed opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:rotate-6"
                      style={{ borderColor: s.accentBorder }}
                    />
                  </div>

                  <h3 className="text-2xl font-black serif-heading uppercase text-[var(--color-brand-brown)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[var(--color-brand-brown)]/50 font-light text-sm leading-relaxed relative z-10">
                    {s.desc}
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
      );
    },
  },
  // ── 4. Video portfolio (page 1) ──
  {
    id: 'portfolio',
    bg: 'var(--color-brand-soft)',
    content: () => <VideoGrid videos={[1,2,3,4]} title="Wideo UGC" />,
  },
  // ── 4b. Video portfolio (page 2) ──
  {
    id: 'portfolio-2',
    bg: 'var(--color-brand-cream)',
    content: () => <VideoGrid videos={[5,6,7,8]} title="Więcej treści" />,
  },
  // ── 5. Photo portfolio ──
  {
    id: 'foto',
    bg: 'var(--color-brand-cream)',
    content: () => <PhotoGallery />,
  },
  // ── 6. Współprace ──
  {
    id: 'wspolprace',
    bg: 'var(--color-brand-soft)',
    content: () => {
      const brands = ['Marka 1', 'Marka 2', 'Marka 3', 'Marka 4', 'Marka 5', 'Marka 6'];
      return (
        <div className="flex flex-col items-center justify-center h-full max-w-5xl mx-auto px-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-brown)]/50 mb-16">Współpracowałam m.in. z</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {brands.map((b, i) => (
              <div key={i} className="text-3xl font-black serif-heading text-[var(--color-brand-brown)] opacity-20 hover:opacity-100 hover:text-[var(--color-primary)] transition-all duration-500 cursor-pointer">{b}</div>
            ))}
          </div>
        </div>
      );
    },
  },
  // ── 7. Kontakt ──
  {
    id: 'kontakt',
    bg: 'var(--color-brand-dark)',
    content: () => <ContactStep />,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO GRID + THUMB — 3D perspective cards with staggered hover
// ═══════════════════════════════════════════════════════════════════════════

let _setOpenVideo: ((src: string | null) => void) | null = null;

// Each card has a unique tilt direction for the idle "fan" effect
const cardTilts = [
  { rotateY: -4, rotateZ: -1.5, y: 8 },
  { rotateY: -1.5, rotateZ: 0.5, y: -4 },
  { rotateY: 1.5, rotateZ: -0.5, y: -4 },
  { rotateY: 4, rotateZ: 1.5, y: 8 },
];

function VideoGrid({ videos, title }: { videos: number[]; title: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black serif-heading uppercase text-[var(--color-brand-brown)]">{title}</h2>
        <p className="text-[var(--color-brand-brown)]/25 text-[10px] tracking-[0.2em] uppercase mt-2 flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-xs">play_circle</span>
          kliknij aby odtworzyć
        </p>
      </div>

      <div
        className="grid grid-cols-4 gap-6 w-full"
        style={{ height: '65vh', perspective: '1200px' }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {videos.map((num, i) => {
          const isHovered = hoveredIdx === i;
          const hasHover = hoveredIdx !== null;
          const isNeighbor = hoveredIdx !== null && Math.abs(i - hoveredIdx) === 1;
          const tilt = cardTilts[i] ?? cardTilts[0];

          return (
            <button
              key={num}
              type="button"
              onClick={() => _setOpenVideo?.(`/videos/ugc-${num}.mp4`)}
              onMouseEnter={() => setHoveredIdx(i)}
              className="relative cursor-pointer block w-full h-full"
              style={{ perspective: '800px' }}
            >
              <div
                className="absolute inset-0 bg-neutral-900 rounded-2xl overflow-hidden"
                style={{
                  transition: 'transform 600ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 400ms ease, filter 400ms ease',
                  transform: isHovered
                    ? 'rotateY(0deg) rotateX(0deg) scale(1.06) translateY(-12px) translateZ(40px)'
                    : hasHover && !isNeighbor
                      ? `rotateY(${tilt.rotateY * 2}deg) scale(0.88) translateY(${tilt.y * 2}px) translateZ(-60px)`
                      : hasHover && isNeighbor
                        ? `rotateY(${tilt.rotateY}deg) scale(0.95) translateY(${tilt.y}px) translateZ(-20px)`
                        : `rotateY(${tilt.rotateY}deg) rotateZ(${tilt.rotateZ}deg) translateY(${tilt.y}px) scale(1)`,
                  boxShadow: isHovered
                    ? '0 40px 80px rgba(0,0,0,0.3), 0 0 0 2px var(--color-primary)'
                    : hasHover && !isNeighbor
                      ? '0 5px 20px rgba(0,0,0,0.1)'
                      : '0 15px 40px rgba(0,0,0,0.15)',
                  filter: hasHover && !isHovered ? `brightness(${isNeighbor ? 0.85 : 0.7})` : 'brightness(1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <video
                  src={`/videos/ugc-${num}.mp4`}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ pointerEvents: 'none' }}
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none" />

                {/* Play button — grows on hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="bg-white/90 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm"
                    style={{
                      width: isHovered ? '56px' : '44px',
                      height: isHovered ? '56px' : '44px',
                      transition: 'all 400ms cubic-bezier(0.34,1.56,0.64,1)',
                      transform: isHovered ? 'scale(1)' : hasHover && !isNeighbor ? 'scale(0.7)' : 'scale(0.85)',
                      opacity: isHovered ? 1 : hasHover && !isNeighbor ? 0.4 : 0.8,
                    }}
                  >
                    <span className="material-symbols-outlined text-[var(--color-primary)] text-2xl ml-0.5">play_arrow</span>
                  </div>
                </div>

                {/* Shine reflection on hover */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 600ms ease',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT STEP
// ═══════════════════════════════════════════════════════════════════════════

function ContactStep() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <div className="grid grid-cols-2 gap-16 items-center h-full max-w-6xl mx-auto px-12 text-white">
      <div className="space-y-6">
        <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.3em] uppercase">Kontakt</span>
        <h2 className="text-4xl lg:text-5xl font-black serif-heading uppercase leading-tight">Zacznijmy<br/>coś razem</h2>
        <div className="flex items-center gap-3">
          <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
          <div className="w-2 h-2 bg-[var(--color-primary)]/30 blob-shape" />
        </div>
        <p className="text-white/50 text-lg font-light">Masz pomysł na współpracę? Napisz do mnie!</p>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white/40 text-lg">mail</span>
          <span className="text-white/60 text-sm">kontakt@luznycontent.pl</span>
        </div>
        <div className="flex gap-3">
          <a href="https://instagram.com/luznycontent" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/60 font-medium rounded-full hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-all text-sm cursor-pointer">
            <InstagramIcon className="w-4 h-4" /> luznycontent
          </a>
          <a href="https://instagram.com/juliajablo" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/60 font-medium rounded-full hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-all text-sm cursor-pointer">
            <InstagramIcon className="w-4 h-4" /> juliajablo
          </a>
        </div>
      </div>
      <div>
        {sent ? (
          <div className="flex items-center justify-center bg-white/5 p-12 rounded-2xl border border-white/10">
            <div className="text-center space-y-4">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-5xl">check_circle</span>
              <h3 className="text-2xl font-bold serif-heading">Wysłano!</h3>
              <p className="text-white/50">Odpowiem najszybciej jak to możliwe.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 hover:border-[var(--color-primary)]/30 transition-colors">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] font-semibold text-white/30">Imię</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/15 focus:border-[var(--color-primary)] py-2 outline-none text-white" placeholder="Twoje imię" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] font-semibold text-white/30">E-mail</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-transparent border-b border-white/15 focus:border-[var(--color-primary)] py-2 outline-none text-white" placeholder="email@przyklad.pl" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] font-semibold text-white/30">Wiadomość</label>
              <textarea required rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-transparent border-b border-white/15 focus:border-[var(--color-primary)] py-2 outline-none resize-none text-white" placeholder="O czym chcesz porozmawiać?" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/25 font-medium uppercase tracking-[0.15em] text-sm rounded-full hover:bg-[var(--color-primary)]/25 transition-all cursor-pointer">
              Wyślij wiadomość
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP DOTS
// ═══════════════════════════════════════════════════════════════════════════

function StepDots({ count, active, isDark }: { count: number; active: number; isDark: boolean }) {
  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-30">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full transition-all duration-500"
          style={{
            background: i === active ? 'var(--color-primary)' : isDark ? 'rgba(255,255,255,0.2)' : 'var(--color-brand-brown)',
            opacity: i === active ? 1 : i < active ? 0.3 : 0.12,
            transform: i === active ? 'scale(1.8)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED BLOBS — react to scroll progress between steps
// ═══════════════════════════════════════════════════════════════════════════

interface BlobConfig {
  // Base position (%)
  baseX: number;
  baseY: number;
  // Size
  size: number;
  // Movement range per step
  driftX: number;
  driftY: number;
  // Rotation per step
  rotatePerStep: number;
  // Scale oscillation
  scaleBase: number;
  scaleRange: number;
  // Color
  color: string;
  // Base opacity
  opacity: number;
  // Blob shape variant
  shape: 1 | 2;
}

const blobs: BlobConfig[] = [
  // Large primary blob — top-left, drifts right and down
  { baseX: -5, baseY: 10, size: 320, driftX: 8, driftY: -6, rotatePerStep: 15, scaleBase: 1, scaleRange: 0.15, color: 'var(--color-primary)', opacity: 0.06, shape: 1 },
  // Medium brown blob — bottom-right, drifts left and up
  { baseX: 85, baseY: 70, size: 280, driftX: -10, driftY: 5, rotatePerStep: -12, scaleBase: 0.9, scaleRange: 0.2, color: 'var(--color-brand-brown)', opacity: 0.05, shape: 2 },
  // Small primary — center-right, floats around
  { baseX: 75, baseY: 15, size: 160, driftX: -6, driftY: 8, rotatePerStep: 25, scaleBase: 0.8, scaleRange: 0.3, color: 'var(--color-primary)', opacity: 0.04, shape: 1 },
  // Tiny brown — left-center
  { baseX: 8, baseY: 60, size: 120, driftX: 5, driftY: -10, rotatePerStep: -20, scaleBase: 0.7, scaleRange: 0.25, color: 'var(--color-brand-brown)', opacity: 0.035, shape: 2 },
  // Medium primary — bottom-left
  { baseX: 15, baseY: 85, size: 200, driftX: 12, driftY: -4, rotatePerStep: 18, scaleBase: 0.85, scaleRange: 0.2, color: 'var(--color-primary)', opacity: 0.045, shape: 1 },
  // Small dot — top-center
  { baseX: 50, baseY: 5, size: 80, driftX: -3, driftY: 6, rotatePerStep: 30, scaleBase: 1, scaleRange: 0.4, color: 'var(--color-primary)', opacity: 0.05, shape: 2 },
];

function AnimatedBlobs({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animTarget = useRef(0);  // target t value from scroll
  const animCurrent = useRef(0); // current interpolated t value
  const rafId = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Lerp factor — lower = smoother/slower (0.04 = very smooth)
    const LERP = 0.045;

    const getT = () => {
      const rect = container.getBoundingClientRect();
      const h = container.offsetHeight - window.innerHeight;
      if (h <= 0) return 0;
      const raw = -rect.top / h;
      return Math.max(0, Math.min(1, raw)) * steps.length;
    };

    const onScroll = () => {
      animTarget.current = getT();
    };

    const animate = () => {
      // Interpolate towards target
      const diff = animTarget.current - animCurrent.current;
      animCurrent.current += diff * LERP;

      const t = animCurrent.current;

      for (let i = 0; i < blobs.length; i++) {
        const el = blobRefs.current[i];
        if (!el) continue;
        const blob = blobs[i];
        const x = blob.baseX + blob.driftX * t;
        const y = blob.baseY + blob.driftY * t;
        const rotation = blob.rotatePerStep * t;
        const scale = blob.scaleBase + blob.scaleRange * Math.sin(t * 0.8 + i * 1.5);

        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
        el.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    animTarget.current = getT();
    animCurrent.current = animTarget.current;
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [containerRef]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {blobs.map((blob, i) => (
        <div
          key={i}
          ref={el => { blobRefs.current[i] = el; }}
          className={blob.shape === 1 ? 'blob-shape' : 'blob-shape-2'}
          style={{
            position: 'absolute',
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            background: blob.color,
            opacity: blob.opacity,
            willChange: 'transform, left, top',
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP LAYERS — content rendered once, only transform/opacity changes
// ═══════════════════════════════════════════════════════════════════════════

// Each step's content is rendered once and memoized
const StepContent = memo(function StepContent({ index }: { index: number }) {
  const Content = steps[index].content;
  return <Content />;
});

function StepLayers({ activeStep }: { activeStep: number }) {
  return (
    <>
      {steps.map((step, i) => {
        const isCurrent = i === activeStep;
        const isPast = i < activeStep;
        const isNear = Math.abs(i - activeStep) <= 1;

        return (
          <div key={i}
            className="absolute inset-0"
            style={{
              opacity: isCurrent ? 1 : 0,
              transform: isCurrent
                ? 'none'
                : isPast
                  ? 'translate3d(-100px,0,0)'
                  : 'translate3d(100px,0,0)',
              // Active layer on top, others behind — prevents click interception
              zIndex: isCurrent ? 10 : 0,
              // Only active layer receives pointer events
              pointerEvents: isCurrent ? 'auto' : 'none',
              // Hide far layers completely from rendering
              display: isNear ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: step.bg === 'var(--color-brand-dark)' ? 'white' : 'var(--color-brand-dark)',
              transition: isNear ? 'opacity 500ms ease, transform 500ms ease' : 'none',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <StepContent index={i} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function StickyScrollSection() {
  const { containerRef, activeStep, stepProgress } = useStickyScroll(steps.length, 100);
  const isDark = steps[activeStep]?.bg === 'var(--color-brand-dark)';
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  // Expose setter to VideoThumb components
  _setOpenVideo = setOpenVideo;

  return (
    <>
      {/* Global video player */}
      {openVideo && <VideoPlayer src={openVideo} onClose={() => setOpenVideo(null)} />}

      {/* Sticky scroll area */}
      <div
          ref={containerRef}
          style={{ height: `${steps.length * 100}vh` }}
          className="relative"
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Background — single div, instant color switch */}
            <div className="absolute inset-0 transition-[background-color] duration-600 ease-out"
              style={{ backgroundColor: steps[activeStep]?.bg ?? 'var(--color-brand-cream)' }} />

            {/* Animated organic blobs — lerp-smoothed, 60fps via rAF */}
            <AnimatedBlobs containerRef={containerRef} />

            <StepDots count={steps.length} active={activeStep} isDark={isDark} />

            {/* Content layers — pre-rendered, only visibility/transform changes */}
            <div className="relative z-20 h-full">
              <StepLayers activeStep={activeStep} />
            </div>
          </div>
        </div>

        {/* Footer — normalny scroll, poza sticky */}
        <footer className="py-12 bg-[var(--color-brand-dark)] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
            <Image src="/logo.jpg" alt="Luzny Content" width={40} height={40} className="rounded-xl opacity-40" />
            <p className="text-white/20 text-sm font-light uppercase tracking-[0.3em] text-center">
              &copy; 2026 Luzny Content &mdash; Julia Jabłońska
            </p>
          </div>
        </footer>
    </>
  );
}
