"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {useEffect, useSyncExternalStore} from "react";
import { resolveSession } from "./learning-data";
import { useStore } from "./store";

const locationListeners = new Set<() => void>();
let observedPathname = "";
function notifyLocation() {
  observedPathname = window.location.pathname;
  locationListeners.forEach(listener => listener());
}
function restoreLocation(event: PopStateEvent) {
  // These routes render their content in the persistent client app. Traversal
  // restores that app directly; a second RSC navigation only races this restore
  // and can leave Vinext's development error overlay blocking the interface.
  const clientRoute = /^\/(?:app|turmas|aulas|materiais|resultados|preparar-aula|experiencia|sessao)(?:\/|$)/.test(window.location.pathname) || window.location.pathname === "/";
  if (clientRoute || window.location.pathname === observedPathname) event.stopImmediatePropagation();
  notifyLocation();
}
function subscribeLocation(listener: () => void) {
  if (!locationListeners.size) {
    observedPathname = window.location.pathname;
    window.addEventListener("popstate", restoreLocation, true);
    window.addEventListener("smart-location-change", notifyLocation);
  }
  locationListeners.add(listener);
  return () => {
    locationListeners.delete(listener);
    if (!locationListeners.size) {
      window.removeEventListener("popstate", restoreLocation, true);
      window.removeEventListener("smart-location-change", notifyLocation);
    }
  };
}
export function useProductPathname() {
  const routed = usePathname();
  const pathname = useSyncExternalStore(subscribeLocation, () => window.location.pathname, () => null);
  useEffect(() => { observedPathname = window.location.pathname; }, [routed]);
  return pathname ?? routed;
}
export function useLocationParams() {
  const routerParams = useSearchParams();
  const search = useSyncExternalStore(subscribeLocation, () => window.location.search, () => null);
  return search === null ? routerParams : new URLSearchParams(search);
}

// URL state belongs to a history entry, never to the persisted lesson draft.
export function useUrlState(key: string, fallback: string) {
  const params = useLocationParams();
  const pathname = useProductPathname();
  const value = params.get(key) ?? fallback;
  const setValue = (next: string | ((previous: string) => string)) => {
    const current = new URLSearchParams(window.location.search);
    const resolved = typeof next === "function" ? next(current.get(key) ?? fallback) : next;
    if (resolved === fallback) current.delete(key); else current.set(key, resolved);
    const query = current.toString();
    const href = `${pathname}${query ? `?${query}` : ""}`;
    if (href === window.location.pathname + window.location.search) return;
    // Filters and tabs are client state. Avoid fetching an RSC tree for each
    // keystroke, while retaining an independently restorable history entry.
    window.history.pushState(window.history.state, "", href);
    window.dispatchEvent(new Event("smart-location-change"));
  };
  return [value, setValue] as const;
}

export function useActiveCourse() {
  const store = useStore();
  const pathname = useProductPathname();
  const params = useLocationParams();
  const id = pathname.startsWith("/turmas/") ? pathname.split("/")[2]
    : /^\/(resultados|sessao)/.test(pathname) ? resolveSession(pathname.split("/")[2] ?? "")?.classId ?? params.get("turma") ?? store.draft.classId
    : pathname.startsWith("/experiencia") ? store.draft.classId
    : pathname.startsWith("/preparar-aula") ? store.draft.classId
    : params.get("turma") ?? store.draft.classId;
  return store.classes.find(course => course.id === id);
}
