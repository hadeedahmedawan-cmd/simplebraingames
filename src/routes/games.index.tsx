import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { GameCard } from "@/components/site/GameCard";
import { AdSlot } from "@/components/site/AdSlot";
import { GAMES } from "@/lib/games/registry";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/games/")({
  head: () => ({
    meta: [
      { title: "All Games — 18 Free Brain Games & Puzzles | SimpleBrainGames" },
      { name: "description", content: "Browse all 18 free brain games and puzzles on SimpleBrainGames. Sudoku, 2048, Wordle, Snake, Tic Tac Toe, Connect 4, Minesweeper and more — no download." },
      { property: "og:title", content: "All 18 Free Brain Games — SimpleBrainGames" },
      { property: "og:description", content: "Every game on SimpleBrainGames in one place. Sudoku, 2048, Wordle-style word guess, Snake, and more." },
      { property: "og:url", content: `${SITE}/games` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/games` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "All Brain Games",
          description: "Free brain games and puzzles on SimpleBrainGames.",
          hasPart: GAMES.map(g => ({ "@type": "Game", name: g.name, url: `/games/${g.slug}`, description: g.shortDescription })),
        }),
      },
    ],
  }),
  component: AllGames,
});

const CATEGORIES = [
  { key: "board", label: "Board & 2-Player" },
  { key: "puzzle", label: "Puzzle & Logic" },
  { key: "word", label: "Word Games" },
  { key: "memory", label: "Memory" },
  { key: "arcade", label: "Arcade & Reaction" },
] as const;

function AllGames() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <nav className="mb-4 text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary">Home</a> <span className="mx-1">›</span> <span className="text-foreground">All Games</span>
        </nav>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">All free brain games</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every game on SimpleBrainGames — 18 titles across board games, puzzles, word games, memory, and arcade classics. All free, all in your browser.
        </p>

        <AdSlot id="games-leaderboard-top" size="leaderboard" />

        {CATEGORIES.map(cat => {
          const items = GAMES.filter(g => g.category === cat.key);
          if (!items.length) return null;
          return (
            <div key={cat.key} className="mt-10">
              <h2 className="mb-4 font-display text-2xl font-semibold">{cat.label}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.map(g => <GameCard key={g.slug} game={g} />)}
              </div>
            </div>
          );
        })}

        <AdSlot id="games-leaderboard-bottom" size="leaderboard" />
      </section>
    </SiteLayout>
  );
}
