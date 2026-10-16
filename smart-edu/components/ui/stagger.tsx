"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariants, staggerVariants } from "@/lib/motion";

export function Stagger({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "section" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return <Tag className={className} variants={reduce ? {hidden:{},visible:{transition:{staggerChildren:0,delayChildren:0}}} : staggerVariants} initial="hidden" animate="visible">{children}</Tag>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={reduce ? {hidden:{opacity:0,y:0},visible:{opacity:1,y:0,transition:{duration:0}}} : fadeUpVariants}>{children}</motion.div>;
}
