import React from 'react';

export default function MountainNightBackground({ parallaxOffset = { x: 0, y: 0 } }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Deep Astronomical Night Sky */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 85% 15%, #151036 0%, #0a0920 45%, #040510 85%, #02030a 100%)'
        }}
      />

      {/* 2. Faint Milky Way / Cosmic Dust Cloud Band */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(199, 184, 255, 0.15) 0%, rgba(255, 111, 174, 0.05) 35%, transparent 70%)',
          transform: 'rotate(-25deg) scale(1.4)',
        }}
      />

      {/* 3. Layer 1: Farthest High Alpine Peaks (Majestic jagged mountain silhouette) */}
      <div 
        className="absolute bottom-0 inset-x-0 w-full h-[58vh] md:h-[66vh] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${parallaxOffset.x * 0.02}px, ${parallaxOffset.y * 0.015}px, 0)`
        }}
      >
        <svg 
          viewBox="0 0 1440 600" 
          fill="none" 
          preserveAspectRatio="none" 
          className="w-full h-full opacity-60"
        >
          {/* Jagged realistic alpine skyline with rock spurs & peaks */}
          <path 
            d="M0 600 L0 340 L65 315 L120 330 L195 270 L260 295 L340 210 L385 240 L450 190 L510 230 L585 170 L640 205 L720 150 L785 185 L860 135 L920 175 L995 210 L1070 160 L1150 220 L1230 180 L1310 235 L1385 200 L1440 230 L1440 600 Z" 
            fill="#0f0a2e"
          />
          {/* Moonlight rim highlight along highest crests */}
          <path 
            d="M0 340 L65 315 L120 330 L195 270 L260 295 L340 210 L385 240 L450 190 L510 230 L585 170 L640 205 L720 150 L785 185 L860 135 L920 175 L995 210 L1070 160 L1150 220 L1230 180 L1310 235 L1385 200 L1440 230" 
            stroke="rgba(221, 231, 255, 0.22)" 
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* 4. Valley Mist & Mountain Cloud Inversion (Soft drifting fog band) */}
      <div 
        className="absolute bottom-[30vh] md:bottom-[36vh] -inset-x-20 h-36 bg-gradient-to-r from-transparent via-softLavender/12 to-transparent blur-2xl mist-flow pointer-events-none" 
      />

      {/* 5. Layer 2: Mid-Range Rocky Alpine Ridges with Couloirs */}
      <div 
        className="absolute bottom-0 inset-x-0 w-full h-[46vh] md:h-[52vh] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${parallaxOffset.x * 0.04}px, ${parallaxOffset.y * 0.03}px, 0)`
        }}
      >
        <svg 
          viewBox="0 0 1440 500" 
          fill="none" 
          preserveAspectRatio="none" 
          className="w-full h-full opacity-85"
        >
          {/* Sharp rocky ridge with crags, gullies, and saddles */}
          <path 
            d="M0 500 L0 260 L80 220 L140 240 L210 190 L270 215 L350 160 L410 185 L490 140 L560 175 L650 120 L730 155 L810 110 L880 145 L970 100 L1050 135 L1130 90 L1210 125 L1290 85 L1370 120 L1440 95 L1440 500 Z" 
            fill="#09061d" 
          />
          {/* Moonlight rock face highlight on slopes facing upper-right moon */}
          <path 
            d="M0 260 L80 220 L140 240 L210 190 L270 215 L350 160 L410 185 L490 140 L560 175 L650 120 L730 155 L810 110 L880 145 L970 100 L1050 135 L1130 90 L1210 125 L1290 85 L1370 120 L1440 95" 
            stroke="rgba(240, 246, 255, 0.3)" 
            strokeWidth="1.5"
            fill="none"
          />
          {/* Subtle rock facet shaded slopes */}
          <path 
            d="M650 120 L700 230 L730 155 L810 110 L840 240 L880 145" 
            stroke="rgba(255, 255, 255, 0.06)" 
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* 6. Lower Valley Mist Layer */}
      <div 
        className="absolute bottom-[16vh] md:bottom-[20vh] -inset-x-12 h-32 bg-gradient-to-t from-darkPurple/60 via-softLavender/10 to-transparent blur-xl pointer-events-none"
      />

      {/* 7. Layer 3: Foreground Foothills & Pine-Crested Ridges */}
      <div 
        className="absolute bottom-0 inset-x-0 w-full h-[26vh] md:h-[30vh] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallaxOffset.x * 0.06}px, ${parallaxOffset.y * 0.04}px, 0)`
        }}
      >
        <svg 
          viewBox="0 0 1440 300" 
          fill="none" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          {/* Rolling foreground ridge with individual pine crowns */}
          <path 
            d="M0 300 L0 140 C80 130 140 110 220 125 C310 140 390 105 480 120 C570 135 660 95 760 110 C860 125 960 90 1060 105 C1160 120 1260 85 1360 100 L1440 115 L1440 300 Z" 
            fill="#050312" 
          />
          {/* Crest edge highlight */}
          <path 
            d="M0 140 C80 130 140 110 220 125 C310 140 390 105 480 120 C570 135 660 95 760 110 C860 125 960 90 1060 105 C1160 120 1260 85 1360 100 L1440 115" 
            stroke="rgba(255, 217, 138, 0.16)" 
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

      {/* 8. Mountain Lake / Valley Horizon Moonlight Reflection */}
      <div 
        className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#02030a] via-darkPurple/90 to-transparent"
      >
        {/* Shimmering silver moonlight path across water */}
        <div 
          className="absolute right-12 md:right-32 bottom-0 w-28 md:w-48 h-8 bg-gradient-to-t from-moonSilver/15 via-moonSilver/5 to-transparent blur-md"
        />
      </div>
    </div>
  );
}
