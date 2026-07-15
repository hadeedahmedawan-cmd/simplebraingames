import { useEffect, useRef } from "react";

// ---------------------------------------------------------------
// Google AdSense slot.
//
// To go live:
//   1. Replace ADSENSE_CLIENT below with your real publisher id
//      (e.g. "ca-pub-1234567890123456"). The same value is also
//      referenced in src/routes/__root.tsx for the loader script
//      and the google-adsense-account meta tag.
//   2. Create ad units in your AdSense dashboard and copy each
//      slot id into SLOT_IDS below (keyed by the `id` prop used
//      on each <AdSlot /> across the app).
//   3. Publish. Google will start crawling the placeholders.
// ---------------------------------------------------------------

export const ADSENSE_CLIENT = "ca-pub-0000000000000000";

// Map every <AdSlot id="..."> in the app to a real ad-unit slot id.
// Anything left as an empty string will render a visible placeholder
// during development instead of an empty AdSense iframe.
const SLOT_IDS: Record<string, string> = {
  "home-leaderboard-top": "",
  "home-rectangle-mid": "",
  "home-leaderboard-bottom": "",
  "games-leaderboard-top": "",
  "games-leaderboard-bottom": "",
  "about-rectangle": "",
  "contact-rectangle": "",
  "privacy-rectangle": "",
  "terms-rectangle": "",
};

// Fallback for any per-game slots that follow the naming pattern
// `${slug}-rectangle-below-game` and `${slug}-leaderboard-above-related`.
// Populate the two entries below to serve one shared ad unit across
// every game page, or add explicit per-slug overrides in SLOT_IDS.
const GAME_DEFAULT_SLOTS = {
  rectangle: "",
  leaderboard: "",
};

interface AdSlotProps {
  id: string;
  size: "leaderboard" | "rectangle" | "mobile-banner";
  label?: string;
}

const SIZE_CLASS: Record<AdSlotProps["size"], string> = {
  leaderboard: "h-[90px] w-full max-w-[728px]",
  rectangle: "h-[250px] w-full max-w-[300px]",
  "mobile-banner": "h-[50px] w-full max-w-[320px]",
};

function resolveSlot(id: string): string {
  if (SLOT_IDS[id]) return SLOT_IDS[id];
  if (id.endsWith("-rectangle-below-game")) return GAME_DEFAULT_SLOTS.rectangle;
  if (id.endsWith("-leaderboard-above-related")) return GAME_DEFAULT_SLOTS.leaderboard;
  return "";
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ id, size, label }: AdSlotProps) {
  const slot = resolveSlot(id);
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!slot) return;
    if (typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not loaded yet — retries on next mount */
    }
  }, [slot, id]);

  return (
    <div className="my-6 flex justify-center">
      {/* AD SLOT: {id} — {size} */}
      {slot ? (
        <ins
          ref={insRef}
          className={`adsbygoogle mx-auto block ${SIZE_CLASS[size]}`}
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-ad-slot-name={id}
        />
      ) : (
        <div
          data-ad-slot={id}
          data-ad-size={size}
          className={`ad-slot mx-auto flex items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/40 text-xs text-muted-foreground ${SIZE_CLASS[size]}`}
          aria-label="Advertisement placeholder"
        >
          {label ?? "Advertisement"}
        </div>
      )}
    </div>
  );
}
