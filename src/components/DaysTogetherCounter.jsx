import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config, calculateDaysTogether } from '../config';

export default function DaysTogetherCounter() {
  const targetDays = calculateDaysTogether();
  const [displayCount, setDisplayCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Smooth counting animation when in view
  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const duration = 2200; // 2.2 seconds

    const animateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth cubic ease out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * targetDays);
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        setDisplayCount(targetDays);
      }
    };

    requestAnimationFrame(animateCounter);
  }, [isInView, targetDays]);

  const quote1 = config.milestone.quote1.replace('{days}', targetDays);

  return (
    <section 
      ref={ref}
      id="milestone"
      className="relative min-h-[90vh] py-20 sm:py-28 md:py-32 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 select-none overflow-hidden"
    >
      {/* Soft romantic background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-radial from-romanticPink/10 via-softLavender/5 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        className="relative max-w-3xl mx-auto flex flex-col items-center w-full"
        initial={{ opacity: 0, y: 35 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Badge (clean hearts, no AI sparkles) */}
        <motion.div 
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-romanticPink/20 via-softLavender/15 to-romanticPink/20 border border-romanticPink/40 backdrop-blur-md mb-8 shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Heart className="w-4 h-4 text-romanticPink fill-romanticPink animate-pulse" />
          <span className="text-xs sm:text-sm tracking-widest text-moonSilver font-medium uppercase">
            {config.milestone.badge}
          </span>
          <Heart className="w-4 h-4 text-romanticPink fill-romanticPink animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h2 
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-moonSilver tracking-wide mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {config.milestone.heading}
        </motion.h2>

        {/* Big Counter Card Display - Crystal Clear, High Contrast, Readable & Stylish */}
        <div className="relative my-4 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-midnight/50 border border-white/10 backdrop-blur-md shadow-2xl">
          {/* Subtle surrounding glow ring */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-romanticPink/10 blur-xl pointer-events-none" />
          
          {/* Main Huge Number: Solid high-contrast white with crisp rose-gold gradient edge */}
          <motion.div
            className="relative font-serif text-8xl sm:text-9xl md:text-[11rem] font-bold text-white tracking-tight leading-none py-1 select-text drop-shadow-[0_4px_24px_rgba(255,111,174,0.45)]"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
          >
            {displayCount}
          </motion.div>

          {/* Subtitle: "Days Together" - bold, stylish, crisp */}
          <motion.span 
            className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-widest text-fairyGold font-semibold uppercase mt-3 text-glow-gold"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            {config.milestone.counterSuffix}
          </motion.span>
        </div>

        {/* Romantic Heart Divider */}
        <div className="flex items-center justify-center gap-4 my-8 w-64 max-w-full">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-romanticPink/40 to-romanticPink/70" />
          <Heart className="w-4 h-4 text-romanticPink fill-romanticPink/80" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-romanticPink/40 to-romanticPink/70" />
        </div>

        {/* Heartfelt Quotes */}
        <div className="max-w-2xl px-4 space-y-4">
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-moonSilver font-serif leading-relaxed italic"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            “{quote1}”
          </motion.p>

          <motion.p 
            className="text-sm sm:text-base text-softLavender/90 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            {config.milestone.quote2}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
