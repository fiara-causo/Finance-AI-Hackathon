import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Pricing: Automated CFO or Dedicated CFO | Bloom Ledger" },
      { name: "description", content: "Two flat monthly plans: an automated CFO, or a dedicated CFO contractor with 24/7 support billed by outcomes, not hours." },
      { property: "og:title", content: "Pricing | Bloom Ledger" },
      { property: "og:description", content: "Automated CFO or a dedicated CFO contractor. Flat monthly rates, never billed by the hour." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const plans = [
  {
    name: "Automated CFO", price: "$499", tag: "Software only, no human in the loop",
    d: "Our automation runs your month end close and explains your numbers in plain English.",
    features: ["Connect Shopify, Stripe, your bank and QuickBooks", "Every bank line categorized automatically", "Payouts, sales tax and payroll reconciled to the cent", "Monthly P&L with plain English insights", "Cash runway tracking and low cash alerts", "Review queue for only the items that are unclear"],
    cta: "Start with automation", featured: false,
  },
  {
    name: "Dedicated CFO Contractor", price: "$2,499", tag: "A finance expert dedicated to your business",
    d: "Everything in Automated CFO, plus an experienced CFO who owns the outcomes with you.",
    features: ["Everything in Automated CFO", "A dedicated CFO contractor who knows your business", "24/7 support by message and call", "Budgets, forecasts and cash planning", "Lender, investor and board ready reporting", "Billed on outcomes, never by the hour"],
    cta: "Talk to a CFO", featured: true,
  },
];

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-wide text-primary">Pricing</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Two ways to get your finances handled.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">One flat rate every month. No hourly bills, no surprise invoices.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {plans.map((p) => (
          <div key={p.name} className={`flex flex-col rounded-lg border p-7 md:p-8 ${p.featured ? "border-primary bg-ink text-background shadow-xl" : "border-border bg-card"}`}>
            <p className={`text-xs font-semibold uppercase ${p.featured ? "text-blush" : "text-primary"}`}>{p.tag}</p>
            <h2 className="mt-2 text-3xl">{p.name}</h2>
            <p className="mt-4"><span className="font-display text-5xl">{p.price}</span><span className="opacity-70"> / month flat</span></p>
            <p className="mt-4 leading-relaxed opacity-80">{p.d}</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-primary" />{f}</li>)}
            </ul>
            <Button asChild variant={p.featured ? "default" : "outline"} className="mt-8 h-11"><Link to="/contact">{p.cta}</Link></Button>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">Not sure which fits? Book a chat and we'll recommend one in 15 minutes.</p>
    </section>
  );
}
