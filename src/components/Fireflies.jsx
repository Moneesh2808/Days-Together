import React, { useMemo } from 'react';

export default function Fireflies({ count = 28 }) {
  const fireflies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x = Math.random() * 100;
      const y = 50 + Math.random() * 48; // Lower half towards ground & tree
      const size = 2 + Math.random() * 3.5;
      const duration = 4 + Math.random() * 6;
      const delay = Math.random() * 5;
      const driftX = (Math.random() - 0.5) * 60;
      const driftY = -20 - Math.random() * 50;
      const isGold = Math.random() > 0.35;
      const color = isGold ? '#FFD98A' : '#FF6FAE';

      return {
        id: i,
        x,
        y,
        size,
        duration,
        delay,
        driftX,
        driftY,
        color
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            backgroundColor: f.color,
            boxShadow: `0 0 8px ${f.color}, 0 0 16px ${f.color}88, 0 0 24px ${f.color}44`,
            animation: `fireflyFloat ${f.duration}s infinite ease-in-out ${f.delay}s`,
            ['--drift-x']: `${f.driftX}px`,
            ['--drift-y']: `${f.driftY}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes fireflyFloat {
          0%, 100% {
            opacity: 0.1;
            transform: translate3d(0, 0, 0) scale(0.8);
          }
          30% {
            opacity: 0.95;
            transform: translate3d(calc(var(--drift-x) * 0.5), calc(var(--drift-y) * 0.4), 0) scale(1.2);
          }
          70% {
            opacity: 0.8;
            transform: translate3d(var(--drift-x), var(--drift-y), 0) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
