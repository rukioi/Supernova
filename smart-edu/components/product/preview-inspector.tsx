"use client";
import { useState, type ReactNode } from "react";
import { Settings2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PreviewInspector({ children }: { children: ReactNode }) {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  if (!mobile) return <aside className="se-preview-rail" aria-label="Controles da prévia">{children}</aside>;
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger className="se-button se-button-secondary preview-inspector-trigger"><Settings2 size={18} /> Ajustar prévia</DialogTrigger><DialogContent className="preview-inspector-sheet"><DialogTitle>Explore a experiência</DialogTitle><DialogDescription>Escolha a perspectiva, a fase e o formato da simulação.</DialogDescription><div className="se-app-shell editorial-app"><div className="se-preview-rail">{children}</div></div></DialogContent></Dialog>;
}
