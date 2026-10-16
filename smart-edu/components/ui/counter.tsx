"use client";
import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { motionTokens } from "@/lib/motion";
/** Display actual data on entry; interpolate only subsequent updates. */
export function Counter({ value, suffix = "", prefix = "", className, decimals = 0 }: { value: number; suffix?: string; prefix?: string; className?: string; decimals?: number }) {
 const source = useMotionValue(value);
 const reduce = useReducedMotion();
 const format = (current: number) => `${prefix}${current.toFixed(decimals)}${suffix}`;
 const display = useTransform(source, format);
 useEffect(() => {
  if (reduce) { source.set(value); return; }
  const controls = animate(source, value, { duration: motionTokens.duration.count, ease: motionTokens.ease.standard });
  return () => controls.stop();
 }, [value, reduce, source]);
 return <span className={className} aria-label={format(value)}><motion.span aria-hidden="true">{display}</motion.span></span>;
}
