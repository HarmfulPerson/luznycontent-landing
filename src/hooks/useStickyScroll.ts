'use client';

import { useEffect, useRef, useState } from 'react';

export interface StickyScrollState {
  progress: number;
  activeStep: number;
  /** 0→1 within the current step */
  stepProgress: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  /** Total scroll height in vh */
  totalHeightVh: number;
}

/**
 * Sticky scroll hook with per-step weight support.
 * weights[i] = how many "scroll units" step i takes.
 * Default weight = 1 (100vh). Weight 5 = 500vh of scroll for that step.
 */
export function useStickyScroll(
  stepCount: number,
  weights?: number[],
): StickyScrollState & { isMobile: boolean } {
  const containerRef = useRef<HTMLDivElement>(null);

  // Build cumulative breakpoints from weights
  const w = weights ?? Array(stepCount).fill(1);
  const totalWeight = w.reduce((a, b) => a + b, 0);
  // breakpoints[i] = start of step i as fraction 0→1
  const breakpoints: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < stepCount; i++) {
    breakpoints.push(cumulative / totalWeight);
    cumulative += w[i];
  }
  const totalHeightVh = totalWeight * 100;

  const [state, setState] = useState<StickyScrollState>({
    progress: 0,
    activeStep: 0,
    stepProgress: 0,
    containerRef,
    isActive: false,
    totalHeightVh,
  });
  const [isMobile, setIsMobile] = useState(false);
  const prevStep = useRef(0);

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
        if (!container) { ticking = false; return; }

        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        const scrollableDistance = containerHeight - viewportHeight;

        if (scrollableDistance <= 0) { ticking = false; return; }

        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

        // Find which step we're in based on weighted breakpoints
        let rawStep = 0;
        for (let i = stepCount - 1; i >= 0; i--) {
          if (progress >= breakpoints[i]) {
            rawStep = i;
            break;
          }
        }

        // Hysteresis
        const HYSTERESIS = 0.01; // smaller hysteresis since weights handle spacing
        const current = prevStep.current;
        let activeStep = current;

        if (rawStep > current) {
          const boundary = breakpoints[current + 1] ?? 1;
          if (progress >= boundary + HYSTERESIS) activeStep = rawStep;
        } else if (rawStep < current) {
          const boundary = breakpoints[current];
          if (progress < boundary - HYSTERESIS) activeStep = rawStep;
        }

        activeStep = Math.max(0, Math.min(activeStep, stepCount - 1));
        prevStep.current = activeStep;

        // Step progress: 0→1 within this step
        const stepStart = breakpoints[activeStep];
        const stepEnd = activeStep < stepCount - 1 ? breakpoints[activeStep + 1] : 1;
        const stepWidth = stepEnd - stepStart;
        const stepProgress = stepWidth > 0 ? (progress - stepStart) / stepWidth : 0;

        const isActive = rect.top <= 0 && rect.bottom >= viewportHeight;

        setState({
          progress,
          activeStep,
          stepProgress: Math.max(0, Math.min(1, stepProgress)),
          containerRef,
          isActive,
          totalHeightVh,
        });

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [stepCount, isMobile, totalWeight, totalHeightVh, breakpoints]);

  return { ...state, isMobile };
}
