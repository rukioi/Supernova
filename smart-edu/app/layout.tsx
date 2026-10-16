import { ProductApp } from "@/components/product/app";
import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./product.css";
import "./smart-edu.css";
import "./studio.css";
import "./editorial.css";
import "./journey.css";
import "./experience.css";
import "./preview.css";
import "./controls.css";
import "./campus.css";
import "./game-maps.css";
import "./foundations.css";
import "./living-system.css";
import "./journey-energy.css";
import "./discovery-energy.css";
import "./kinetic-system.css";
import "./journey-redesign.css";
import "./discovery-redesign.css";
import "./game-motion-redesign.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Smart Edu · Espaço do professor",
  description: "Planeje aulas, conduza experiências e acompanhe a aprendizagem da sua turma.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased"><Suspense fallback={children}><ProductApp /></Suspense><Toaster /></body>
    </html>
  );
}
