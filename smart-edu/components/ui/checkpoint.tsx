"use client";

import { Check, Compass, LockKeyhole } from "lucide-react";

export function Checkpoint({ state, label, index }: { state: "complete" | "current" | "future"; label: string; index: number }) {
  return <li className={`motion-checkpoint is-${state}`} aria-current={state === "current" ? "step" : undefined}><span>{state === "complete" ? <Check size={14}/> : state === "current" ? <Compass size={14}/> : <LockKeyhole size={12}/>}</span><small>{label || String(index).padStart(2,"0")}</small></li>;
}
