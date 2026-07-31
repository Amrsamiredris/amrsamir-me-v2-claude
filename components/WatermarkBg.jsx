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

  // Lock opacity at a maximum of 0.06 so it remains a subtle watermark
  const opacity = useTransform(scrollY, [0, vh], [0.06, 0.01]);
  const scale = useTransform(scrollY, [0, vh], [1.1, 1.0]);

  return (
    <div className="watermark-bg" aria-hidden="true">
      <motion.div style={{ opacity, scale, originX: 0.5, originY: 0.5 }}>
        <pre className="ascii-art">
          {`  ██████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗ ██████╗    ███████╗ ██████╗  ██████╗ ███╗   ██╗
 ██╔════╝██╔═══██╗████╗ ████║██║████╗  ██║██╔════╝    ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║
 ██║     ██║   ██║██╔████╔██║██║██╔██╗ ██║██║  ███╗   ███████╗██║   ██║██║   ██║██╔██╗ ██║
 ██║     ██║   ██║██║╚██╔╝██║██║██║╚██╗██║██║   ██║   ╚════██║██║   ██║██║   ██║██║╚██╗██║
 ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝   ███████║╚██████╔╝╚██████╔╝██║ ╚████║
  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝`}
        </pre>
      </motion.div>
    </div>
  );
}
