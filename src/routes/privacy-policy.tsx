import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { AdSlot } from "@/components/site/AdSlot";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SimpleBrainGames" },
      { name: "description", content: "SimpleBrainGames privacy policy: what data we collect, how we use cookies and Google AdSense, and how to contact us with privacy questions." },
      { property: "og:title", content: "Privacy Policy — SimpleBrainGames" },
      { property: "og:url", content: `${SITE}/privacy-policy` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/privacy-policy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Who we are</h2>
            <p>SimpleBrainGames ("we", "us") is a free online games site. This policy explains what limited information we collect when you visit, how it is used, and your choices around it.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">What we collect</h2>
            <p>We do not require accounts, and we do not ask for personal information. The only data collected is what any modern website receives automatically: standard server access logs (IP address, browser, referring page), and anonymised analytics used to understand which pages are popular.</p>
            <p className="mt-2">Game progress and settings are stored locally in your browser (localStorage) and never sent to us. Clearing your browser data will erase them.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Cookies and Google AdSense</h2>
            <p>The site uses Google AdSense to display ads. Google and its partners use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising by visiting <a className="text-primary hover:underline" href="https://www.google.com/settings/ads" rel="noreferrer">Google Ads Settings</a>, or opt out of a third-party vendor's use of cookies for personalised advertising by visiting <a className="text-primary hover:underline" href="https://www.aboutads.info/" rel="noreferrer">aboutads.info</a>.</p>
            <p className="mt-2">Analytics cookies help us understand traffic patterns in aggregate. They are not used to identify individual visitors.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">We do not sell your data</h2>
            <p>We do not sell or rent personal information to anyone. We do not build user profiles. The site is designed to work with as little data as possible.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Children</h2>
            <p>The games on this site are suitable for a general audience including children. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Your choices</h2>
            <p>You can disable cookies in your browser, use private browsing, or install an ad-blocker. The games will continue to work.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
            <p>Questions about this policy or your privacy? Email <a className="text-primary hover:underline" href="mailto:hadeed.writes4u@gmail.com">hadeed.writes4u@gmail.com</a>.</p>
          </section>
        </div>
        <AdSlot id="privacy-rectangle" size="rectangle" />
      </article>
    </SiteLayout>
  );
}
