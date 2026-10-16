"use client";
import type { ReactNode, PointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
/** Spring-following depth on a fine pointer; contained controls retain semantics. */
export function TiltCard({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" }) {
 const reduce = useReducedMotion();
 const rotateX = useSpring(0, { stiffness: 230, damping: 24 });
 const rotateY = useSpring(0, { stiffness: 230, damping: 24 });
 const Tag = as === "article" ? motion.article : motion.div;
 function follow(event: PointerEvent<HTMLElement>) {
  if (reduce || event.pointerType !== "mouse") return;
  const box = event.currentTarget.getBoundingClientRect();
  rotateX.set((.5 - (event.clientY - box.top) / box.height) * 5);
  rotateY.set(((event.clientX - box.left) / box.width - .5) * 5);
 }
 function reset() { rotateX.set(0); rotateY.set(0); }
 return <Tag className={className} data-kinetic-card="true" style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }} onPointerMove={follow} onPointerLeave={reset} onBlur={reset}>{children}</Tag>;
}
