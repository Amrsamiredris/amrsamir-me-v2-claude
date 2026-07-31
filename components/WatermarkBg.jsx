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

  const y1 = useTransform(scrollY, [0, vh], [0, vh * 0.3]);
  const y2 = useTransform(scrollY, [0, vh], [0, -vh * 0.2]);
  const opacity = useTransform(scrollY, [0, vh], [0.8, 0.3]);

  return (
    <div className="watermark-bg" aria-hidden="true" style={{ mixBlendMode: 'screen' }}>
      <motion.div 
        className="glow-orb glow-orb-1" 
        style={{ y: y1, opacity }}
      />
      <motion.div 
        className="glow-orb glow-orb-2" 
        style={{ y: y2, opacity }}
      />
    </div>
  );
}
