'use client';

import { useEffect, useRef, useState } from 'react';

export interface StickyScrollState {
  /** Scroll progress through the entire sticky section: 0 → 1 */
  progress: number;
  /** Current active step index (0-based) */
  activeStep: number;
  /** Progress within the current step: 0 → 1 */
  stepProgress: number;
  /** Ref to attach to the outer (tall) container */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Whether the sticky section is currently in viewport */
  isActive: boolean;
}

/**
 * Custom hook for sticky scroll storytelling.
 *
 * How it works:
 * 1. The outer container has a large height (steps × heightPerStep vh)
 *    creating "scroll runway" for the animation.
 * 2. Inside, a sticky div (h-screen, top-0) stays fixed in viewport.
 * 3. As user scrolls through the tall container, we calculate:
 *    - progress (0→1): how far through the entire section
 *    - activeStep: which step we're on (Math.floor)
 *    - stepProgress (0→1): how far within the current step
 * 4. Components use these values to animate content transitions.
 *
 * On mobile (< 768px), the hook returns isMobile=true so the component
 * can fall back to a stacked layout instead of sticky.
 */
export function useStickyScroll(
  stepCount: number,
  heightPerStepVh = 100,
): StickyScrollState & { isMobile: boolean } {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<StickyScrollState>({
    progress: 0,
    activeStep: 0,
    stepProgress: 0,
    containerRef,
    isActive: false,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) {
          ticking = false;
          return;
        }

        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;

        // How far the container has scrolled past the top of viewport
        const scrolled = -rect.top;
        // Total scrollable distance (container height minus one viewport)
        const scrollableDistance = containerHeight - viewportHeight;

        if (scrollableDistance <= 0) {
          ticking = false;
          return;
        }

        // Raw progress: 0 when top of container hits top of viewport,
        // 1 when bottom of container hits bottom of viewport
        const rawProgress = scrolled / scrollableDistance;
        const progress = Math.max(0, Math.min(1, rawProgress));

        // Map progress to steps
        const scaledProgress = progress * stepCount;
        const activeStep = Math.min(
          Math.floor(scaledProgress),
          stepCount - 1,
        );
        const stepProgress = scaledProgress - activeStep;

        // Is the sticky section currently in viewport?
        const isActive = rect.top <= 0 && rect.bottom >= viewportHeight;

        setState({
          progress,
          activeStep,
          stepProgress: Math.max(0, Math.min(1, stepProgress)),
          containerRef,
          isActive,
        });

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', onScroll);
  }, [stepCount, heightPerStepVh, isMobile]);

  return { ...state, isMobile };
}
