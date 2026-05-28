import { useMemo } from 'react';

interface Props {
  count?: number;
  color?: string;
  className?: string;
}

export default function FloatingParticles({ count = 18, color = 'dental-green', className = '' }: Props) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = 4 + Math.random() * 10;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 12 + Math.random() * 18;
      const delay = Math.random() * -20;
      const opacity = 0.06 + Math.random() * 0.1;
      const drift = 20 + Math.random() * 40;
      return { id: i, size, left, top, duration, delay, opacity, drift };
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full bg-${color}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--drift': `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
