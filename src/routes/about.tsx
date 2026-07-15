import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { AdSlot } from "@/components/site/AdSlot";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SimpleBrainGames — Free Brain Games & Puzzles" },
      { name: "description", content: "About SimpleBrainGames: a free browser hub for classic brain games and puzzles. Why we built it, who runs it, and what we believe about clean games." },
      { property: "og:title", content: "About SimpleBrainGames" },
      { property: "og:description", content: "A free browser hub for classic brain games and puzzles. No sign-ups, no clutter." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">About SimpleBrainGames</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            SimpleBrainGames is a small, free collection of classic brain games and puzzles built for a specific kind of visitor — someone who wants a quick, quiet moment of thinking without a sign-up wall, a video ad on autoplay, or a launcher screen pushing three other apps.
          </p>
          <p>
            The site exists because most game portals have gotten heavy. We wanted somewhere to send a friend when they said "I feel like playing Sudoku for ten minutes" and not have to warn them about pop-ups. So we built it — 18 titles across board games, puzzles, word games, memory, and arcade classics.
          </p>
          <p>
            The site is run by a very small team who genuinely enjoy these games. If a game feels off, tell us. If a game is missing, tell us. We keep a running list of requests and add the ones people ask for most.
          </p>
          <p>
            Everything on the site is free. It stays that way. Small, unobtrusive ads support the hosting bill, and gameplay is never blocked by them.
          </p>
        </div>
        <AdSlot id="about-rectangle" size="rectangle" />
        <div className="mt-10">
          <Link to="/games" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Play a game →</Link>
        </div>
      </article>
    </SiteLayout>
  );
}
