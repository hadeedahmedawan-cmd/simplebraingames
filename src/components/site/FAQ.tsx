import type { GameFAQ } from "@/lib/games/registry";

export function FAQSection({ faqs, heading = "Frequently asked questions" }: { faqs: GameFAQ[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl">
      <h2 id="faq-heading" className="mb-6 text-2xl font-semibold">
        {heading}
      </h2>
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {faqs.map((f, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span className="mt-1 text-muted-foreground transition-transform group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <div className="px-5 pb-5 pt-0 text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function buildFAQSchema(faqs: GameFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
