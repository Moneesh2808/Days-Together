import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, X } from 'lucide-react';
import { config } from '../config';
import { playFireworkRocketSound } from '../utils/soundEffects';

export default function FinalSurprise() {
  const [isPlayingShow, setIsPlayingShow] = useState(false); // 5-second fireworks show
  const [showContent, setShowContent] = useState(false); // Revealed after 5s
  const [secondsLeft, setSecondsLeft] = useState(5);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Canvas Fireworks System
  useEffect(() => {
    if (!isPlayingShow) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];
    const floatingHearts = [];

    const colors = [
      '#FF6FAE', '#FFD98A', '#FF4D8D', '#FFEAA7', 
      '#55E6C1', '#C7B8FF', '#FF7675', '#74B9FF', '#FD79A8'
    ];

    // Firework Rocket Class
    class Rocket {
      constructor(targetX, targetY) {
        this.x = targetX + (Math.random() * 80 - 40);
        this.y = canvas.height + 10;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 9 + Math.random() * 4;
        this.angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.trail = [];
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 6) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;

        // Check if reached apex
        if (this.vy < 0 && this.y <= this.targetY) {
          return true; // explode
        }
        return false;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
          const pt = this.trail[i];
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }
    }

    // Spark Particle Class
    class Particle {
      constructor(x, y, color, isHeartPattern = false, heartAngle = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.alpha = 1;
        this.decay = 0.015 + Math.random() * 0.018;

        if (isHeartPattern) {
          // Parametric heart curve velocity
          const t = heartAngle;
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
          this.vx = hx * 0.28;
          this.vy = hy * 0.28;
        } else {
          const speed = 2 + Math.random() * 7;
          const angle = Math.random() * Math.PI * 2;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
        }

        this.gravity = 0.08;
      }

      update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        return this.alpha <= 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(this.alpha, 0);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    // Explode helper
    const explode = (x, y, color) => {
      const isHeart = Math.random() > 0.4; // 60% chance of heart-shaped explosion
      if (isHeart) {
        const count = 36;
        for (let i = 0; i < count; i++) {
          const t = (i / count) * Math.PI * 2;
          particles.push(new Particle(x, y, color, true, t));
        }
      } else {
        const count = 48;
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(x, y, color, false));
        }
      }
    };

    // Staggered Sky-Shot Launch Schedule
    let launchTimer = 0;
    const launchRockets = () => {
      const targetX = 0.2 * canvas.width + Math.random() * 0.6 * canvas.width;
      const targetY = 0.18 * canvas.height + Math.random() * 0.35 * canvas.height;
      fireworks.push(new Rocket(targetX, targetY));
      playFireworkRocketSound();
    };

    // Initial volley
    launchRockets();
    setTimeout(launchRockets, 450);
    setTimeout(launchRockets, 1100);
    setTimeout(launchRockets, 1750);
    setTimeout(launchRockets, 2400);
    setTimeout(launchRockets, 3100);
    setTimeout(launchRockets, 3800);

    // Floating Hearts generator
    const addFloatingHearts = () => {
      floatingHearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 16 + Math.random() * 20,
        speed: 2 + Math.random() * 3,
        drift: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.85,
      });
    };

    // Main Animation Loop
    const render = () => {
      // Semi-transparent clear for light trails
      ctx.fillStyle = 'rgba(3, 4, 12, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Random floating hearts
      if (Math.random() < 0.25) addFloatingHearts();

      // Draw floating hearts
      for (let i = floatingHearts.length - 1; i >= 0; i--) {
        const h = floatingHearts[i];
        h.y -= h.speed;
        h.x += h.drift;
        ctx.save();
        ctx.globalAlpha = h.alpha;
        ctx.fillStyle = h.color;
        ctx.shadowColor = h.color;
        ctx.shadowBlur = 12;

        // Draw small heart
        ctx.beginPath();
        const topCurveHeight = h.size * 0.3;
        ctx.moveTo(h.x, h.y + topCurveHeight);
        ctx.bezierCurveTo(h.x, h.y, h.x - h.size / 2, h.y, h.x - h.size / 2, h.y + topCurveHeight);
        ctx.bezierCurveTo(h.x - h.size / 2, h.y + (h.size + topCurveHeight) / 2, h.x, h.y + (h.size + topCurveHeight) / 1.3, h.x, h.y + h.size);
        ctx.bezierCurveTo(h.x, h.y + (h.size + topCurveHeight) / 1.3, h.x + h.size / 2, h.y + (h.size + topCurveHeight) / 2, h.x + h.size / 2, h.y + topCurveHeight);
        ctx.bezierCurveTo(h.x + h.size / 2, h.y, h.x, h.y, h.x, h.y + topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        if (h.y < -30) floatingHearts.splice(i, 1);
      }

      // Update rockets
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const r = fireworks[i];
        const exploded = r.update();
        r.draw();
        if (exploded) {
          explode(r.x, r.y, r.color);
          fireworks.splice(i, 1);
        }
      }

      // Update sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dead = p.update();
        p.draw();
        if (dead) particles.splice(i, 1);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Resize handler
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlayingShow]);

  // 5-second countdown timer
  useEffect(() => {
    if (!isPlayingShow) return;

    setSecondsLeft(5);
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          setShowContent(true); // Smoothly reveal love content after 5 seconds!
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlayingShow]);

  const handleStartShow = () => {
    setIsPlayingShow(true);
    setShowContent(false);
  };

  const handleClose = () => {
    setIsPlayingShow(false);
    setShowContent(false);
  };

  return (
    <section 
      id="surprise"
      className="relative min-h-[90vh] py-20 sm:py-28 md:py-32 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 select-none overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-radial from-romanticPink/15 via-fairyGold/5 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        className="relative max-w-2xl mx-auto flex flex-col items-center z-10 w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Intro prompt */}
        <p className="font-serif italic text-lg sm:text-2xl text-softLavender font-light mb-4">
          “{config.final.question}”
        </p>

        {/* Revealed line */}
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white text-glow-rose mb-10 max-w-xl leading-snug px-2">
          {config.final.answer}
        </h3>

        {/* Interactive Button */}
        <motion.button
          onClick={handleStartShow}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="relative group px-8 sm:px-10 py-4 sm:py-5 rounded-full font-medium text-base sm:text-lg bg-gradient-to-r from-romanticPink via-[#f05c9e] to-fairyGold text-white shadow-xl shadow-romanticPink/30 btn-romantic-heartbeat border border-white/30 backdrop-blur-sm cursor-pointer transition-all duration-300"
        >
          <span className="relative flex items-center justify-center gap-3">
            <Mail className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="font-semibold tracking-wide text-shadow">
              {config.final.button}
            </span>
            <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
          </span>
        </motion.button>
      </motion.div>

      {/* 
        5-Second Dynamic Dark Background Transition:
        Full-Screen Crackers / Sky-Shots + Floating Hearts with Realistic Sounds
      */}
      <AnimatePresence>
        {isPlayingShow && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#02030a] overflow-hidden select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Full-screen Fireworks Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-40 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-moonSilver hover:text-white transition-all cursor-pointer"
              aria-label="Close fireworks show"
            >
              <X className="w-6 h-6" />
            </button>

            {/* During the 5-second show: Floating status message */}
            {!showContent && (
              <motion.div 
                className="relative z-30 flex flex-col items-center text-center px-4 pointer-events-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-romanticPink/20 border border-romanticPink/40 backdrop-blur-md mb-4 shadow-lg shadow-romanticPink/30">
                  <Heart className="w-4 h-4 text-romanticPink fill-romanticPink animate-pulse" />
                  <span className="text-sm sm:text-base text-white font-medium tracking-wide">
                    Lighting up the night sky for you… ❤️
                  </span>
                  <Heart className="w-4 h-4 text-romanticPink fill-romanticPink animate-pulse" />
                </div>
                <p className="font-serif italic text-base sm:text-lg text-moonSilver/80">
                  Listen to our sky shots… surprise arriving in {secondsLeft}s ✨
                </p>
              </motion.div>
            )}

            {/* AFTER 5 SECONDS: Smoothly reveal the Love Content Envelope Modal! */}
            {showContent && (
              <motion.div
                className="relative max-w-lg w-full mx-4 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#181135] via-[#110c26] to-[#090616] border border-romanticPink/40 shadow-[0_0_60px_rgba(255,111,174,0.45),0_20px_60px_rgba(0,0,0,0.95)] text-center z-40 overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Glowing Heart Stamp */}
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-romanticPink to-fairyGold flex items-center justify-center shadow-[0_0_25px_#FF6FAE] mb-6">
                  <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
                </div>

                <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white text-glow-moon mb-4">
                  To My Forever Everything ❤️
                </h4>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 font-serif italic text-base sm:text-xl text-white leading-relaxed select-text">
                  “{config.final.hiddenMessage}”
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleStartShow}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-romanticPink/30 hover:bg-romanticPink/40 border border-romanticPink/50 text-white flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-romanticPink text-romanticPink" />
                    <span>Watch Sky Shots Again 🎆</span>
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 text-moonSilver transition-all cursor-pointer"
                  >
                    Keep in My Heart ❤️
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
