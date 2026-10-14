"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ContextTransition } from "./editorial-motion";
import { ArrowLeft, Bell, Check, CheckCircle2, ChevronDown, ChevronRight, GraduationCap, Search, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { navItems } from "@/lib/demo-data";
import { useStore } from "@/lib/store";
import { Home, Users, BookOpen, FolderOpen, ChartNoAxesCombined } from "lucide-react";

type Toast = { title: string; detail?: string } | null;

export function ProductShell({ children, title, toast, notify }: { children: ReactNode; title: string; toast: Toast; notify: (value: Toast) => void }) {
  const pathname = usePathname();
  const store = useStore();
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const course = store.classes.find(item => pathname.startsWith(`/turmas/${item.id}`)) ?? store.classes.find(item => (pathname.startsWith("/preparar-aula") || pathname === "/aulas") && item.id === store.draft.classId) ?? store.classes[0];
  const parentHref = pathname.includes("/alunos/") ? `/turmas/${course.id}?tab=Alunos` : pathname.startsWith("/turmas/") ? "/turmas" : /^\/(aulas|resultados|experiencia|sessao|preparar-aula)/.test(pathname) ? `/turmas/${course.id}` : "/app";
  const parentLabel = parentHref === "/turmas" ? "Turmas" : parentHref === "/app" ? "Visão geral" : course.name;
  const inLesson = /^\/(preparar-aula|experiencia|sessao)/.test(pathname);
  const isActive = (href: string) => href === "/app" ? pathname === "/app" || pathname === "/" : href.startsWith("/resultados") ? pathname.startsWith("/resultados") : pathname.startsWith(href) || (href === "/aulas" && inLesson);
  const results = [
    ...navItems.map(item => ({ title: item.label, detail: "Área do produto", href: item.href })),
    ...store.classes.map(item => ({ title: item.name, detail: `${item.students} alunos · ${item.course}`, href: `/turmas/${item.id}` })),
    { title: "Segmento de Clientes", detail: "Experiência · Empreendedorismo e Inovação", href: "/experiencia/segmento-de-clientes" },
    { title: store.draft.title, detail: "Preparação em andamento", href: "/preparar-aula" },
  ].filter(item => `${item.title} ${item.detail}`.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")));

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.isContentEditable || Boolean(target?.closest("input, textarea, select"));
      if (!typing && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearch(true); }
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  const navIcons = { layout: Home, users: Users, book: BookOpen, folder: FolderOpen, chart: ChartNoAxesCombined };
  return <MotionConfig reducedMotion="user"><div className="se-app-shell editorial-app journey-app">
    <a className="editorial-skip" href="#product-content">Ir para o conteúdo</a>
    <header className="product-navigation">
      <div className="product-navigation-inner">
        <Link href="/app" className="product-brand" aria-label="Smart Edu — Visão geral"><span><GraduationCap size={21} /></span><b>smart edu<span>ESPAÇO DOCENTE</span></b></Link>
        <DropdownMenu><DropdownMenuTrigger id="product-class-switch-trigger" className="context-trigger" aria-label={`Trocar turma: ${course.name}`}><i aria-hidden="true" /><span><b>{course.name}</b><small>{course.students} alunos · {course.id === "empreendedorismo" ? "Módulo 2" : course.period.split(" · ")[0]}</small></span><ChevronDown size={15} /></DropdownMenuTrigger><DropdownMenuContent align="start" sideOffset={12} className="context-menu"><DropdownMenuLabel>SELECIONAR TURMA</DropdownMenuLabel>{store.classes.map(item => <DropdownMenuItem key={item.id} asChild><Link href={`/turmas/${item.id}`}><span><b>{item.name}</b><small>{item.students} alunos · {item.module}</small></span>{item.id === course.id && <Check size={16} aria-label="Turma atual" />}</Link></DropdownMenuItem>)}<DropdownMenuSeparator /><DropdownMenuItem asChild><Link href="/turmas">Ver todas as turmas</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        <nav className="product-global-nav" aria-label="Navegação principal">{navItems.map(item => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav>
        <div className="product-utilities"><button ref={searchTrigger} aria-label="Buscar" title="Buscar (Ctrl ou ⌘ K)" onClick={() => setSearch(true)}><Search size={19} /></button><button aria-label="Notificações" onClick={() => notify({ title: "Tudo em dia", detail: "Você está em dia com suas notificações." })}><Bell size={19} /></button><button className="product-avatar" aria-label={`Perfil de ${store.profile.name}`} onClick={() => notify({ title: store.profile.name, detail: "Faculdade Horizonte · Professora" })}>{store.profile.name.split(" ").slice(0, 2).map(part => part[0]).join("")}</button></div>
      </div>
    </header>
    <nav className="j-bottom-nav" aria-label="Navegação móvel">{navItems.map(item => {const Icon = navIcons[item.icon];return <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}><Icon size={20}/><span>{item.label}</span></Link>;})}</nav>
    <main className="se-main">
      <div className="product-location"><nav aria-label="Localização">{pathname !== "/app" && pathname !== "/" ? <Link className="context-back" href={parentHref}><ArrowLeft size={16} />{parentLabel}</Link> : <span>Espaço docente</span>}<ChevronRight size={13} /><span aria-current="page">{title}</span>{(pathname.startsWith("/turmas/") || inLesson) && <><ChevronRight className="context-module" size={13} /><span className="context-module">{course.module}</span></>}</nav><span className="product-term">SEMESTRE 2026.2</span></div>
      <div id="product-content" tabIndex={-1}><ContextTransition identity={pathname} className="se-content">{children}</ContextTransition></div>
    </main>
    <Dialog open={search} onOpenChange={setSearch}><DialogContent className="product-search-dialog" onCloseAutoFocus={event => { event.preventDefault(); searchTrigger.current?.focus(); }}><DialogTitle>Buscar no seu espaço</DialogTitle><DialogDescription>Encontre turmas, aulas e áreas do Smart Edu.</DialogDescription><label className="product-search-input"><Search size={19} aria-hidden="true" /><input id="product-search-input" aria-label="Buscar turmas e aulas" aria-controls="product-search-results" placeholder="Digite o nome de uma turma ou aula…" value={query} onChange={event => setQuery(event.target.value)} /></label><p className="sr-only" role="status" aria-live="polite">{results.length ? `${results.length} resultados.` : "Nenhum resultado. Tente outro nome."}</p><nav id="product-search-results" className="product-search-results" aria-label="Resultados da busca">{results.length ? results.map(item => <Link key={item.href + item.title} href={item.href} onClick={() => setSearch(false)}><b>{item.title}</b><small>{item.detail}</small></Link>) : <p>Nenhum resultado. Tente outro nome.</p>}</nav></DialogContent></Dialog>
    <div className="se-toast j-feedback" role="status" aria-live="polite" aria-atomic="true">{toast && <><CheckCircle2 size={18} /><span><b>{toast.title}</b>{toast.detail && <small>{toast.detail}</small>}</span><button type="button" aria-label="Fechar notificação" onClick={() => notify(null)}><X size={17} /></button></>}</div>
  </div></MotionConfig>;
}
