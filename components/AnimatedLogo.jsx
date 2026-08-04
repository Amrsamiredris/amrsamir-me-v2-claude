'use client';

import { motion } from 'framer-motion';

export default function AnimatedLogo() {
  return (
    <motion.svg 
      width="48" height="48" viewBox="0 0 24 24" 
      fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ marginBottom: '2rem' }}
    >
      <motion.path 
        d="M12 2C10.5 2 7 7.5 7 14C7 20 9.5 22 12 22C14.5 22 17 20 17 14C17 7.5 13.5 2 12 2Z" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.line 
        x1="12" y1="2" x2="12" y2="22"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      />
    </motion.svg>
  );
}
