"use client";
import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion";
export function ProgressBar({ value, label, className = "" }: { value: number; label: string; className?: string }) {
 const reduce = useReducedMotion();
 const progress = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
 return <div className={`motion-progress ${className}`}><span>{label}<b>{progress}%</b></span><div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><motion.i initial={false} animate={{ scaleX: progress / 100 }} transition={{ duration: reduce ? 0 : motionTokens.duration.expansion, ease: motionTokens.ease.standard }} /></div></div>;
}
