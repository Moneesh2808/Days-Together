import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function ShootingStarScene() {
  const containerRef = useRef(null);
  // Viewport-aware: active ONLY while in view, turns false when scrolled down past
  const isInView = useInView(containerRef, { margin: "-12% 0px -12% 0px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);

  // Automatically start shooting stars when scrolled into view; immediately disappear when scrolled away
  useEffect(() => {
    if (isInView) {
      setIsPlaying(true);
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 5200);
      return () => clearTimeout(timer);
    } else {
      // Disappear immediately when page is scrolled down past this section
      setIsPlaying(false);
    }
  }, [isInView, triggerCount]);

  // Natural diagonal shooting stars with staggered delays
  const shootingStars = useMemo(() => {
    return [
      { id: 1, startX: 15, startY: 8, length: 150, angle: 36, duration: 1.1, delay: 0.1 },
      { id: 2, startX: 38, startY: 14, length: 190, angle: 41, duration: 1.3, delay: 0.7 },
      { id: 3, startX: 65, startY: 6, length: 170, angle: 34, duration: 1.2, delay: 1.4 },
      { id: 4, startX: 25, startY: 25, length: 220, angle: 42, duration: 1.4, delay: 2.1 },
      { id: 5, startX: 55, startY: 18, length: 160, angle: 38, duration: 1.2, delay: 2.9 },
      { id: 6, startX: 30, startY: 10, length: 200, angle: 39, duration: 1.3, delay: 3.6 },
      { id: 7, startX: 48, startY: 4, length: 240, angle: 35, duration: 1.5, delay: 4.2 },
    ];
  }, [triggerCount]);

  const handleMakeWish = () => {
    setIsPlaying(true);
    setTriggerCount(c => c + 1);
    setTimeout(() => {
      setIsPlaying(false);
    }, 5200);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[65vh] md:min-h-[75vh] w-full flex flex-col items-center justify-center overflow-hidden z-20 py-16 px-4 select-none"
    >
      {/* 
        NOTE: Strictly ONE single realistic Moon is maintained globally in App.jsx.
        No duplicate Moon is rendered here!
      */}

      {/* Shooting Stars Layer (Active ONLY when section is in view) */}
      {isPlaying && isInView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
          {shootingStars.map((star) => (
            <div
              key={`${triggerCount}-${star.id}`}
              className="absolute pointer-events-none"
              style={{
                left: `${star.startX}%`,
                top: `${star.startY}%`,
                transform: `rotate(${star.angle}deg)`,
              }}
            >
              <div
                className="relative shooting-star-streak flex items-center"
                style={{
                  width: `${star.length}px`,
                  animation: `shootStar ${star.duration}s ease-in-out ${star.delay}s forwards`,
                  opacity: 0,
                }}
              >
                {/* Glowing leading star head */}
                <div className="absolute -left-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#fff,0_0_20px_#FFD98A]" />
              </div>
            </div>
          ))}

          <style>{`
            @keyframes shootStar {
              0% {
                transform: translateX(0) scaleX(0.2);
                opacity: 0;
              }
              15% {
                opacity: 1;
                transform: translateX(60px) scaleX(1);
              }
              80% {
                opacity: 0.9;
                transform: translateX(280px) scaleX(1.1);
              }
              100% {
                opacity: 0;
                transform: translateX(450px) scaleX(0.4);
              }
            }
          `}</style>
        </div>
      )}

      {/* Center Romantic Text Overlay (No AI sparkles) */}
      <motion.div
        className="relative z-30 max-w-xl mx-auto text-center px-4 backdrop-blur-[2px] py-8 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-fairyGold mb-3">
          <Heart className="w-3.5 h-3.5 fill-fairyGold text-fairyGold" />
          <span>A Sky Made For You</span>
          <Heart className="w-3.5 h-3.5 fill-fairyGold text-fairyGold" />
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 text-glow-moon">
          When Shooting Stars Cross Our Sky
        </h3>

        <p className="text-sm sm:text-base text-moonSilver/90 font-light leading-relaxed mb-6 font-serif italic">
          “Every time a star falls tonight, I whisper a wish for our endless tomorrows together.”
        </p>

        {/* Wish Again Button */}
        <motion.button
          onClick={handleMakeWish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-softLavender/10 hover:bg-softLavender/20 border border-softLavender/30 text-moonSilver transition-all duration-300 shadow-sm cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 text-romanticPink fill-romanticPink" />
          <span>{isPlaying ? "Watching the sky… ❤️" : "Make Another Wish ✨"}</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
