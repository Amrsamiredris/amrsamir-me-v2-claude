'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over a clickable element
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('btn')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  
  // Re-run hover check when pathname changes
  useEffect(() => {
    setIsHovered(false);
  }, [pathname]);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1,
      rotate: 45, // Angled like a surfboard
      filter: 'drop-shadow(0 0 8px var(--accent-glow))'
    },
    hover: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1.5,
      rotate: 0,
      filter: 'drop-shadow(0 0 16px var(--accent))'
    }
  };

  // Hide cursor on mobile or touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={isHovered ? "hover" : "default"}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '24px',
        height: '48px', // Taller, like a surfboard
        borderRadius: '12px', // Oval shape
        backgroundColor: isHovered ? 'var(--accent)' : 'rgba(255,255,255,0.8)',
        border: '1px solid rgba(255,255,255,0.5)',
        pointerEvents: 'none', // Don't block clicks
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: isHovered ? 'screen' : 'difference'
      }}
    >
      {/* Tiny internal detail to look more like a board */}
      <div style={{ width: '2px', height: '80%', backgroundColor: isHovered ? '#fff' : 'rgba(0,0,0,0.5)', opacity: 0.5 }} />
    </motion.div>
  );
}
