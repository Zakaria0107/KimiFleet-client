import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders `fallback` during prerendering and on the first client render (so hydration
 * matches the static HTML), then swaps in `children` once mounted in the browser.
 * Use it for browser-only widgets such as charts and maps.
 */
export const ClientOnly = ({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
};
