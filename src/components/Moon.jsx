import React, { useEffect, useRef } from 'react';

export default function Moon({ parallaxOffset = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);

  // Render a photorealistic lunar disk on high-DPI canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = 360;
    const height = 360;
    canvas.width = width;
    canvas.height = height;

    const cx = width / 2;
    const cy = height / 2;
    const r = width / 2 - 10;

    ctx.clearRect(0, 0, width, height);

    // Save for clipping to circular moon disk
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // 1. Base lunar regolith gradient (realistic warm-silver moon tone)
    const baseGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
    baseGrad.addColorStop(0, '#fffff8');
    baseGrad.addColorStop(0.3, '#f2ece0');
    baseGrad.addColorStop(0.65, '#ded6c3');
    baseGrad.addColorStop(0.88, '#c2baa5');
    baseGrad.addColorStop(1, '#9e9580');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // Helper: draw realistic soft lunar maria (dark basalt plains)
    const drawMare = (x, y, rx, ry, rot, opacity, color = 'rgba(78, 71, 62, ') => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${opacity})`;
      ctx.filter = 'blur(6px)';
      ctx.fill();
      ctx.restore();
    };

    // Major Lunar Maria (as seen on the Moon facing Earth)
    // Oceanus Procellarum (large west basin)
    drawMare(cx - r * 0.38, cy - r * 0.05, r * 0.32, r * 0.42, -0.2, 0.45);
    drawMare(cx - r * 0.45, cy + r * 0.22, r * 0.22, r * 0.32, 0.3, 0.4);

    // Mare Imbrium (north-west circular sea)
    drawMare(cx - r * 0.22, cy - r * 0.35, r * 0.28, r * 0.25, 0.1, 0.52);

    // Mare Serenitatis & Mare Tranquillitatis (central / east)
    drawMare(cx + r * 0.12, cy - r * 0.24, r * 0.20, r * 0.19, 0, 0.55);
    drawMare(cx + r * 0.22, cy - r * 0.04, r * 0.24, r * 0.22, 0.3, 0.52);

    // Mare Crisium (isolated dark circular sea on east limb)
    drawMare(cx + r * 0.55, cy - r * 0.18, r * 0.13, r * 0.15, 0.2, 0.6);

    // Mare Fecunditatis & Mare Nectaris (south-east)
    drawMare(cx + r * 0.35, cy + r * 0.22, r * 0.18, r * 0.20, -0.2, 0.48);
    drawMare(cx + r * 0.15, cy + r * 0.28, r * 0.12, r * 0.12, 0, 0.5);

    // Mare Nubium & Mare Humorum (south-west)
    drawMare(cx - r * 0.18, cy + r * 0.32, r * 0.18, r * 0.15, -0.3, 0.46);
    drawMare(cx - r * 0.42, cy + r * 0.38, r * 0.11, r * 0.11, 0, 0.42);

    // Micro-texture / fine regolith noise
    for (let i = 0; i < 280; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.sqrt(Math.random()) * (r - 4);
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      const size = 0.8 + Math.random() * 2.2;
      const shade = Math.random() > 0.45 ? 'rgba(70, 62, 52, 0.25)' : 'rgba(255, 255, 255, 0.35)';
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Prominent impact crater ray systems:
    // Tycho Crater at the South (lat ~43°S, lon ~11°W)
    const tychoX = cx - r * 0.08;
    const tychoY = cy + r * 0.65;

    // Draw brilliant Tycho rays extending across southern & central hemisphere
    ctx.save();
    for (let a = 0; a < 24; a++) {
      const rayAngle = (a / 24) * Math.PI * 2 + (Math.random() * 0.1 - 0.05);
      const rayLength = r * (0.6 + Math.random() * 0.8);
      const rayGrad = ctx.createLinearGradient(
        tychoX, tychoY,
        tychoX + Math.cos(rayAngle) * rayLength,
        tychoY + Math.sin(rayAngle) * rayLength
      );
      rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      rayGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.35)');
      rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(tychoX, tychoY);
      ctx.lineTo(
        tychoX + Math.cos(rayAngle - 0.03) * rayLength,
        tychoY + Math.sin(rayAngle - 0.03) * rayLength
      );
      ctx.lineTo(
        tychoX + Math.cos(rayAngle + 0.03) * rayLength,
        tychoY + Math.sin(rayAngle + 0.03) * rayLength
      );
      ctx.closePath();
      ctx.fillStyle = rayGrad;
      ctx.fill();
    }
    ctx.restore();

    // Tycho central crater peak & rim
    ctx.beginPath();
    ctx.arc(tychoX, tychoY, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tychoX, tychoY, 7.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(90, 80, 68, 0.6)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Copernicus Crater (northwest) with ray halo
    const copX = cx - r * 0.28;
    const copY = cy - r * 0.10;
    ctx.beginPath();
    ctx.arc(copX, copY, 9, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.filter = 'blur(2px)';
    ctx.fill();
    ctx.filter = 'none';

    ctx.beginPath();
    ctx.arc(copX, copY, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(copX, copY, 5.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(70, 60, 50, 0.65)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Kepler Crater (west of Copernicus)
    const kepX = cx - r * 0.48;
    const kepY = cy - r * 0.08;
    ctx.beginPath();
    ctx.arc(kepX, kepY, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();

    // Aristarchus (brightest plateau on moon)
    const ariX = cx - r * 0.52;
    const ariY = cy - r * 0.28;
    ctx.beginPath();
    ctx.arc(ariX, ariY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fill();

    // Additional realistic crater details with rim shadows
    const craters = [
      { x: cx + r * 0.18, y: cy + r * 0.42, size: 6 },
      { x: cx - r * 0.22, y: cy + r * 0.52, size: 5 },
      { x: cx + r * 0.42, y: cy - r * 0.42, size: 4 },
      { x: cx - r * 0.05, y: cy - r * 0.55, size: 4.5 },
      { x: cx + r * 0.62, y: cy + r * 0.12, size: 5 },
    ];
    craters.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(65, 55, 45, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(c.x - 0.8, c.y - 0.8, c.size * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    });

    // 2. Realistic Spherical Limb Darkening (subtle falloff at edges)
    const limbGrad = ctx.createRadialGradient(cx, cy, r * 0.75, cx, cy, r);
    limbGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    limbGrad.addColorStop(0.85, 'rgba(20, 15, 30, 0.25)');
    limbGrad.addColorStop(1, 'rgba(5, 4, 15, 0.65)');
    ctx.fillStyle = limbGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.restore(); // End clipping
  }, []);

  return (
    <div 
      className="absolute top-6 right-5 sm:top-10 sm:right-14 md:top-12 md:right-24 z-10 pointer-events-none select-none transition-transform duration-1000 ease-out"
      style={{
        transform: `translate3d(${parallaxOffset.x * 0.04}px, ${parallaxOffset.y * 0.03}px, 0)`
      }}
    >
      {/* 1. Outermost Atmospheric Blue-Lavender Dispersion Glow */}
      <div 
        className="absolute -inset-24 sm:-inset-32 md:-inset-40 rounded-full blur-3xl opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(199, 184, 255, 0.25) 0%, rgba(130, 160, 255, 0.12) 45%, transparent 75%)'
        }}
      />

      {/* 2. Middle Lunar Rayleigh Halo (Silvery Moonlight) */}
      <div 
        className="absolute -inset-10 sm:-inset-16 md:-inset-20 rounded-full blur-2xl opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(240, 246, 255, 0.4) 0%, rgba(221, 231, 255, 0.2) 50%, transparent 80%)'
        }}
      />

      {/* 3. Innermost Warm Corona Ring */}
      <div 
        className="absolute -inset-4 sm:-inset-6 rounded-full blur-lg opacity-75 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 250, 235, 0.6) 0%, rgba(255, 240, 200, 0.25) 60%, transparent 85%)'
        }}
      />

      {/* 4. Photorealistic Lunar Sphere (Canvas) */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,250,230,0.45),0_0_120px_rgba(200,225,255,0.25)] border border-white/20">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover rounded-full"
        />

        {/* Faint wispy night cloud crossing the lower part of the moon */}
        <div 
          className="absolute -inset-x-8 top-[45%] h-8 bg-gradient-to-r from-transparent via-softLavender/20 to-transparent blur-md transform -rotate-6 pointer-events-none animate-shimmer"
        />
      </div>
    </div>
  );
}
