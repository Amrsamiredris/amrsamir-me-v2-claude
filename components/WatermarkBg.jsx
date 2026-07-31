"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WatermarkBg() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);
  
  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Extremely subtle opacity to not break readability
  const baseOpacity = useTransform(scrollY, [0, vh], [0.03, 0.01]);
  const highlightOpacity = useTransform(scrollY, [0, vh], [0.15, 0.02]);
  
  const asciiArt = `  ██████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗ ██████╗    ███████╗ ██████╗  ██████╗ ███╗   ██╗
 ██╔════╝██╔═══██╗████╗ ████║██║████╗  ██║██╔════╝    ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║
 ██║     ██║   ██║██╔████╔██║██║██╔██╗ ██║██║  ███╗   ███████╗██║   ██║██║   ██║██╔██╗ ██║
 ██║     ██║   ██║██║╚██╔╝██║██║██║╚██╗██║██║   ██║   ╚════██║██║   ██║██║   ██║██║╚██╗██║
 ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝   ███████║╚██████╔╝╚██████╔╝██║ ╚████║
  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝`;

  return (
    <div className="watermark-bg" aria-hidden="true" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate3d(-50%, -50%, 0)', zIndex: -2, pointerEvents: 'none', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Base dark layer */}
      <motion.div style={{ opacity: baseOpacity, originX: 0.5, originY: 0.5 }}>
        <pre className="ascii-art" style={{ color: 'var(--text-muted)' }}>
          {asciiArt}
        </pre>
      </motion.div>

      {/* Animated bright overlay (skills.sh style reveal) */}
      <motion.div 
        style={{ 
          opacity: highlightOpacity,
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          originX: 0.5, originY: 0.5
        }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", repeatDelay: 1 }}
      >
        <pre className="ascii-art" style={{ color: 'var(--text-primary)' }}>
          {asciiArt}
        </pre>
      </motion.div>
    </div>
  );
}
