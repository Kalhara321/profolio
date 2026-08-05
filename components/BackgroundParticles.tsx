"use client";

import { motion } from "framer-motion";

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background radial glow center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow opacity-60" />

      {/* Floating Blurred Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-500/10 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, 60, -20, 0],
          scale: [1, 1.2, 1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px]"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
    </div>
  );
}
