"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export function GlitchHeading() {
  const prefersReducedMotion = useReducedMotion();
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => setTick(t => t + 1), 2600);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="relative font-mono text-7xl leading-none font-bold sm:text-8xl">
      <span className="text-foreground relative">404</span>
      {!prefersReducedMotion && (
        <>
          <motion.span
            key={`r-${tick}`}
            aria-hidden
            className="text-destructive/70 absolute inset-0"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [0, -3, 2, 0], opacity: [0, 0.8, 0.8, 0] }}
            transition={{ duration: 0.35, times: [0, 0.2, 0.7, 1] }}>
            404
          </motion.span>
          <motion.span
            key={`c-${tick}`}
            aria-hidden
            className="text-primary/70 absolute inset-0"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [0, 3, -2, 0], opacity: [0, 0.8, 0.8, 0] }}
            transition={{
              duration: 0.35,
              times: [0, 0.2, 0.7, 1],
              delay: 0.04
            }}>
            404
          </motion.span>
        </>
      )}
    </div>
  );
}
