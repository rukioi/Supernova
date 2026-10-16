"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; onReward?: () => void };
/** A click does not confirm an achievement. Retained for existing consumers. */
export function RewardButton({ children, onReward, onClick, ...props }: Props) {
 return <button type="button" {...props} onClick={event => { onClick?.(event); if (!event.defaultPrevented) onReward?.(); }}>{children}</button>;
}
