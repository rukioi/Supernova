"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="editorial-loading editorial-error" role="alert" aria-labelledby="error-title" aria-describedby="error-description"><p className="eyebrow">SMART EDU · SEU ESPAÇO DOCENTE</p><h1 id="error-title">Não foi possível abrir esta página.</h1><p id="error-description">Tente novamente para continuar de onde parou. Se o problema continuar, volte à visão geral.</p><div className="actions"><button type="button" className="btn primary" onClick={reset}>Tentar novamente</button><Link className="btn secondary" href="/app">Voltar à visão geral</Link></div></main>;
}
