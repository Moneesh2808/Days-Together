import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../config';

export default function HeroSection({ onOpenSurprise, isTransitioning }) {
  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-20 select-none overflow-hidden">
      {/* Center glowing focus aura */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#050816]/30 to-[#050816]/75 pointer-events-none" />

      <motion.div 
        className="relative max-w-3xl mx-auto flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1, 
          y: isTransitioning ? -40 : 0,
          scale: isTransitioning ? 0.96 : 1,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative Top Pill (Clean romantic heart badge, no AI sparkles) */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-softLavender/10 border border-softLavender/20 backdrop-blur-md mb-6 shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Heart className="w-3.5 h-3.5 text-romanticPink fill-romanticPink animate-pulse" />
          <span className="text-xs sm:text-sm tracking-widest text-moonSilver/90 uppercase font-light">
            {config.landing.intro}
          </span>
          <Heart className="w-3.5 h-3.5 text-romanticPink fill-romanticPink animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-white mb-6 text-glow-moon"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
        >
          {config.landing.title}
        </motion.h1>

        {/* Heartfelt Lines */}
        <div className="space-y-4 max-w-2xl px-4 mb-10">
          <motion.p 
            className="text-base sm:text-xl md:text-2xl text-moonSilver/90 font-light leading-relaxed italic font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            “{config.landing.line1}”
          </motion.p>

          <motion.p 
            className="text-sm sm:text-base md:text-lg text-softLavender/80 font-normal leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.0 }}
          >
            {config.landing.line2}
          </motion.p>
        </div>

        {/* Surprise Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <button
            onClick={onOpenSurprise}
            disabled={isTransitioning}
            className={`
              relative group px-8 sm:px-10 py-4 sm:py-5 rounded-full font-medium text-base sm:text-lg
              bg-gradient-to-r from-[#FF6FAE] via-[#e2579b] to-[#FF8C68]
              text-white shadow-lg shadow-romanticPink/30
              btn-romantic-heartbeat
              transition-all duration-300 ease-out
              hover:shadow-romanticPink/60 hover:scale-[1.04] active:scale-[0.98]
              border border-white/30 backdrop-blur-sm
              ${isTransitioning ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
            `}
            aria-label="Open your romantic surprise"
          >
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer" />
            </div>

            <span className="relative flex items-center justify-center gap-3">
              <Heart className="w-5 h-5 text-fairyGold fill-fairyGold group-hover:scale-110 transition-transform" />
              <span className="tracking-wide font-semibold text-shadow-sm">
                Open Your Surprise ❤️
              </span>
              <Heart className="w-5 h-5 text-white fill-white/80 group-hover:scale-125 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Subtle scroll hint */}
        <motion.div 
          className="mt-12 text-xs tracking-widest text-moonSilver/40 uppercase flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span>Tap to begin our chapter</span>
          <div className="w-4 h-7 rounded-full border border-moonSilver/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-romanticPink animate-bounce" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
