import React from 'react';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'zoom-in' | 'progressive';
  delay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce
  });

  const getAnimationClass = () => {
    const baseClass = `scroll-${animation}`;
    const delayClass = delay > 0 ? `scroll-delay-${Math.min(delay * 100, 500)}` : '';
    const visibleClass = isVisible ? 'visible' : '';

    return `${baseClass} ${delayClass} ${visibleClass} scroll-animation ${className}`.trim();
  };

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className={getAnimationClass()}>
      {children}
    </div>
  );
};

export default ScrollAnimation; 