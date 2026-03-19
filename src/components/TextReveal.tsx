'use client';

import { useReveal } from '@/hooks/useScrollAnimations';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  staggerMs?: number;
}

export default function TextReveal({ text, className = '', as: Tag = 'h2', staggerMs = 30 }: TextRevealProps) {
  const { ref, isVisible } = useReveal(0.2);

  const words = text.split(' ');

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className="inline-block transition-all ease-out"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              opacity: isVisible ? 1 : 0,
              transitionDuration: '600ms',
              transitionDelay: `${i * staggerMs}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
