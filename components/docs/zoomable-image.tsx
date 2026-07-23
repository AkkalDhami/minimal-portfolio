"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image, { type ImageProps } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { IconX } from "@tabler/icons-react";

type ZoomableImageProps = Omit<ImageProps, "onClick" | "fill"> & {
  wrapperClassName?: string;
};

export function ZoomableImage({
  wrapperClassName,
  className,
  alt,
  ...props
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // avoids SSR issues with createPortal (document isn't available on the server)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // close on Esc + lock scroll while open
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close image"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
            <IconX size={24} stroke={2} />
          </button>

          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={e => e.stopPropagation()}
            className="relative flex h-[95vh] w-[95vw] items-center justify-center">
            <Image
              {...props}
              alt={alt}
              sizes="90vw"
              className="rounded-lg object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`cursor-zoom-in overflow-hidden rounded-lg ${wrapperClassName ?? ""}`}>
        <Image
          {...props}
          alt={alt}
          className={`h-auto w-full transition-opacity duration-200 hover:opacity-90 ${className ?? ""}`}
        />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
