"use client";

import { useEffect, useRef } from 'react';

export default function WatermarkBg() {
  const watermarkRef = useRef(null);

  useEffect(() => {
    const watermark = watermarkRef.current;
    if (!watermark) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      let progress = scrollY / vh;
      if (progress > 1) progress = 1;
      
      const opacity = 1 - (progress * (1 - 0.08));
      const scale = 1.1 - (progress * 0.1);
      
      watermark.style.opacity = opacity.toFixed(3);
      watermark.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(3)})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger once on mount
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={watermarkRef} className="watermark-bg" aria-hidden="true">
      <pre className="ascii-art">
        {`  ██████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗ ██████╗    ███████╗ ██████╗  ██████╗ ███╗   ██╗
 ██╔════╝██╔═══██╗████╗ ████║██║████╗  ██║██╔════╝    ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║
 ██║     ██║   ██║██╔████╔██║██║██╔██╗ ██║██║  ███╗   ███████╗██║   ██║██║   ██║██╔██╗ ██║
 ██║     ██║   ██║██║╚██╔╝██║██║██║╚██╗██║██║   ██║   ╚════██║██║   ██║██║   ██║██║╚██╗██║
 ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝   ███████║╚██████╔╝╚██████╔╝██║ ╚████║
  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝`}
      </pre>
    </div>
  );
}
