import { type ReactNode, type CSSProperties } from 'react';
import { useInView } from '../hooks/useInView';

type Animation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'blur-in'
  | 'flip-up';

interface Props {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  as?: keyof HTMLElementTagNameMap;
}

const transforms: Record<Animation, string> = {
  'fade-up': 'translateY(60px)',
  'fade-down': 'translateY(-60px)',
  'fade-left': 'translateX(-60px)',
  'fade-right': 'translateX(60px)',
  'scale-up': 'scale(0.85)',
  'blur-in': 'translateY(20px)',
  'flip-up': 'perspective(800px) rotateX(15deg) translateY(40px)',
};

export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.15,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  const hidden: CSSProperties = {
    opacity: 0,
    transform: transforms[animation],
    filter: animation === 'blur-in' ? 'blur(12px)' : 'none',
    transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    willChange: 'opacity, transform, filter',
  };

  const visible: CSSProperties = {
    opacity: 1,
    transform: 'translateY(0) translateX(0) scale(1) rotateX(0deg)',
    filter: 'blur(0)',
    transition: hidden.transition,
    willChange: 'auto',
  };

  return (
    <div ref={ref} className={className} style={inView ? visible : hidden}>
      {children}
    </div>
  );
}
