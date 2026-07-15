import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { AdSlot } from "@/components/site/AdSlot";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — SimpleBrainGames" },
      { name: "description", content: "Terms of use for SimpleBrainGames. Free entertainment, no warranty, and content usage rules." },
      { property: "og:title", content: "Terms of Use — SimpleBrainGames" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Acceptance</h2>
            <p>By using SimpleBrainGames, you agree to these terms. If you do not agree, please do not use the site.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Free for personal use</h2>
            <p>The games are provided free of charge for personal entertainment. You are welcome to play as much as you like on any device.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Provided as-is</h2>
            <p>The site and its games are provided "as-is," without warranties of any kind, express or implied. We do our best to keep everything working, but we do not guarantee uptime, accuracy, or that games will always run bug-free.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">No liability</h2>
            <p>To the maximum extent permitted by law, SimpleBrainGames and its contributors are not liable for any damages arising from your use of the site.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Content usage</h2>
            <p>The content on this site — including the game implementations, page copy, and design — may not be copied, republished, mirrored, or redistributed elsewhere without written permission.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Third-party links and ads</h2>
            <p>The site may contain links to third-party sites and displays advertisements served by Google AdSense. We are not responsible for the content or practices of those third parties.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Changes</h2>
            <p>These terms may be updated from time to time. Continued use of the site after changes means you accept the updated terms.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
            <p>Questions about these terms? Email <a className="text-primary hover:underline" href="mailto:hadeed.writes4u@gmail.com">hadeed.writes4u@gmail.com</a>.</p>
          </section>
        </div>
        <AdSlot id="terms-rectangle" size="rectangle" />
      </article>
    </SiteLayout>
  );
}
