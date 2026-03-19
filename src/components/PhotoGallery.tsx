'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const photos = [
  { src: '/images/photo-1.jpg', label: 'Lifestyle' },
  { src: '/images/photo-2.jpg', label: 'Travel' },
  { src: '/images/photo-3.jpg', label: 'Product' },
  { src: '/images/photo-4.jpg', label: 'Creative' },
  { src: '/images/photo-5.jpg', label: 'Fashion' },
  { src: '/images/photo-6.jpg', label: 'Brand' },
];

const orbitPositions: [number, number, number, string, number][] = [
  [-40, -30, -18, '73% 27% 58% 42% / 36% 64% 28% 72%', 0.52],
  [42, -26, 14, '28% 72% 67% 33% / 61% 39% 72% 28%', 0.48],
  [-44, 28, 10, '64% 36% 30% 70% / 72% 28% 65% 35%', 0.50],
  [44, 30, -8, '35% 65% 72% 28% / 28% 72% 36% 64%', 0.46],
  [-4, 44, 5, '72% 28% 36% 64% / 58% 42% 73% 27%', 0.44],
];

export default function PhotoGallery() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [blockedIdx, setBlockedIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);

  const isExpanded = hoveredIdx !== null;

  // Reset when pointer-events are removed (parent step scrolled away)
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const onPointerLeave = () => {
      setHoveredIdx(null);
      setSettled(false);
      setBlockedIdx(null);
      clearTimeout(settleTimer.current);
    };

    // pointerleave fires when parent gets pointer-events:none
    el.addEventListener('pointerleave', onPointerLeave);
    return () => el.removeEventListener('pointerleave', onPointerLeave);
  }, []);

  useEffect(() => {
    clearTimeout(settleTimer.current);
    setSettled(false);

    if (hoveredIdx !== null) {
      settleTimer.current = setTimeout(() => {
        setSettled(true);
        // Find which orbiting element is currently under cursor
        for (let i = 0; i < photos.length; i++) {
          if (i === hoveredIdx) continue;
          const el = itemRefs.current[i];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const { x, y } = lastMousePos.current;
          if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            setBlockedIdx(i);
            return;
          }
        }
        setBlockedIdx(null);
      }, 850);
    } else {
      setBlockedIdx(null);
    }
    return () => clearTimeout(settleTimer.current);
  }, [hoveredIdx]);

  return (
    <div ref={galleryRef} className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-8">
      <div className="text-center mb-10">
        <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.3em] uppercase">Wybrane realizacje</span>
        <h2 className="text-4xl lg:text-5xl font-black serif-heading uppercase text-[var(--color-brand-brown)] mt-2">Portfolio Foto</h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-8 h-[2px] bg-[var(--color-primary)]/30" />
          <div className="w-2 h-2 bg-[var(--color-primary)]/20 blob-shape" />
          <div className="w-8 h-[2px] bg-[var(--color-primary)]/30" />
        </div>
      </div>

      <div
        className="relative w-full"
        style={{ maxWidth: '750px', aspectRatio: '1 / 0.82' }}
        onMouseLeave={() => { setHoveredIdx(null); setBlockedIdx(null); }}
        onMouseMove={e => { lastMousePos.current = { x: e.clientX, y: e.clientY }; }}
      >
        {photos.map((photo, i) => {
          const isFocused = hoveredIdx === i;
          const isOrbiting = isExpanded && !isFocused;
          const isBlocked = i === blockedIdx;

          let orbitIdx = 0;
          if (isOrbiting) {
            let count = 0;
            for (let j = 0; j < photos.length; j++) {
              if (j === hoveredIdx) continue;
              if (j === i) { orbitIdx = count; break; }
              count++;
            }
          }

          const orbit = isOrbiting ? orbitPositions[orbitIdx] : null;
          const gridCol = i % 3;
          const gridRow = Math.floor(i / 3);
          const defaultLeft = `${gridCol * 34}%`;
          const defaultTop = `${gridRow * 52}%`;

          return (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className="absolute transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer"
              style={{
                width: isFocused ? '48%' : isOrbiting ? `${(orbit?.[4] ?? 0.5) * 34}%` : '31%',
                aspectRatio: isFocused ? '3 / 4' : '1 / 1',
                left: isFocused ? '26%' : isOrbiting ? `${50 + (orbit?.[0] ?? 0)}%` : defaultLeft,
                top: isFocused ? '2%' : isOrbiting ? `${44 + (orbit?.[1] ?? 0)}%` : defaultTop,
                transform: isFocused
                  ? 'translate(0%, 0%) rotate(0deg) scale(1)'
                  : isOrbiting
                    ? `translate(-50%, -50%) rotate(${orbit?.[2] ?? 0}deg) scale(1)`
                    : 'translate(0%, 0%) rotate(0deg) scale(1)',
                borderRadius: isFocused ? '1.5rem' : isOrbiting ? (orbit?.[3] ?? '50%') : '0.75rem',
                zIndex: isFocused ? 30 : isOrbiting ? 20 : 10,
                filter: isOrbiting ? 'brightness(0.65) saturate(0.5)' : 'none',
                // During animation: block all orbiting. After settle: block only the one under cursor
                pointerEvents: isOrbiting && !settled ? 'none' : 'auto',
              }}
              onMouseEnter={() => {
                // Grid state — free hover
                if (!isExpanded) { setHoveredIdx(i); return; }
                // This is the blocked element — ignore until mouseLeave+re-enter
                if (isBlocked) return;
                // Normal orbiting element after settle — switch
                if (isOrbiting && settled) setHoveredIdx(i);
              }}
              onMouseLeave={() => {
                // Unblock when cursor leaves
                if (isBlocked) setBlockedIdx(null);
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden transition-[border-radius,box-shadow] duration-[800ms]"
                style={{
                  borderRadius: 'inherit',
                  boxShadow: isFocused
                    ? '0 30px 80px rgba(0,0,0,0.3), 0 0 0 3px var(--color-primary)'
                    : isOrbiting ? '0 10px 40px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.08)',
                }}
              >
                <Image src={photo.src} alt={photo.label} fill
                  className="object-cover transition-transform duration-[800ms]"
                  style={{ transform: isFocused ? 'scale(1.08)' : 'scale(1)' }}
                  sizes="400px" />

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 transition-all duration-500"
                  style={{ opacity: isFocused ? 1 : 0, background: 'linear-gradient(to top, rgba(74,63,55,0.7) 0%, transparent 50%)' }}>
                  <span className="text-white/90 text-xs font-semibold tracking-[0.3em] uppercase mb-1">{photo.label}</span>
                  <div className="w-6 h-[1px] bg-[var(--color-primary)]/60" />
                </div>

                {!isExpanded && (
                  <div className="absolute inset-0 bg-[var(--color-brand-dark)]/0 hover:bg-[var(--color-brand-dark)]/30 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white font-medium tracking-[0.2em] uppercase text-xs opacity-0 hover:opacity-100 translate-y-3 hover:translate-y-0 transition-all duration-300">{photo.label}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
