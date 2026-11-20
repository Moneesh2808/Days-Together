import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, ImageOff } from 'lucide-react';
import { config } from '../config';

export default function MemoryPhoto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [imgError, setImgError] = useState(false);

  // 3D Tilt perspective effect state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Rose petals & glowing floating hearts around photo
  const surroundingPetals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 5 + (i * 8) + (Math.random() * 4),
      delay: i * 0.5,
      duration: 5 + Math.random() * 3,
      size: 14 + Math.random() * 10,
    }));
  }, []);

  return (
    <section 
      id="memories"
      className="relative min-h-[90vh] py-20 sm:py-28 flex flex-col items-center justify-center px-4 sm:px-6 z-20 select-none overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[580px] h-[380px] sm:h-[580px] rounded-full bg-radial from-romanticPink/15 via-softLavender/5 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Rose Petals & Heart Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {surroundingPetals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-romanticPink/40"
            style={{
              left: `${p.left}%`,
              bottom: '-30px',
              filter: 'drop-shadow(0 0 6px rgba(255,111,174,0.4))',
            }}
            animate={{
              y: '-100vh',
              x: [0, (p.id % 2 === 0 ? 35 : -35), 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          >
            {p.id % 2 === 0 ? (
              <Heart style={{ width: p.size, height: p.size }} fill="currentColor" />
            ) : (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9 5 4 10 4 15C4 19 7.5 22 12 22C16.5 22 20 19 20 15C20 10 15 5 12 2Z" opacity="0.8" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative max-w-2xl mx-auto flex flex-col items-center text-center z-10 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Caption Above Photo (No AI sparkles) */}
        <motion.div
          className="inline-flex items-center gap-2.5 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Heart className="w-4 h-4 text-romanticPink fill-romanticPink animate-pulse" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white text-glow-rose tracking-wide">
            {config.photoCaption}
          </h2>
          <Heart className="w-4 h-4 text-romanticPink fill-romanticPink animate-pulse" />
        </motion.div>

        {/* 3D Photo Container Frame */}
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative group p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-romanticPink/40 via-softLavender/20 to-fairyGold/30 border border-romanticPink/50 shadow-[0_0_35px_rgba(255,111,174,0.3),0_15px_45px_rgba(5,8,22,0.9)] backdrop-blur-md transition-all duration-300 ease-out animate-float-slow"
          style={{
            perspective: '1000px',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          {/* Decorative Corner Hearts */}
          <div className="absolute -top-3 -left-3 text-romanticPink drop-shadow-[0_0_8px_#FF6FAE]">
            <Heart className="w-6 h-6 fill-romanticPink animate-pulse" />
          </div>
          <div className="absolute -top-3 -right-3 text-fairyGold drop-shadow-[0_0_8px_#FFD98A]">
            <Heart className="w-6 h-6 fill-fairyGold animate-pulse" />
          </div>
          <div className="absolute -bottom-3 -left-3 text-fairyGold drop-shadow-[0_0_8px_#FFD98A]">
            <Heart className="w-6 h-6 fill-fairyGold animate-pulse" />
          </div>
          <div className="absolute -bottom-3 -right-3 text-romanticPink drop-shadow-[0_0_8px_#FF6FAE]">
            <Heart className="w-6 h-6 fill-romanticPink animate-pulse" />
          </div>

          {/* Shimmer Light Sweep across photo frame */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-30">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer" />
          </div>

          {/* Photo inner frame */}
          <div className="relative w-[280px] sm:w-[380px] md:w-[440px] max-w-[85vw] aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-midnight/80 border border-white/20">
            {!imgError ? (
              <img
                src={config.memoryPhoto}
                alt="Our Beautiful Memory"
                onError={() => setImgError(true)}
                className="w-full h-full object-contain sm:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-moonSilver/60 gap-3">
                <ImageOff className="w-12 h-12 text-romanticPink/50" />
                <span className="font-serif italic text-base">Our Most Precious Memory ❤️</span>
              </div>
            )}

            {/* Subtle romantic vignette */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 45px rgba(5, 8, 22, 0.65)'
              }}
            />
          </div>
        </div>

        {/* Quote Below Photo */}
        <motion.div 
          className="mt-8 px-4 max-w-xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-moonSilver leading-relaxed text-glow-moon">
            “{config.photoQuote}”
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
