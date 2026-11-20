/**
 * Web Audio API based Sound Synthesizer
 * Provides 100% offline, zero-dependency, zero-latency realistic sound effects
 * for balloons floating up and 5-second fireworks/crackers sky shots.
 */

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Balloon launch sound:
 * Ascending warm harmonic breeze with gentle floating chimes as balloons soar into the sky.
 */
export function playBalloonAscentSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Soft atmospheric wind rise
  const bufferSize = ctx.sampleRate * 2.5; // 2.5s
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.exponentialRampToValueAtTime(1200, now + 2.2);
  filter.Q.setValueAtTime(3, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.001, now);
  noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.8);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

  whiteNoise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  whiteNoise.start(now);

  // 2. Gentle magical balloon harmonic chimes (staggered ascending notes)
  const notes = [329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // E4, G4, C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteStart = now + (idx * 0.35);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, noteStart);

    gain.gain.setValueAtTime(0.001, noteStart);
    gain.gain.linearRampToValueAtTime(0.06, noteStart + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(noteStart);
    osc.stop(noteStart + 1.2);
  });
}

/**
 * Firework sky-shot rocket launch whistle + explosion boom + crackle sound
 */
export function playFireworkRocketSound(delayMs = 0) {
  setTimeout(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // A. Rocket Launch Whistle (ascending pitch)
    const rocketOsc = ctx.createOscillator();
    const rocketGain = ctx.createGain();
    rocketOsc.type = 'triangle';
    rocketOsc.frequency.setValueAtTime(250, now);
    rocketOsc.frequency.exponentialRampToValueAtTime(950, now + 0.6);

    rocketGain.gain.setValueAtTime(0.01, now);
    rocketGain.gain.linearRampToValueAtTime(0.08, now + 0.3);
    rocketGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    rocketOsc.connect(rocketGain);
    rocketGain.connect(ctx.destination);
    rocketOsc.start(now);
    rocketOsc.stop(now + 0.6);

    // B. Detonation Boom (at t = 0.6s)
    const boomTime = now + 0.6;
    const boomOsc = ctx.createOscillator();
    const boomGain = ctx.createGain();

    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(140, boomTime);
    boomOsc.frequency.exponentialRampToValueAtTime(35, boomTime + 0.7);

    boomGain.gain.setValueAtTime(0.25, boomTime);
    boomGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.8);

    boomOsc.connect(boomGain);
    boomGain.connect(ctx.destination);
    boomOsc.start(boomTime);
    boomOsc.stop(boomTime + 0.8);

    // C. Crackling Sparks
    const crackleBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.9, ctx.sampleRate);
    const data = crackleBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() > 0.92 ? 1 : 0) * (Math.random() * 2 - 1);
    }
    const crackleSource = ctx.createBufferSource();
    crackleSource.buffer = crackleBuffer;

    const crackleFilter = ctx.createBiquadFilter();
    crackleFilter.type = 'highpass';
    crackleFilter.frequency.setValueAtTime(2000, boomTime);

    const crackleGain = ctx.createGain();
    crackleGain.gain.setValueAtTime(0.12, boomTime + 0.05);
    crackleGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.9);

    crackleSource.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(ctx.destination);
    crackleSource.start(boomTime);
    crackleSource.stop(boomTime + 0.9);
  }, delayMs);
}
