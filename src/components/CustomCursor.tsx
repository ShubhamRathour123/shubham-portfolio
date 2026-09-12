"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = [
  "a[href]",
  "button:not(:disabled)",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "[role='button']",
  "[data-cursor-interactive]",
].join(",");

export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { damping: 24, stiffness: 360, mass: 0.45 });
  const ringY = useSpring(dotY, { damping: 24, stiffness: 360, mass: 0.45 });
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateAvailability = () => setIsEnabled(mediaQuery.matches);

    updateAvailability();
    mediaQuery.addEventListener("change", updateAvailability);
    return () => mediaQuery.removeEventListener("change", updateAvailability);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onPointerMove = (event: PointerEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setIsVisible(true);
      const target = event.target;
      setIsInteractive(target instanceof Element && Boolean(target.closest(interactiveSelector)));
    };
    const onPointerDown = () => setIsPressed(true);
    const onPointerUp = () => setIsPressed(false);
    const hideCursor = () => {
      setIsVisible(false);
      setIsInteractive(false);
      setIsPressed(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, [dotX, dotY, isEnabled]);

  if (!isEnabled) return null;

  const ringScale = isPressed ? 0.7 : isInteractive ? 2.1 : 1;

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isPressed ? 0.72 : 1 }}
        transition={{ duration: 0.12 }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: isVisible ? 1 : 0, scale: ringScale }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
      />
    </>
  );
}
