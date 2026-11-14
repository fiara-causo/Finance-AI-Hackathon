import { createFileRoute, Link } from "@tanstack/react-router";
import { Receipt, LineChart, BellRing, MessageCircleHeart } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "AI Finance Automation for Retail — Bloom Ledger" },
      { name: "description", content: "Automate receipts, sales syncing and reports, and understand your financial statements with AI made for small retail." },
      { property: "og:title", content: "AI Finance Automation for Retail — Bloom Ledger" },
      { property: "og:description", content: "Automate your workflows and understand your financial statements with AI." },
    ],
  }),
  component: Services,
});

const items = [
  { icon: Receipt, t: "Receipt & expense capture", d: "Snap a photo; AI categorizes it and files it for tax time." },
  { icon: LineChart, t: "Statements, translated", d: "Your P&L, balance sheet and cash flow explained like a friend would." },
  { icon: BellRing, t: "Smart alerts", d: "Get a heads-up when margins slip or a slow month is coming." },
  { icon: MessageCircleHeart, t: "Ask anything", d: "Chat with your numbers: “Can I afford to restock early?”" },
];

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Service one</p>
      <h1 className="mt-3 max-w-2xl text-4xl md:text-5xl">AI that does the money chores — and explains the rest.</h1>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-3xl border border-border bg-card p-7">
            <Icon className="h-7 w-7 text-primary" />
            <h2 className="mt-4 text-2xl">{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
      <Link to="/contact" className="mt-10 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Get early access</Link>
    </section>
  );
}
