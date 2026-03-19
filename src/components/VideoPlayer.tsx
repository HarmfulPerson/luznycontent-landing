'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface VideoPlayerProps {
  src: string;
  onClose: () => void;
}

function VideoPlayerOverlay({ src, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  // Play is triggered by onCanPlay to ensure it works after src loads
  const handleCanPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.paused) return;
    v.muted = false;
    v.play().catch(() => {
      // Browser blocked unmuted — fallback
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  useEffect(() => {
    return () => {
      const v = videoRef.current;
      if (v) { v.pause(); v.currentTime = 0; }
    };
  }, []);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Block body scroll
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = orig; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
      onClick={onClose}
    >
      <div
        className="relative w-[min(85vh,400px)] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl"
        style={{ animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
        onClick={e => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          autoPlay
          onCanPlay={handleCanPlay}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Sound wave / muted indicator */}
        <div className="absolute top-4 right-4 flex items-end gap-[3px] h-5 pointer-events-none">
          {muted ? (
            <span className="material-symbols-outlined text-white/60 text-lg">volume_off</span>
          ) : (
            <>
              <div className="w-[3px] bg-white/80 rounded-full animate-[soundbar_0.5s_ease-in-out_infinite_alternate]" style={{ height: '40%', animationDelay: '0ms' }} />
              <div className="w-[3px] bg-white/80 rounded-full animate-[soundbar_0.5s_ease-in-out_infinite_alternate]" style={{ height: '80%', animationDelay: '150ms' }} />
              <div className="w-[3px] bg-white/80 rounded-full animate-[soundbar_0.5s_ease-in-out_infinite_alternate]" style={{ height: '60%', animationDelay: '300ms' }} />
            </>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-white text-xl">close</span>
        </button>

        {/* Mute toggle — bottom right */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-white text-lg">
            {muted ? 'volume_off' : 'volume_up'}
          </span>
        </button>

        {/* Glow border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-[var(--color-primary)]/30 pointer-events-none" />
      </div>
    </div>
  );
}

export default function VideoPlayer({ src, onClose }: VideoPlayerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(
    <VideoPlayerOverlay src={src} onClose={onClose} />,
    document.body,
  );
}
