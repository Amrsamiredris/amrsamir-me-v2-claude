'use client';

import { useEffect, useState } from 'react';

export default function BackgroundAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-animation-container">
      {/* Texture Base Layer */}
      <div className="bg-texture-layer" />
      
      {/* Motion Layer */}
      <div className="bg-motion-layer">
        <svg
          className="motion-shapes"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="30" r="25" fill="var(--accent)" className="shape-1" />
          <circle cx="80" cy="70" r="35" fill="var(--line)" className="shape-2" />
          <path d="M 50,0 Q 80,40 50,100 Q 20,60 50,0" fill="var(--accent-glow)" className="shape-3" />
        </svg>
      </div>

      {/* Micro Layer: Stroke-Draw Horizon */}
      <svg
        className="horizon-line"
        viewBox="0 0 2000 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50 Q 500 45, 1000 50 T 2000 50"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          strokeOpacity="0.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 50 Q 500 55, 1000 50 T 2000 50"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.1"
          vectorEffect="non-scaling-stroke"
          className="wave-line-drift"
        />
      </svg>

      <style jsx>{`
        .bg-animation-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
        }

        .bg-texture-layer {
          position: absolute;
          inset: 0;
          background-image: var(--bg-texture);
          background-repeat: repeat;
          background-size: 512px 512px;
          opacity: 0.15;
          mix-blend-mode: multiply;
        }

        :global([data-theme="dark"]) .bg-texture-layer {
          opacity: 0.25;
          mix-blend-mode: screen;
        }

        .bg-motion-layer {
          position: absolute;
          inset: 0;
          filter: blur(80px);
          opacity: 0.4;
        }

        .motion-shapes {
          width: 100%;
          height: 100%;
        }

        .shape-1 {
          animation: drift1 40s infinite alternate ease-in-out;
          transform-origin: center;
        }

        .shape-2 {
          animation: drift2 55s infinite alternate ease-in-out;
          transform-origin: center;
        }

        .shape-3 {
          animation: drift3 45s infinite alternate ease-in-out;
          transform-origin: center;
        }

        @keyframes drift1 {
          0% { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(30%, 40%) scale(1.2); }
        }

        @keyframes drift2 {
          0% { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(-40%, -20%) scale(0.8); }
        }

        @keyframes drift3 {
          0% { transform: translate(0%, 0%) rotate(0deg); }
          100% { transform: translate(20%, -30%) rotate(45deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .shape-1, .shape-2, .shape-3 {
            animation: none !important;
          }
          .wave-line-drift {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
