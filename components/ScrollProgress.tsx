"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500 z-50 transform-origin-0 shadow-[0_0_12px_#3b82f6]"
      style={{ scaleX }}
    />
  );
}
