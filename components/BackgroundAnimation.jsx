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
    </div>
  );
}
