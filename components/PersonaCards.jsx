"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
};

export default function PersonaCards() {
  return (
    <motion.div 
      className="projects-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Events Persona */}
      <motion.article variants={cardVariants} className="project-card reveal visible">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
          <path d="M2 12h4l3-9 5 18 3-9h5" />
        </svg>
        <h3 className="project-name">Events & Project Management</h3>
        <p className="project-desc">Mega events, government productions, and corporate activations.</p>
        <Link href="/events" className="cmd-btn" style={{ display: 'inline-block', marginTop: '16px' }}>
          Explore Events
        </Link>
      </motion.article>

      {/* Marketing Persona */}
      <motion.article variants={cardVariants} className="project-card reveal visible">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
          <path d="M5 22h14" />
          <path d="M5 2h14" />
          <path d="M12 15V22" />
          <path d="M8 2v5" />
          <path d="M16 2v5" />
          <circle cx="12" cy="11" r="4" />
        </svg>
        <h3 className="project-name">Marketing</h3>
        <p className="project-desc">Brand strategy, digital growth, and creative campaigns.</p>
        <Link href="/marketing" className="cmd-btn" style={{ display: 'inline-block', marginTop: '16px' }}>
          Explore Marketing
        </Link>
      </motion.article>

      {/* AI & Tech Persona */}
      <motion.article variants={cardVariants} className="project-card reveal visible">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
        <h3 className="project-name">AI & Tech</h3>
        <p className="project-desc">AI agents, automation, and tech innovation.</p>
        <Link href="/ai" className="cmd-btn" style={{ display: 'inline-block', marginTop: '16px' }}>
          Explore AI & Tech
        </Link>
      </motion.article>
    </motion.div>
  );
}
