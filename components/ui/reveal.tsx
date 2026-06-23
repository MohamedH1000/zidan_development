"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = 28;

function buildVariants(direction: Direction, reduced: boolean): Variants {
  if (reduced || direction === "none") {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }
  const axis =
    direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "down" || direction === "right" ? -1 : 1;
  return {
    hidden: { opacity: 0, [axis]: sign * offset },
    visible: { opacity: 1, [axis]: 0 },
  };
}

/**
 * Scroll-triggered reveal. Animates a single block into view with an optional
 * delay and direction. Respects prefers-reduced-motion automatically.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={buildVariants(direction, Boolean(reduced))}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger container — orchestrates the entrance of its <StaggerItem> children. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child of <Stagger>. Animates with the same direction/duration contract. */
export function StaggerItem({
  children,
  className,
  direction = "up",
  duration = 0.6,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion.div;
  return (
    <MotionTag
      className={className}
      variants={buildVariants(direction, Boolean(reduced))}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
