import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Feather } from 'lucide-react';
import { config, calculateDaysTogether } from '../config';

export default function LoveLetter() {
  const targetDays = calculateDaysTogether();

  return (
    <section 
      id="letter"
      className="relative min-h-[100vh] py-20 sm:py-28 md:py-32 flex flex-col items-center justify-center px-3.5 sm:px-6 z-20 select-none overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-radial from-softLavender/10 via-romanticPink/5 to-transparent blur-3xl pointer-events-none" />

      {/* Main Container Card: Frosted Glass Romantic Letter with Enhanced Mobile Readability */}
      <motion.div
        className="relative max-w-2xl w-full mx-auto p-5 sm:p-8 md:p-12 rounded-3xl bg-[#0e0920]/90 border border-romanticPink/30 shadow-[0_15px_50px_rgba(5,8,22,0.95),0_0_30px_rgba(255,111,174,0.15)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle decorative gold corner filigree */}
        <div className="absolute top-3.5 left-3.5 w-6 h-6 border-t-2 border-l-2 border-fairyGold/40 rounded-tl pointer-events-none" />
        <div className="absolute top-3.5 right-3.5 w-6 h-6 border-t-2 border-r-2 border-fairyGold/40 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3.5 left-3.5 w-6 h-6 border-b-2 border-l-2 border-fairyGold/40 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3.5 right-3.5 w-6 h-6 border-b-2 border-r-2 border-fairyGold/40 rounded-br pointer-events-none" />

        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-romanticPink/15 border border-romanticPink/30 mb-4 text-romanticPink shadow-[0_0_15px_rgba(255,111,174,0.4)]">
            <Feather className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white text-glow-rose tracking-wide leading-snug px-2">
            {config.letter.heading}
          </h2>

          <div className="flex items-center justify-center gap-3 mt-4 w-40">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-fairyGold/60" />
            <Heart className="w-3.5 h-3.5 text-fairyGold fill-fairyGold" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-fairyGold/60" />
          </div>
        </div>

        {/* Letter Body: Clean, High-Contrast, Left-Aligned for Crystal Clear Mobile Readability */}
        <div className="space-y-6 text-white/95 font-serif text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-loose select-text">
          {/* Salutation */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl font-medium text-fairyGold italic"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {config.letter.salutation}
          </motion.p>

          {/* Letter Paragraphs with clear mobile readability */}
          {config.letter.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              className="text-left text-white/90 leading-relaxed sm:leading-loose"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: idx * 0.08 }}
            >
              {para}
            </motion.p>
          ))}

          {/* Personal Declarations */}
          <div className="my-8 py-5 border-y border-softLavender/20 space-y-3.5 text-left">
            {config.letter.declarations.map((dec, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2.5 text-romanticPink font-semibold text-lg sm:text-xl md:text-2xl italic tracking-wide"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.12 * idx }}
              >
                <Heart className="w-4 h-4 fill-romanticPink text-romanticPink shrink-0 animate-pulse" />
                <span>{dec}</span>
              </motion.div>
            ))}
          </div>

          {/* Closing paragraphs */}
          <div className="space-y-4">
            <motion.p
              className="text-left text-white/90 leading-relaxed sm:leading-loose"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              {config.letter.closing[0]}
            </motion.p>

            <motion.p
              className="text-left text-white/90 leading-relaxed sm:leading-loose"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              {config.letter.closing[1]}
            </motion.p>
          </div>

          {/* Signoff */}
          <motion.div 
            className="pt-8 text-right space-y-2 border-t border-softLavender/20"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-serif italic text-lg sm:text-xl text-softLavender">
              {config.letter.closing[2]}
            </p>
            <p className="font-serif font-bold text-lg sm:text-xl text-fairyGold text-glow-gold">
              {config.letter.closing[3].replace('{days}', targetDays)}
            </p>
            <p className="font-serif italic text-xl sm:text-2xl text-romanticPink font-bold tracking-wide">
              {config.letter.closing[4]}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
