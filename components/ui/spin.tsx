"use client";

import { type ButtonHTMLAttributes, useId } from "react";
import { motion } from "motion/react";

export interface SpinProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  duration?: number;
  /** Whether the toggle should render in its dark-theme state. */
  toggled?: boolean;
  [key: `data-${string}`]: string | number | boolean | null | undefined;
}

export function Spin({
  duration = 400,
  toggled,
  className,
  type = "button",
  title = "Toggle theme",
  "aria-label": ariaLabel = "Toggle theme",
  "aria-pressed": ariaPressed,
  ...props
}: SpinProps) {
  const toggleId = useId();
  const isDark = toggled === true;
  const transition = { duration: duration / 1000, ease: "easeInOut" as const };

  const clipMainId = `toggles.dev-spin-main-${toggleId}`;

  return (
    <button
      {...props}
      type={type}
      title={title}
      aria-label={ariaLabel}
      aria-pressed={toggled ?? ariaPressed}
      className={className}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5">
        <defs>
          <clipPath id={clipMainId}>
            <motion.path
              animate={{
                d: isDark
                  ? "M0 2h13a1 1 0 0010 10v14H0Z"
                  : "M0 0h25a1 1 0 0010 10v14H0Z"
              }}
              transition={transition}
            />
          </clipPath>
        </defs>
        <g stroke="currentColor" strokeLinecap="round">
          <motion.circle
            cx={12}
            cy={12}
            r={5}
            fill={"currentColor"}
            clipPath={`url(#${clipMainId})`}
            animate={{ scale: isDark ? 1.7 : 1 }}
            transition={transition}
          />
          <motion.g
            animate={{
              rotate: isDark ? 45 : 0,
              scale: isDark ? 0 : 1,
              opacity: isDark ? 0 : 1
            }}
            transition={transition}
            style={{ transformOrigin: "12px 12px" }}>
            <motion.path
              d="M12 1.4v2.4"
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeMiterlimit={0}
              paintOrder="stroke markers fill"
            />
            <motion.path
              d="m20.3 3.7-2.5 2.5"
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeMiterlimit={0}
              paintOrder="stroke markers fill"
            />
            <motion.path
              d="M22.6 12h-2.4"
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeMiterlimit={0}
              paintOrder="stroke markers fill"
            />
            <motion.path
              d="M12 22.6v-2.4"
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeMiterlimit={0}
              paintOrder="stroke markers fill"
            />
            <motion.path
              d="M1.4 12h2.4"
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeMiterlimit={0}
              paintOrder="stroke markers fill"
            />
            <motion.path
              d="m20.3 20.3-2.5-2.5"
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeMiterlimit={0}
              paintOrder="stroke markers fill"
            />
            <motion.path
              d="m3.7 20.3 2.5-2.5"
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeMiterlimit={0}
              paintOrder="stroke markers fill"
            />
            <motion.path
              d="m3.7 3.7 2.5 2.5"
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeMiterlimit={0}
              paintOrder="stroke markers fill"
            />
          </motion.g>
        </g>
      </svg>
    </button>
  );
}
