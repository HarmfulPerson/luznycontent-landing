'use client';

import { useState, useRef } from 'react';
import { useReveal } from '@/hooks/useScrollAnimations';
import TextReveal from './TextReveal';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
      setMuted(true);
      videoRef.current.muted = true;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <div
      className="group cursor-pointer transition-all duration-700 ease-out"
      style={{
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.9)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${400 + index * 100}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[9/16] bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border-4 border-white group-hover:shadow-2xl group-hover:-translate-y-3 group-hover:shadow-[var(--color-primary)]/20 transition-all duration-500">
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10" />

        {/* Play button — hidden when playing */}
        <div
          className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300"
          style={{ opacity: playing ? 0 : 1, pointerEvents: playing ? 'none' : 'auto' }}
          onClick={togglePlay}
        >
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[var(--color-primary)] transition-all duration-300">
            <span className="material-symbols-outlined text-[var(--color-primary)] group-hover:text-white text-2xl ml-1 transition-colors">play_arrow</span>
          </div>
        </div>

        {/* Mute/unmute button — visible when playing */}
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 z-30 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200 cursor-pointer"
          style={{ opacity: playing ? 1 : 0, pointerEvents: playing ? 'auto' : 'none' }}
        >
          <span className="material-symbols-outlined text-white text-lg">
            {muted ? 'volume_off' : 'volume_up'}
          </span>
        </button>

        {/* Label — always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform md:translate-y-1 md:group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-white text-xs font-bold uppercase tracking-wider bg-[var(--color-primary)]/80 px-2 py-1 rounded">
            {video.category}
          </span>
          <p className="text-white text-sm font-medium mt-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            {video.title}
          </p>
        </div>
      </div>
    </div>
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
            className="text-[var(--color-primary)] tracking-widest uppercase text-sm mt-4 transition-all duration-500"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '400ms' }}
          >
            Najedź aby odtworzyć
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
