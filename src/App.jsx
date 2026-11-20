import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Background & Atmospheric Components
import MountainNightBackground from './components/MountainNightBackground';
import TwinklingStars from './components/TwinklingStars';
import Moon from './components/Moon';
import DecoratedTree from './components/DecoratedTree';
import Fireflies from './components/Fireflies';

// Story Flow Components
import HeroSection from './components/HeroSection';
import HeartBalloonSequence from './components/HeartBalloonSequence';
import DaysTogetherCounter from './components/DaysTogetherCounter';
import ShootingStarScene from './components/ShootingStarScene';
import MemoryPhoto from './components/MemoryPhoto';
import LoveLetter from './components/LoveLetter';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [stage, setStage] = useState('landing'); // 'landing' | 'balloons' | 'story'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  // Gentle desktop mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to -1 .. 1 from window center
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setParallaxOffset({ x: x * 30, y: y * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle "Open Your Surprise ❤️" button click
  const handleOpenSurprise = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setAutoPlayMusic(true);

    // 1.2s cinematic zoom and fade into balloon sequence
    setTimeout(() => {
      setStage('balloons');
      setIsTransitioning(false);
    }, 1200);
  };

  // Called when 8-second balloon sequence completes
  const handleBalloonComplete = () => {
    setStage('story');
    // Scroll smoothly to the milestone counter
    setTimeout(() => {
      const milestoneElem = document.getElementById('milestone');
      if (milestoneElem) {
        milestoneElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-full bg-midnight text-moonSilver selection:bg-romanticPink/40 overflow-x-hidden">
      {/* Fixed Ambient Universe Background (Present throughout the experience) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <MountainNightBackground parallaxOffset={parallaxOffset} />
        <TwinklingStars count={85} parallaxOffset={parallaxOffset} />
        <Moon parallaxOffset={parallaxOffset} />
        <DecoratedTree parallaxOffset={parallaxOffset} />
        <Fireflies count={24} />
      </div>

      {/* Cinematic Transition Overlay (soft pink/purple zoom glow) */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-40 bg-gradient-to-b from-[#100B24]/70 via-[#FF6FAE]/20 to-[#050816]/80 pointer-events-none backdrop-blur-sm"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Foreground Interactive Content */}
      <main className="relative z-20 w-full min-h-screen">
        {/* Landing Hero Section */}
        {stage === 'landing' && (
          <HeroSection
            onOpenSurprise={handleOpenSurprise}
            isTransitioning={isTransitioning}
          />
        )}

        {/* 8-Second Heart Balloon Sequence */}
        {stage === 'balloons' && (
          <HeartBalloonSequence onComplete={handleBalloonComplete} />
        )}

        {/* Main Love Story Page Sections (Revealed after balloons) */}
        {stage === 'story' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* Section 1: Live Days Counter Milestone */}
            <DaysTogetherCounter />

            {/* Section 2: Shooting Star 5-second Sky Scene */}
            <ShootingStarScene />

            {/* Section 3: Memory Photo Reveal (love.png) */}
            <MemoryPhoto />

            {/* Section 4: Romantic Love Messages Letter */}
            <LoveLetter />

            {/* Romantic Footer */}
            <footer className="w-full py-12 text-center text-xs sm:text-sm text-moonSilver/40 z-20 font-serif border-t border-white/5 select-none">
              <p className="flex items-center justify-center gap-1.5 mb-1">
                <span>Created with infinite love</span>
                <span className="text-romanticPink animate-pulse">❤️</span>
                <span>for you</span>
              </p>
              <p className="text-softLavender/30 tracking-widest uppercase text-[10px]">
                Every Universe • Every Lifetime • Forever
              </p>
            </footer>
          </motion.div>
        )}
      </main>

      {/* Romantic Music Player Floating Controls */}
      <MusicPlayer isAutoStartTriggered={autoPlayMusic} />
    </div>
  );
}
