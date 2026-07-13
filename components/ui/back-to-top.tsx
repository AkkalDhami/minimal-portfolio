"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Button } from "./button";
import { click003Sound } from "@/sounds/click-003";
import { useSound } from "@/hooks/use-sound";
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const [play] = useSound(click003Sound);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed right-6 bottom-12 z-40">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              scrollToTop();
              play();
            }}
            className="hover:bg-muted rounded-full border bg-transparent backdrop-blur-md"
            aria-label="Back to top">
            <ArrowUp className="size-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
