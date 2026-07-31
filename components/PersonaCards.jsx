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
      <motion.article variants={cardVariants} className="project-card glass-card">
        <h3 className="project-name">Events & Project Management</h3>
        <p className="project-desc">Mega events, government productions, and corporate activations.</p>
        <Link href="/events" className="cmd-btn">
          Explore Events
        </Link>
      </motion.article>

      {/* Marketing Persona */}
      <motion.article variants={cardVariants} className="project-card glass-card">
        <h3 className="project-name">Marketing</h3>
        <p className="project-desc">Brand strategy, digital growth, and creative campaigns.</p>
        <Link href="/marketing" className="cmd-btn">
          Explore Marketing
        </Link>
      </motion.article>

      {/* AI & Tech Persona */}
      <motion.article variants={cardVariants} className="project-card glass-card">
        <h3 className="project-name">AI & Tech</h3>
        <p className="project-desc">AI agents, automation, and tech innovation.</p>
        <Link href="/ai" className="cmd-btn">
          Explore AI & Tech
        </Link>
      </motion.article>
    </motion.div>
  );
}
