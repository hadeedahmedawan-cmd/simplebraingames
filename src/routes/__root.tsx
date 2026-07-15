import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/site/Layout";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-7xl font-bold">404</h1>
        <h2 className="mt-2 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That page doesn't exist. Try one of our games instead.
        </p>
        <Link
          to="/games"
          className="mt-6 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Browse all games
        </Link>
      </div>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <SiteLayout>
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can retry or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">Go home</a>
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SimpleBrainGames — Free Brain Games & Puzzles Online" },
      { name: "description", content: "Free online brain games and puzzles. Play Sudoku, 2048, Wordle, Snake, Tic Tac Toe, Minesweeper and more. No download, no sign-up." },
      { name: "author", content: "SimpleBrainGames" },
      { name: "keywords", content: "free brain games, puzzles online, sudoku, 2048, wordle, tic tac toe, connect 4, minesweeper, snake, memory match, brain training" },
      { name: "google-adsense-account", content: "ca-pub-0000000000000000" },
      { property: "og:site_name", content: "SimpleBrainGames" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SimpleBrainGames — Free Brain Games & Puzzles Online" },
      { property: "og:description", content: "18 free brain games and puzzles. Play in your browser, no download, no sign-up." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#4f46e5" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        // Google AdSense loader — replace the client id with your real
        // publisher id in src/components/site/AdSlot.tsx and this file.
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000",
        async: true,
        crossOrigin: "anonymous",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SimpleBrainGames",
          description: "Free brain games and puzzles online.",
          potentialAction: { "@type": "SearchAction", target: "/games?q={q}", "query-input": "required name=q" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
