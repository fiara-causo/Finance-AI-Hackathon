import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/assistants")({
  head: () => ({
    meta: [
      { title: "Hire an AI-Forward Financial Assistant — Bloom Ledger" },
      { name: "description", content: "Fractional financial assistants with enterprise experience and AI tools, matched to your small retail business." },
      { property: "og:title", content: "Hire an AI-Forward Financial Assistant — Bloom Ledger" },
      { property: "og:description", content: "Enterprise-trained, AI-forward financial help for small retail." },
    ],
  }),
  component: Assistants,
});

const perks = [
  "Background in enterprise finance & retail",
  "Uses AI tools to work faster, so you pay less",
  "Monthly close, budgets, cash-flow planning",
  "Flexible hours — from a few a month to weekly",
];

function Assistants() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Service two</p>
        <h1 className="mt-3 text-4xl md:text-5xl">A financial right hand, <em className="text-primary">without</em> the big-firm bill.</h1>
        <p className="mt-5 text-lg text-muted-foreground">We match you with an assistant who's worked inside large companies and now brings those skills — plus AI — to independent shops.</p>
        <Link to="/contact" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Request a match</Link>
      </div>
      <ul className="space-y-4 rounded-3xl bg-secondary p-8">
        {perks.map((p) => (
          <li key={p} className="flex gap-3 text-secondary-foreground">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
