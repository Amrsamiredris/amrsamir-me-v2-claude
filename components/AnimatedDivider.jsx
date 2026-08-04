'use client';

export default function AnimatedDivider({ style }) {
  return (
    <div className="animated-divider-wrapper" style={{ ...style }}>
      <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-divider">
        <path
          d="M0 6 Q 15 0, 30 6 T 60 6 T 90 6 T 120 6"
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <style jsx>{`
        .animated-divider-wrapper {
          width: 60px;
          height: 12px;
          overflow: hidden;
          margin: 40px auto;
          position: relative;
        }
        .animated-divider {
          position: absolute;
          left: 0;
          top: 0;
          width: 120px;
          height: 12px;
          animation: waveScroll 2s linear infinite;
        }
        @keyframes waveScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-60px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animated-divider {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
