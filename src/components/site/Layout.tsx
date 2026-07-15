import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/games", label: "All Games" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="text-lg">🧠</span>
          </span>
          <span>SimpleBrainGames</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {NAV.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-medium bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/games"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 md:hidden"
        >
          Play
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">🧠</span>
              SimpleBrainGames
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Free brain games and puzzles in your browser. No download, no sign-up, just play.
            </p>
          </div>
          <FooterCol title="Explore" links={[
            { to: "/", label: "Home" },
            { to: "/games", label: "All Games" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ]} />
          <FooterCol title="Popular" links={[
            { to: "/games/sudoku", label: "Sudoku" },
            { to: "/games/2048", label: "2048" },
            { to: "/games/wordle-clone", label: "Word Guess" },
            { to: "/games/snake", label: "Snake" },
          ]} />
          <FooterCol title="Legal" links={[
            { to: "/privacy-policy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms of Use" },
          ]} />
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} SimpleBrainGames. All rights reserved.</span>
          <span>Made for players who like to think.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} className="text-foreground/80 hover:text-primary">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
