"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="bg-primary fixed right-0 bottom-0 left-0 z-50 h-1 origin-left"
      style={{ scaleX }}
    />
  );
}
