import React, { useMemo } from 'react';

export default function DecoratedTree({ parallaxOffset = { x: 0, y: 0 } }) {
  // Generate coordinates for fairy lights wrapped organically around real branch boughs
  const fairyLights = useMemo(() => {
    return [
      // Crown & Apex boughs
      { x: 172, y: 55, size: 4, delay: 0.1, color: '#FFF8E1' },
      { x: 162, y: 78, size: 3.5, delay: 0.7, color: '#FFD98A' },
      { x: 182, y: 92, size: 4, delay: 1.4, color: '#FFE082' },
      { x: 154, y: 110, size: 3.5, delay: 2.1, color: '#FFF9C4' },
      { x: 178, y: 125, size: 4.5, delay: 0.4, color: '#FFD98A' },

      // Upper tier branches
      { x: 135, y: 145, size: 4, delay: 1.1, color: '#FFE082' },
      { x: 168, y: 158, size: 4.5, delay: 1.8, color: '#FFF9C4' },
      { x: 202, y: 148, size: 4, delay: 0.5, color: '#FFD98A' },
      { x: 122, y: 180, size: 4.5, delay: 2.4, color: '#FFE082' },
      { x: 158, y: 195, size: 4, delay: 0.9, color: '#FFF8E1' },
      { x: 192, y: 188, size: 4.5, delay: 1.5, color: '#FFD98A' },
      { x: 225, y: 198, size: 3.5, delay: 2.0, color: '#FFE082' },

      // Mid-upper tier branches
      { x: 104, y: 228, size: 4.5, delay: 0.3, color: '#FFF9C4' },
      { x: 142, y: 240, size: 4, delay: 1.7, color: '#FFD98A' },
      { x: 178, y: 232, size: 5, delay: 0.8, color: '#FFF8E1' },
      { x: 215, y: 245, size: 4, delay: 2.3, color: '#FFE082' },
      { x: 252, y: 238, size: 4.5, delay: 1.2, color: '#FFD98A' },
      { x: 88, y: 275, size: 4.5, delay: 1.9, color: '#FFE082' },
      { x: 132, y: 288, size: 4, delay: 0.6, color: '#FFF9C4' },
      { x: 174, y: 278, size: 5, delay: 2.5, color: '#FFD98A' },
      { x: 220, y: 290, size: 4.5, delay: 1.3, color: '#FFF8E1' },
      { x: 268, y: 282, size: 4, delay: 0.2, color: '#FFE082' },

      // Middle spreading boughs
      { x: 70, y: 325, size: 5, delay: 1.6, color: '#FFD98A' },
      { x: 118, y: 340, size: 4.5, delay: 0.7, color: '#FFF9C4' },
      { x: 165, y: 330, size: 5, delay: 2.2, color: '#FFF8E1' },
      { x: 218, y: 345, size: 4.5, delay: 1.0, color: '#FFE082' },
      { x: 275, y: 335, size: 5, delay: 1.8, color: '#FFD98A' },
      { x: 52, y: 380, size: 5, delay: 0.4, color: '#FFE082' },
      { x: 105, y: 395, size: 4.5, delay: 2.0, color: '#FFF9C4' },
      { x: 162, y: 382, size: 5, delay: 1.1, color: '#FFD98A' },
      { x: 224, y: 398, size: 4.5, delay: 0.5, color: '#FFF8E1' },
      { x: 285, y: 388, size: 5, delay: 2.3, color: '#FFE082' },

      // Lower broad boughs
      { x: 38, y: 440, size: 5, delay: 1.4, color: '#FFD98A' },
      { x: 92, y: 455, size: 4.5, delay: 0.8, color: '#FFF9C4' },
      { x: 155, y: 442, size: 5.5, delay: 2.1, color: '#FFF8E1' },
      { x: 222, y: 458, size: 4.5, delay: 1.5, color: '#FFD98A' },
      { x: 295, y: 445, size: 5, delay: 0.3, color: '#FFE082' },
      { x: 28, y: 505, size: 5, delay: 1.7, color: '#FFE082' },
      { x: 82, y: 520, size: 4.5, delay: 0.9, color: '#FFF8E1' },
      { x: 148, y: 508, size: 5.5, delay: 2.4, color: '#FFD98A' },
      { x: 220, y: 522, size: 4.5, delay: 1.2, color: '#FFF9C4' },
      { x: 290, y: 512, size: 5, delay: 0.6, color: '#FFE082' },
    ];
  }, []);

  return (
    <div 
      className="absolute bottom-0 left-0 w-[260px] sm:w-[340px] md:w-[440px] lg:w-[500px] h-[58vh] md:h-[78vh] max-h-[820px] z-10 pointer-events-none select-none transition-transform duration-700 ease-out"
      style={{
        transform: `translate3d(${parallaxOffset.x * 0.07}px, ${parallaxOffset.y * 0.035}px, 0)`
      }}
    >
      {/* Background secondary pine trees for natural forest depth */}
      <svg 
        viewBox="0 0 380 650" 
        fill="none" 
        className="absolute bottom-0 -left-14 w-full h-full opacity-35 transform scale-95 origin-bottom-left"
      >
        <path 
          d="M80 650 L80 320 C70 340 50 355 40 375 C55 372 70 370 75 365 C60 395 35 425 20 455 C40 450 65 445 72 440 C50 480 20 520 0 560 L80 550 L80 650 Z" 
          fill="#050314"
        />
      </svg>

      {/* Main Photorealistic Majestic Pine Tree */}
      <div className="relative w-full h-full origin-bottom">
        <svg 
          viewBox="0 0 360 650" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_25px_rgba(3,4,12,0.95)]"
        >
          {/* Natural tapered trunk with bark contour and root flare */}
          <path 
            d="M172 650 C170 540 166 430 168 330 C169 240 171 160 172 50 C174 160 176 240 177 330 C179 430 176 540 179 650 Z" 
            fill="#05030f" 
          />

          {/* Detailed Conifer Boughs with Layered Needles */}
          {/* Tier 1: Apex Top (dense fine needles) */}
          <path 
            d="M172 45 C168 65 158 85 150 95 C158 92 168 88 172 82 C176 88 186 92 194 95 C186 85 176 65 172 45 Z" 
            fill="#03020c" 
          />
          {/* Tier 2 */}
          <path 
            d="M172 80 C160 105 142 125 130 140 C144 136 160 130 168 122 C176 130 192 136 206 140 C194 125 178 105 172 80 Z" 
            fill="#040310" 
          />
          {/* Tier 3 */}
          <path 
            d="M170 120 C152 148 125 172 108 190 C128 184 150 176 164 165 C176 176 198 184 218 190 C202 172 182 148 170 120 Z" 
            fill="#03020c" 
          />
          {/* Tier 4 */}
          <path 
            d="M168 160 C145 195 110 225 85 245 C110 238 138 228 158 212 C174 228 202 238 228 245 C205 225 182 195 168 160 Z" 
            fill="#050314" 
          />
          {/* Tier 5: Mid-tree spreading boughs with drooping branchlet tips */}
          <path 
            d="M166 205 C138 245 92 280 62 305 C92 296 128 284 152 265 C172 284 210 296 242 305 C215 280 184 245 166 205 Z" 
            fill="#03020c" 
          />
          {/* Tier 6 */}
          <path 
            d="M166 255 C130 305 75 345 42 375 C78 362 120 348 148 325 C172 348 218 362 258 375 C228 345 188 305 166 255 Z" 
            fill="#050314" 
          />
          {/* Tier 7: Broad lower boughs */}
          <path 
            d="M166 315 C122 375 58 420 22 455 C65 440 115 422 146 395 C172 422 225 440 272 455 C238 420 195 375 166 315 Z" 
            fill="#03020c" 
          />
          {/* Tier 8: Lowest spreading branches */}
          <path 
            d="M166 385 C115 450 45 500 8 540 C58 522 112 502 145 470 C172 502 230 522 285 540 C250 500 200 450 166 385 Z" 
            fill="#040210" 
          />

          {/* Realistic needle edge fringing catching subtle moonlight */}
          <path 
            d="M172 45 L150 95 L168 82 L130 140 L164 122 L108 190 L158 165 L85 245 L152 212 L62 305 L148 265 L42 375 L146 325 L22 455 L145 395 L8 540 L166 470 L285 540 L172 395 L272 455 L168 325 L258 375 L164 265 L242 305 L160 212 L228 245 L156 165 L218 190 L154 122 L206 140 L152 82 L194 95 Z" 
            stroke="rgba(221, 231, 255, 0.12)" 
            strokeWidth="0.8" 
            fill="none" 
          />

          {/* Organic Spiraling Copper Wire Path for String Lights */}
          <path 
            d="M172 55 Q160 85 182 92 T154 110 T178 125 T135 145 T202 148 T122 180 T192 188 T104 228 T215 245 T88 275 T220 290 T70 325 T218 345 T52 380 T224 398 T38 440 T222 458 T28 505 T220 522" 
            stroke="rgba(255, 217, 138, 0.28)" 
            strokeWidth="1.1" 
            strokeDasharray="2 3"
            fill="none" 
          />
        </svg>

        {/* Micro-LED Fairy Lights with Point-Source Glow & Halos */}
        <div className="absolute inset-0 pointer-events-none">
          {fairyLights.map((bulb, idx) => (
            <div
              key={idx}
              className="absolute rounded-full fairy-bulb transition-all"
              style={{
                left: `${(bulb.x / 360) * 100}%`,
                top: `${(bulb.y / 650) * 100}%`,
                width: `${bulb.size}px`,
                height: `${bulb.size}px`,
                backgroundColor: bulb.color,
                boxShadow: `0 0 4px #FFFFFF, 0 0 9px ${bulb.color}, 0 0 16px #FFD98A, 0 0 24px #FFAE42`,
                animationDelay: `${bulb.delay}s`,
              }}
            >
              {/* Outer soft ambient filament glow */}
              <div 
                className="absolute -inset-2.5 rounded-full opacity-65 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${bulb.color} 0%, rgba(255, 217, 138, 0.4) 40%, transparent 75%)`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
