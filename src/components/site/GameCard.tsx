import { Link } from "@tanstack/react-router";
import type { GameMeta } from "@/lib/games/registry";

export function GameCard({ game }: { game: GameMeta }) {
  return (
    <Link
      to="/games/$slug"
      params={{ slug: game.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5 hover:shadow-[var(--shadow-pop)]"
    >
      <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-secondary via-background to-accent/25 text-5xl">
        <span aria-hidden>{game.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary">
            {game.name}
          </h3>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
            {game.category}
          </span>
        </div>
        <p className="line-clamp-3 text-sm text-muted-foreground">{game.shortDescription}</p>
      </div>
    </Link>
  );
}
