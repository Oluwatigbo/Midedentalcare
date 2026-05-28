import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on non-touch devices
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] rounded-full mix-blend-soft-light"
      style={{
        width: 500,
        height: 500,
        left: pos.x - 250,
        top: pos.y - 250,
        background: 'radial-gradient(circle, rgba(74,124,111,0.07) 0%, transparent 70%)',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  );
}
