import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { playBalloonAscentSound } from '../utils/soundEffects';

export default function HeartBalloonSequence({ onComplete }) {
  // Play realistic ascending balloon sound as balloons float up
  useEffect(() => {
    playBalloonAscentSound();
  }, []);

  // Define 14 heart balloons staggered by 450ms - 650ms
  const balloons = useMemo(() => {
    const palette = [
      { fill: 'url(#heart-grad-rose)', stroke: '#ff9fc3', glow: '#FF6FAE' },
      { fill: 'url(#heart-grad-pink)', stroke: '#ffbcd6', glow: '#FF85B8' },
      { fill: 'url(#heart-grad-deepred)', stroke: '#d9436e', glow: '#FF2A6D' },
      { fill: 'url(#heart-grad-blush)', stroke: '#ffd4e5', glow: '#FFA5C5' },
      { fill: 'url(#heart-grad-coral)', stroke: '#ffaa92', glow: '#FF7D66' },
      { fill: 'url(#heart-grad-lavender)', stroke: '#e4d5ff', glow: '#C7B8FF' },
    ];

    const list = [];
    let currentDelay = 0;

    // First balloon launches immediately at 0s, 2nd at ~0.55s, etc.
    const staggerDeltas = [0, 0.55, 0.5, 0.6, 0.48, 0.52, 0.58, 0.45, 0.55, 0.5, 0.48, 0.52, 0.55, 0.6];
    const horizontalPositions = [48, 22, 75, 38, 62, 15, 84, 52, 30, 70, 42, 60, 26, 80];

    for (let i = 0; i < staggerDeltas.length; i++) {
      currentDelay += staggerDeltas[i];
      const size = 56 + (i % 4) * 12 + Math.floor(Math.random() * 8); // 56px to 96px
      const theme = palette[i % palette.length];
      const xPercent = horizontalPositions[i % horizontalPositions.length] + (Math.random() * 6 - 3);
      const swayAmplitude = 18 + (i % 3) * 12; // 18px - 42px
      const swayDuration = 2.4 + (i % 3) * 0.6; // 2.4s - 3.6s
      const floatDuration = 5.2 + (Math.random() * 1.2); // 5.2s - 6.4s

      list.push({
        id: i,
        delay: currentDelay,
        size,
        theme,
        xPercent,
        swayAmplitude,
        swayDuration,
        floatDuration,
      });
    }

    return list;
  }, []);

  // Tiny glowing heart particles
  const glowingHearts = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      size: 10 + Math.random() * 14,
      delay: 0.8 + Math.random() * 5.5,
      duration: 4.5 + Math.random() * 2,
      driftX: (Math.random() - 0.5) * 80,
    }));
  }, []);

  // Timer for overall 8.5 second sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 8500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden select-none">
      {/* SVG Definitions for 3D Gradients & Specular Highlights */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <radialGradient id="heart-grad-rose" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFA6C9" />
            <stop offset="45%" stopColor="#FF6FAE" />
            <stop offset="90%" stopColor="#D43779" />
            <stop offset="100%" stopColor="#96174D" />
          </radialGradient>
          <radialGradient id="heart-grad-pink" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFD3E2" />
            <stop offset="50%" stopColor="#FF85B8" />
            <stop offset="95%" stopColor="#E04685" />
          </radialGradient>
          <radialGradient id="heart-grad-deepred" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF7A9C" />
            <stop offset="50%" stopColor="#E62E6B" />
            <stop offset="95%" stopColor="#8C0D37" />
          </radialGradient>
          <radialGradient id="heart-grad-blush" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="55%" stopColor="#FFB6D0" />
            <stop offset="95%" stopColor="#DE7297" />
          </radialGradient>
          <radialGradient id="heart-grad-coral" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFC8B3" />
            <stop offset="50%" stopColor="#FF7D66" />
            <stop offset="95%" stopColor="#C43B23" />
          </radialGradient>
          <radialGradient id="heart-grad-lavender" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F2EBFF" />
            <stop offset="50%" stopColor="#C7B8FF" />
            <stop offset="95%" stopColor="#8B70DF" />
          </radialGradient>
        </defs>
      </svg>

      {/* Atmospheric romantic pink/purple ambient overlay during balloon flight */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-romanticPink/15 via-transparent to-softLavender/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Center romantic message whisper during transition */}
      <motion.div 
        className="absolute top-1/4 inset-x-0 text-center px-4 z-40 select-none pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 0.95, 0.95, 0], y: [20, 0, 0, -20] }}
        transition={{ duration: 6, times: [0, 0.2, 0.8, 1], delay: 1 }}
      >
        <span className="font-serif italic text-2xl sm:text-3xl text-moonSilver/95 text-glow-moon tracking-wide">
          Our journey takes flight… ❤️
        </span>
      </motion.div>

      {/* Floating Tiny Glowing Heart Particles */}
      {glowingHearts.map((g) => (
        <motion.div
          key={`glow-${g.id}`}
          className="absolute text-romanticPink/60"
          style={{
            left: `${g.x}%`,
            bottom: '-40px',
            filter: 'drop-shadow(0 0 8px rgba(255, 111, 174, 0.8))',
          }}
          initial={{ y: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: '-110vh',
            x: [0, g.driftX, 0],
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.6, 1.1, 0.8],
          }}
          transition={{
            duration: g.duration,
            delay: g.delay,
            ease: "easeInOut",
          }}
        >
          <Heart style={{ width: g.size, height: g.size }} fill="currentColor" />
        </motion.div>
      ))}

      {/* Staggered Floating Heart Balloons */}
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute will-change-transform z-30"
          style={{
            left: `${b.xPercent}%`,
            bottom: '-150px',
            width: `${b.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: '-135vh',
            opacity: [0, 0.95, 1, 1, 0.85, 0],
          }}
          transition={{
            duration: b.floatDuration,
            delay: b.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Internal Side-to-Side Sway & Rotation */}
          <motion.div
            animate={{
              x: [-b.swayAmplitude, b.swayAmplitude, -b.swayAmplitude],
              rotate: [-7, 7, -7],
              scale: [1, 1.03, 0.98, 1],
            }}
            transition={{
              duration: b.swayDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            {/* Heart Balloon Shape with Highlights */}
            <div 
              className="relative rounded-full heart-balloon-3d"
              style={{
                width: `${b.size}px`,
                height: `${b.size * 0.95}px`,
              }}
            >
              <svg 
                viewBox="0 0 100 95" 
                className="w-full h-full overflow-visible"
              >
                {/* Heart body */}
                <path
                  d="M50 88 C20 62, 2 46, 2 27 C2 12, 13 2, 27 2 C36 2, 45 7, 50 14 C55 7, 64 2, 73 2 C87 2, 98 12, 98 27 C98 46, 80 62, 50 88 Z"
                  fill={b.theme.fill}
                  stroke={b.theme.stroke}
                  strokeWidth="0.8"
                />

                {/* Soft 3D Specular Highlight on Left Lobe */}
                <ellipse 
                  cx="28" 
                  cy="20" 
                  rx="12" 
                  ry="7" 
                  fill="rgba(255, 255, 255, 0.55)" 
                  transform="rotate(-28 28 20)" 
                  className="blur-[0.6px]"
                />
                <circle 
                  cx="20" 
                  cy="16" 
                  r="3.5" 
                  fill="rgba(255, 255, 255, 0.85)" 
                />

                {/* Subtle right lobe soft sheen */}
                <ellipse 
                  cx="70" 
                  cy="24" 
                  rx="7" 
                  ry="4" 
                  fill="rgba(255, 255, 255, 0.25)" 
                  transform="rotate(22 70 24)" 
                />

                {/* Bottom Tie Knot */}
                <polygon 
                  points="47,88 53,88 51,93 49,93" 
                  fill="#b02a60" 
                />
              </svg>
            </div>

            {/* Thin Curved Hanging String */}
            <div className="w-10 h-16 -mt-1 overflow-visible pointer-events-none">
              <svg viewBox="0 0 40 70" className="w-full h-full overflow-visible">
                <path
                  d="M20 0 Q14 18, 24 35 T20 70"
                  fill="none"
                  stroke="rgba(221, 231, 255, 0.45)"
                  strokeWidth="1"
                  strokeDasharray="2 1"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Skip button allows instant navigation if desired */}
      <div className="absolute bottom-6 right-6 z-50 pointer-events-auto">
        <button
          onClick={onComplete}
          className="text-xs text-moonSilver/50 hover:text-white px-3 py-1.5 rounded-full bg-midnight/60 border border-white/10 backdrop-blur-sm transition-all cursor-pointer"
        >
          Skip animation ↷
        </button>
      </div>
    </div>
  );
}
