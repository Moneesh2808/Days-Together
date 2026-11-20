import React, { useMemo } from 'react';

export default function TwinklingStars({ count = 85, parallaxOffset = { x: 0, y: 0 } }) {
  const stars = useMemo(() => {
    const list = [];
    // Seeded-like diverse distribution
    for (let i = 0; i < count; i++) {
      const size = Math.random() < 0.7 ? 1.5 : Math.random() < 0.9 ? 2.5 : 3.5;
      const x = Math.random() * 100;
      const y = Math.random() * 85; // Upper 85% of sky
      const duration = 2.5 + Math.random() * 4; // 2.5s - 6.5s
      const delay = Math.random() * 5;
      const baseOpacity = 0.25 + Math.random() * 0.55;
      
      // Colors: moon silver, lavender, warm gold, soft rose
      const colorTypes = ['#DDE7FF', '#FFFFFF', '#C7B8FF', '#FFD98A', '#FFB3D9'];
      const color = colorTypes[Math.floor(Math.random() * colorTypes.length)];
      const hasSpike = size > 2.8;

      list.push({ id: i, size, x, y, duration, delay, baseOpacity, color, hasSpike });
    }
    return list;
  }, [count]);

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-700 ease-out z-0"
      style={{
        transform: `translate3d(${parallaxOffset.x * 0.03}px, ${parallaxOffset.y * 0.03}px, 0)`
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}, 0 0 ${star.size * 4}px ${star.color}66`,
            animation: `twinkle ${star.duration}s infinite ease-in-out ${star.delay}s`,
            opacity: star.baseOpacity,
          }}
        >
          {star.hasSpike && (
            <div 
              className="absolute -inset-1 opacity-70 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${star.color} 0%, transparent 70%)`,
                transform: 'scale(2.2)',
              }}
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.25);
          }
        }
      `}</style>
    </div>
  );
}
