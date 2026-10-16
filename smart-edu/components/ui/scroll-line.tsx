import type { CSSProperties } from "react";
/** A structural connector. Scroll position is not learning progress. */
export function ScrollLine({ className = "", color = "var(--color-action)" }: { className?: string; color?: string }) {
 return <div aria-hidden="true" className={`motion-scroll-line ${className}`}><i style={{ backgroundColor: color } as CSSProperties} /></div>;
}
