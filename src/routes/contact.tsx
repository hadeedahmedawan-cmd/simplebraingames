import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { AdSlot } from "@/components/site/AdSlot";

const EMAIL = "hadeed.writes4u@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SimpleBrainGames — Game Suggestions & Bug Reports" },
      { name: "description", content: "Contact SimpleBrainGames. Suggest a game, report a bug, or say hi. Email hadeed.writes4u@gmail.com or use the form." },
      { property: "og:title", content: "Contact SimpleBrainGames" },
      { property: "og:description", content: "Suggest a game, report a bug, or get in touch." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`SimpleBrainGames contact from ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Get in touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a game to suggest? Spot a bug? Want to say hi? We read every message. Especially game suggestions and bug reports — that is most of what this inbox is for.
        </p>
        <p className="mt-2 text-muted-foreground">
          Or email us directly: <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">{EMAIL}</a>
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input id="name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input id="email" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">Message</label>
            <textarea id="message" required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit" className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Send message
          </button>
          {status === "sent" && <p className="text-sm text-success">Opening your email app…</p>}
        </form>
        <AdSlot id="contact-rectangle" size="rectangle" />
      </article>
    </SiteLayout>
  );
}
