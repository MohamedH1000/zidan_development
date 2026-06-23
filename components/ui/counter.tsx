"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Animated number counter that runs once when scrolled into view.
 * Falls back to the final value instantly when reduced motion is requested.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Drive the number through the animate() subscription. The only setState
    // call lives inside the onUpdate callback (allowed), which keeps the
    // effect a pure external-system sync. Reduced motion collapses the
    // duration so the value settles instantly.
    const controls = animate(0, value, {
      duration: reduced ? 0.001 : duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
