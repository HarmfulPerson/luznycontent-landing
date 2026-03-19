'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useScrollAnimations';
import TextReveal from './TextReveal';
import VideoPlayer from './VideoPlayer';

interface VideoItem {
  id: string;
  src: string;
  title: string;
  category: string;
}

const videos: VideoItem[] = [
  { id: '1', src: '/videos/ugc-1.mp4', title: 'Skincare Routine', category: 'UGC' },
  { id: '2', src: '/videos/ugc-2.mp4', title: 'Product Review', category: 'UGC' },
  { id: '3', src: '/videos/ugc-3.mp4', title: 'Fashion Haul', category: 'UGC' },
  { id: '4', src: '/videos/ugc-4.mp4', title: 'Brand Unboxing', category: 'UGC' },
  { id: '5', src: '/videos/ugc-5.mp4', title: 'Get Ready With Me', category: 'Reels' },
  { id: '6', src: '/videos/ugc-6.mp4', title: 'Day in My Life', category: 'Reels' },
  { id: '7', src: '/videos/ugc-7.mp4', title: 'Makeup Tutorial', category: 'UGC' },
  { id: '8', src: '/videos/ugc-8.mp4', title: 'Lifestyle Content', category: 'Reels' },
];

const categories = ['Wszystkie', 'UGC', 'Reels'];

function VideoCard({ video, index, isVisible }: { video: VideoItem; index: number; isVisible: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="transition-all duration-700 ease-out"
        style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.9)',
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${400 + index * 100}ms`,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative w-full aspect-[9/16] bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border-4 border-white cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:ring-2 hover:ring-[var(--color-primary)]/40 hover:scale-[1.02] block"
        >
          <video
            src={video.src}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-2xl ml-0.5">play_arrow</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent px-4 pb-4 pt-10 text-left">
            <span className="text-white/80 text-xs font-medium tracking-[0.2em] uppercase block">
              {video.title}
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-1.5 h-1.5 bg-[var(--color-primary)]/60 blob-shape shrink-0" />
              <div className="w-5 h-[1px] bg-[var(--color-primary)]/40" />
              <span className="text-white/50 text-[10px] tracking-[0.15em] uppercase">{video.category}</span>
            </div>
          </div>
        </button>
      </div>

      {open && <VideoPlayer src={video.src} onClose={() => setOpen(false)} />}
    </>
  );
}

export default function VideoPortfolio() {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const { ref, isVisible } = useReveal(0.05);

  const filtered = activeCategory === 'Wszystkie'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  return (
    <section className="py-24 bg-[var(--color-brand-cream)]" id="portfolio" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <TextReveal
            text="Portfolio Wideo"
            as="h2"
            className="text-4xl md:text-5xl font-black serif-heading uppercase"
            staggerMs={60}
          />
          <p
            className="text-[var(--color-brand-brown)]/30 text-xs tracking-[0.15em] uppercase mt-4 flex items-center justify-center gap-2 transition-all duration-500"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '400ms' }}
          >
            <span className="material-symbols-outlined text-sm">play_circle</span>
            kliknij aby odtworzyć
          </p>
        </div>

        {/* Category filter */}
        <div
          className="flex justify-center gap-4 mb-12 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '300ms' }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/30'
                  : 'text-[var(--color-brand-brown)]/50 border border-[var(--color-brand-brown)]/15 hover:border-[var(--color-brand-brown)]/30 hover:text-[var(--color-brand-brown)]/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
