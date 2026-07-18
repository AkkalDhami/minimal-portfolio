"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";

interface TextHoverEffectProps {
  text: string;
}

export function TextHoverEffect({ text }: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Motion values for the spotlight position
  const cx = useMotionValue("50%");
  const cy = useMotionValue("20%");

  // Store the automatic animation so we can stop/start it
  const autoAnimation = useRef<ReturnType<typeof animate> | null>(null);

  /**
   * Automatic spotlight animation
   */
  useEffect(() => {
    if (hovered) {
      autoAnimation.current?.stop();
      return;
    }

    autoAnimation.current?.stop();

    autoAnimation.current = animate(0, Math.PI * 2, {
      duration: 8,
      ease: "linear",
      repeat: Infinity,
      onUpdate: t => {
        // Organic floating movement
        const x = 50 + Math.sin(t) * 32;
        const y = 20 + Math.cos(t * 1.5) * 22;

        cx.set(`${x}%`);
        cy.set(`${y}%`);
      }
    });

    return () => autoAnimation.current?.stop();
  }, [hovered, cx, cy]);

  /**
   * Follow mouse
   */
  useEffect(() => {
    if (!hovered || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();

    const x = ((cursor.x - rect.left) / rect.width) * 100;
    const y = ((cursor.y - rect.top) / rect.height) * 100;

    animate(cx, `${x}%`, {
      type: "spring",
      stiffness: 280,
      damping: 30
    });

    animate(cy, `${y}%`, {
      type: "spring",
      stiffness: 280,
      damping: 30
    });
  }, [cursor, hovered, cx, cy]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="230"
      viewBox="0 0 340 100"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e =>
        setCursor({
          x: e.clientX,
          y: e.clientY
        })
      }>
      <defs>
        <linearGradient id="textGradient">
          <stop offset="0%" stopColor="var(--color-foreground)" />
          <stop offset="100%" stopColor="var(--color-foreground)" />
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          style={{
            cx,
            cy
          }}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Background Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-400 font-[helvetica] text-5xl font-bold dark:stroke-neutral-600"
        style={{
          opacity: hovered ? 0.2 : 0
        }}>
        {text}
      </text>

      {/* Stroke Drawing Animation */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-300 font-[helvetica] text-5xl font-bold dark:stroke-neutral-700"
        initial={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000
        }}
        animate={{
          strokeDashoffset: 0
        }}
        transition={{
          duration: 3,
          ease: "easeInOut"
        }}>
        {text}
      </motion.text>

      {/* Spotlight Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-5xl font-bold">
        {text}
      </text>
    </svg>
  );
}
