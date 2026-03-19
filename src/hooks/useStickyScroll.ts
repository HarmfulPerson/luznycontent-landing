'use client';

import { useEffect, useRef, useState } from 'react';

export interface StickyScrollState {
  progress: number;
  activeStep: number;
  stepProgress: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
}

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

  // Keep previous activeStep in ref for hysteresis comparison
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
        if (!container) {
          ticking = false;
          return;
        }

        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        const scrollableDistance = containerHeight - viewportHeight;

        if (scrollableDistance <= 0) {
          ticking = false;
          return;
        }

        const rawProgress = scrolled / scrollableDistance;
        const progress = Math.max(0, Math.min(1, rawProgress));
        const scaledProgress = progress * stepCount;

        // Hysteresis: require 8% overshoot past boundary to switch step.
        // This prevents oscillation at step edges from micro-scrolls.
        const HYSTERESIS = 0.08;
        const current = prevStep.current;
        let activeStep = current;

        // Check if we should move forward
        if (scaledProgress >= current + 1 + HYSTERESIS && current < stepCount - 1) {
          activeStep = Math.min(Math.floor(scaledProgress - HYSTERESIS), stepCount - 1);
        }
        // Check if we should move backward
        else if (scaledProgress < current - HYSTERESIS && current > 0) {
          activeStep = Math.floor(scaledProgress + HYSTERESIS);
        }
        // Clamp
        activeStep = Math.max(0, Math.min(activeStep, stepCount - 1));

        prevStep.current = activeStep;
        const stepProgress = scaledProgress - activeStep;
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
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [stepCount, heightPerStepVh, isMobile]);

  return { ...state, isMobile };
}
