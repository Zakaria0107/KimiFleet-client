import { lazy, Suspense, type ReactNode } from "react";
import type { i18n as I18n } from "i18next";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ROUTES, type PageId } from "./seo/routes";

// Lazy load pages for code splitting. Keep in sync with PAGE_MODULES in seo/routes.ts.
const ContentPage = lazy(() => import("./pages/ContentPage"));
const pages: Record<PageId, ReturnType<typeof lazy>> = {
  home: lazy(() => import("./pages/Index")),
  privacy: lazy(() => import("./pages/PrivacyPolicy")),
  bookingWebsite: ContentPage,
  moroccoSoftware: ContentPage,
  digitalContract: ContentPage,
  pricing: ContentPage,
};
const NotFound = lazy(() => import("./pages/NotFound"));

// Create QueryClient outside component to avoid recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

/** Providers shared by the browser entry (main.tsx) and the prerender entry (entry-server.tsx). */
export const AppProviders = ({ i18n, children }: { i18n: I18n; children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  </I18nextProvider>
);

/** Routes come from seo/routes.ts; the router itself is supplied by each entry. */
export const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {ROUTES.map((route) => {
        const Page = pages[route.page];
        return <Route key={route.path} path={route.path} element={<Page />} />;
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
