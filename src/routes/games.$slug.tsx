import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { GameCard } from "@/components/site/GameCard";
import { AdSlot } from "@/components/site/AdSlot";
import { GameClock } from "@/components/site/GameClock";
import { FAQSection, buildFAQSchema } from "@/components/site/FAQ";
import { getGame, getRelatedGames } from "@/lib/games/registry";
import { SITE } from "@/lib/site";
import { GAME_COMPONENTS } from "@/lib/games/components";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = getGame(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Game not found" }, { name: "robots", content: "noindex" }] };
    }
    const g = loaderData.game;
    return {
      meta: [
        { title: g.metaTitle },
        { name: "description", content: g.metaDescription },
        { name: "keywords", content: g.keywords.join(", ") },
        { property: "og:title", content: g.metaTitle },
        { property: "og:description", content: g.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE}/games/${params.slug}` },
        { name: "twitter:title", content: g.metaTitle },
        { name: "twitter:description", content: g.metaDescription },
      ],
      links: [{ rel: "canonical", href: `${SITE}/games/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Game",
            name: g.name,
            description: g.metaDescription,
            genre: g.category,
            gamePlatform: "Web Browser",
            applicationCategory: "Game",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        },
        { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(g.faqs)) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Games", item: "/games" },
              { "@type": "ListItem", position: 3, name: g.name, item: `/games/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: GamePage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Game not found</h1>
        <p className="mt-2 text-muted-foreground">That game isn't in our library.</p>
        <Link to="/games" className="mt-6 inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Browse all games</Link>
      </div>
    </SiteLayout>
  ),
});

function GamePage() {
  const { game } = Route.useLoaderData();
  const [resetKey, setResetKey] = useState(0);
  const GameComponent = GAME_COMPONENTS[game.slug];
  const related = getRelatedGames(game.related);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-5xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-1">›</span>
          <Link to="/games" className="hover:text-primary">Games</Link>
          <span className="mx-1">›</span>
          <span className="text-foreground">{game.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="mr-2" aria-hidden>{game.emoji}</span>{game.name}
            </h1>
            <p className="mt-1 text-muted-foreground">{game.tagline}</p>
          </div>
          <GameClock resetKey={resetKey} />
        </header>

        {/* Game */}
        <section aria-label={`${game.name} game`} className="my-6">
          {GameComponent ? (
            <GameComponent onReset={() => setResetKey(k => k + 1)} />
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              Game engine unavailable.
            </div>
          )}
        </section>

        {/* Ad below game */}
        <AdSlot id={`${game.slug}-rectangle-below-game`} size="rectangle" />

        {/* About */}
        <section className="mx-auto mt-10 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-semibold">About {game.name}</h2>
          <div className="space-y-4 text-muted-foreground">
            {game.about.map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>
        </section>

        {/* How to play */}
        <section className="mx-auto mt-10 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-semibold">How to play {game.name}</h2>
          <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
            {game.howToPlay.map((step: string, i: number) => <li key={i}>{step}</li>)}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-10">
          <FAQSection faqs={game.faqs} heading={`${game.name} — questions people ask`} />
        </section>

        {/* Ad above related */}
        <AdSlot id={`${game.slug}-leaderboard-above-related`} size="leaderboard" />

        {/* Related */}
        <section className="mx-auto mt-10 max-w-5xl">
          <h2 className="mb-4 font-display text-2xl font-semibold">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map(g => <GameCard key={g.slug} game={g} />)}
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}
