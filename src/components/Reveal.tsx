import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from 'react';

type RevealTag = 'div' | 'article' | 'aside' | 'li';

type RevealProps = {
  children: ReactNode;
  /** Rendered element. Pick the one the parent layout expects so no wrapper box is added. */
  as?: RevealTag;
  className?: string;
  /** Position in a staggered group. Each step delays the entry by 60ms. */
  index?: number;
};

/**
 * Entry animation for content that scrolls into view. It communicates reading order:
 * a section's heading settles before the items beneath it, and grouped items arrive in
 * sequence rather than all at once.
 *
 * The transition itself lives in CSS (`.reveal`), so this only decides when to switch
 * the element on. Anything that would otherwise strand content at opacity 0 (reduced
 * motion, or a browser without IntersectionObserver) switches it on immediately.
 */
function Reveal({ children, as: Tag = 'div', className, index = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setHasEntered(true);
      observer.disconnect();
    }, { rootMargin: '0px 0px -8% 0px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as Ref<never>}
      className={['reveal', hasEntered && 'is-in', className].filter(Boolean).join(' ')}
      style={index ? ({ '--reveal-delay': `${Math.min(index, 6) * 60}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
