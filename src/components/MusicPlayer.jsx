import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

export default function MusicPlayer({ isAutoStartTriggered }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Low default volume
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize or start Web Audio soothing romantic ambient piano chords
  const startRomanticSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Romantic chord notes in Hz (Cmaj7, Am9, Fmaj7, Gsus4)
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
        [220.00, 261.63, 329.63, 392.00, 493.88], // Am9 (A3, C4, E4, G4, B4)
        [174.61, 261.63, 329.63, 349.23], // Fmaj7 (F3, C4, E4, F4)
        [196.00, 261.63, 293.66, 392.00], // Gsus4 (G3, C4, D4, G4)
      ];

      let chordIdx = 0;

      const playChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentChord = chords[chordIdx % chords.length];
        chordIdx++;

        currentChord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          // Soft warm sine/triangle blend
          osc.type = noteIdx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Staggered gentle arpeggio attack
          const noteStart = ctx.currentTime + (noteIdx * 0.22);
          const noteDuration = 4.5;

          noteGain.gain.setValueAtTime(0.0001, noteStart);
          noteGain.gain.exponentialRampToValueAtTime(0.12 * volume, noteStart + 0.4);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(noteStart);
          osc.stop(noteStart + noteDuration);
        });

        // Loop next chord smoothly every 3.8s
        timerRef.current = setTimeout(playChord, 3800);
      };

      playChord();
      setIsPlaying(true);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startRomanticSynth();
    }
  };

  // Optional auto-start after user interaction
  useEffect(() => {
    if (isAutoStartTriggered && !isPlaying) {
      startRomanticSynth();
    }
  }, [isAutoStartTriggered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMusic}
          className={`
            flex items-center gap-2.5 px-4 py-2.5 rounded-full
            bg-midnight/80 hover:bg-midnight/95 border border-romanticPink/30
            shadow-[0_4px_20px_rgba(5,8,22,0.8),0_0_15px_rgba(255,111,174,0.2)]
            backdrop-blur-md text-moonSilver hover:text-white
            transition-all duration-300 group cursor-pointer
          `}
          aria-label={isPlaying ? "Pause romantic music" : "Play romantic melody"}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-romanticPink animate-pulse" />
              {/* Mini visualizer waves */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-3 bg-romanticPink animate-bounce rounded-full" />
                <span className="w-0.5 h-2 bg-fairyGold animate-pulse rounded-full" />
                <span className="w-0.5 h-3.5 bg-softLavender animate-bounce rounded-full" />
              </div>
              <span className="text-xs font-serif italic text-softLavender">
                Playing Melody
              </span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4 text-fairyGold group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-serif italic text-moonSilver/80 group-hover:text-white">
                Play Music ♪
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
