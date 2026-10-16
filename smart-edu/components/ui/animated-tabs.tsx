"use client";

import { LocalTabs } from "@/components/product/editorial-motion";

export function AnimatedTabs(props: Parameters<typeof LocalTabs>[0]) {
  return <LocalTabs {...props} />;
}
