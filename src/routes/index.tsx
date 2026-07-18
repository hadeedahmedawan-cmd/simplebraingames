import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { GameCard } from "@/components/site/GameCard";
import { AdSlot } from "@/components/site/AdSlot";
import { FAQSection, buildFAQSchema } from "@/components/site/FAQ";
import { GAMES, FEATURED_GAMES } from "@/lib/games/registry";
import { SITE } from "@/lib/site";

const HOME_FAQS = [
  { q: "Is SimpleBrainGames really free?", a: "Yes. Every game on the site is free to play, forever. We keep the lights on with unobtrusive ads." },
  { q: "Do I need to sign up or create an account?", a: "No account needed. Open a game and start playing — nothing is saved to a server." },
  { q: "Does the site work on mobile?", a: "Yes. Every game is designed to work with taps and swipes on phones and tablets, as well as clicks and keyboards on desktops." },
  { q: "Do I need to download anything?", a: "No downloads. Games load in your browser and start playing immediately." },
  { q: "Which games can I play here?", a: "We currently host 18 titles including Sudoku, 2048, Wordle-style word guess, Snake, Tic Tac Toe, Connect 4, Minesweeper, Memory Match, Simon Says, Hangman, and more." },
  { q: "Are these brain games actually good for you?", a: "Playing puzzles regularly practices working memory, logical reasoning, and pattern recognition. It won't turn you into a genius, but it is a nice low-pressure workout for the mind." },
  { q: "Can I play with a friend on the same device?", a: "Yes — several of our games (Tic Tac Toe, Connect 4, Checkers, Reversi, Dots and Boxes) are two-player local, designed to be passed around one phone or laptop." },
  { q: "How do I suggest a game?", a: "Send us a note through the contact page. If a game is easy to build and requested by enough people, we will add it." },
  { q: "Are my scores or game history saved?", a: "Session state stays until you close the tab. We do not create accounts or store personal information." },
  { q: "Does SimpleBrainGames show ads?", a: "Yes. The site is supported by Google AdSense. Ads are marked clearly and do not interfere with gameplay." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SimpleBrainGames — 18 Free Brain Games & Puzzles Online" },
      { name: "description", content: "Play 18 free brain games and puzzles online: Sudoku, 2048, Wordle, Snake, Tic Tac Toe, Connect 4, Minesweeper and more. No download, no sign-up." },
      { property: "og:title", content: "SimpleBrainGames — 18 Free Brain Games & Puzzles Online" },
      { property: "og:description", content: "18 free browser games: Sudoku, 2048, Wordle, Snake, Tic Tac Toe and more. No download, no sign-up." },
      { property: "og:url", content: SITE },
    ],
    links: [{ rel: "canonical", href: SITE }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(buildFAQSchema(HOME_FAQS)) }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent/25 via-background to-background" />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            🧠 18 games · zero downloads · zero ads on gameplay
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Free brain games and puzzles, <span className="text-primary">played in your browser.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            No download, no sign-up, no clutter. Just clean, fast games — Sudoku, 2048, Wordle, Snake, Tic Tac Toe, Connect 4 and more.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/games" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105">Play Now</Link>
            <Link to="/games/sudoku" className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary">Try Sudoku →</Link>
          </div>
        </div>
      </section>

      {/* Ad: leaderboard below hero */}
      <div className="mx-auto max-w-6xl px-4">
        <AdSlot id="home-leaderboard-top" size="leaderboard" />
      </div>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Featured games</h2>
          <Link to="/games" className="text-sm font-medium text-primary hover:underline">See all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {FEATURED_GAMES.map(g => <GameCard key={g.slug} game={g} />)}
        </div>
      </section>

      {/* Ad: mid-page rectangle */}
      <div className="mx-auto max-w-6xl px-4">
        <AdSlot id="home-rectangle-mid" size="rectangle" />
      </div>

      {/* Full grid */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-6 font-display text-2xl font-semibold sm:text-3xl">All 18 games</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GAMES.map(g => <GameCard key={g.slug} game={g} />)}
        </div>
      </section>

      {/* Why section — SEO body content */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-muted-foreground">
        <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">Why SimpleBrainGames</h2>
        <p>SimpleBrainGames is a free brain games and puzzle hub built for people who want something a little sharper than an endless-scroll app. The site collects classic puzzles — <Link to="/games/sudoku" className="text-primary hover:underline">free sudoku online</Link>, <Link to="/games/2048" className="text-primary hover:underline">play 2048 free</Link>, a <Link to="/games/wordle-clone" className="text-primary hover:underline">wordle-style word guess game</Link> with unlimited rounds — plus the timeless two-player games like <Link to="/games/tic-tac-toe" className="text-primary hover:underline">tic tac toe</Link>, <Link to="/games/connect-4" className="text-primary hover:underline">connect 4</Link>, <Link to="/games/checkers" className="text-primary hover:underline">checkers</Link>, and <Link to="/games/reversi" className="text-primary hover:underline">reversi</Link>.</p>
        <p className="mt-4">Every game runs entirely in your browser. There is nothing to install, no account to create, and no wall between you and the game. Whether you are looking for a quick brain warm-up on your phone before work or a longer session on a laptop, the games load in seconds and play smoothly on both.</p>
        <p className="mt-4">We built the site around a simple rule — the game should be the star. That means clean layouts, generous touch targets, quiet colour palettes, and no autoplay video ads sitting on top of the puzzle. Ad slots exist to support the site, but they never overlap gameplay.</p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <FAQSection faqs={HOME_FAQS} />
      </section>

      {/* Ad: footer leaderboard */}
      <div className="mx-auto max-w-6xl px-4">
        <AdSlot id="home-leaderboard-bottom" size="leaderboard" />
      </div>
    </SiteLayout>
  );
}
