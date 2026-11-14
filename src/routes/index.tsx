import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Workflow, UserRound } from "lucide-react";
import { AiDemo } from "@/components/ai-demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bloom Ledger — AI finance for small retail shops" },
      { name: "description", content: "Automate your bookkeeping, understand your financial statements, or hire an AI-forward financial assistant with enterprise experience." },
      { property: "og:title", content: "Bloom Ledger — AI finance for small retail shops" },
      { property: "og:description", content: "Automate your bookkeeping, understand your statements, or hire an AI-forward financial assistant." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blush/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-block rounded-full border border-primary/30 bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              For boutiques, makers & shop owners
            </p>
            <h1 className="mt-5 text-5xl leading-[1.05] text-foreground md:text-6xl">
              Your numbers, <em className="text-primary">finally</em> on your side.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Bloom Ledger uses AI to automate your money tasks and explain your statements in plain English — or pairs you with an AI-forward financial assistant who's done this at enterprise scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
                Explore AI tools <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/assistants" className="rounded-full border border-foreground/20 px-6 py-3 font-semibold text-foreground hover:bg-card">
                Hire an assistant
              </Link>
            </div>
          </div>
          <AiDemo />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl md:text-4xl">Two ways to bloom</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-secondary p-8">
            <Workflow className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-2xl">AI automation & statement insights</h3>
            <p className="mt-2 text-secondary-foreground/80">Connect your shop, and let AI sort receipts, sync sales, flag surprises and turn your P&L into clear next steps.</p>
            <Link to="/services" className="mt-5 inline-flex items-center gap-1 font-semibold text-primary">See how <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-background">
            <UserRound className="h-8 w-8 text-blush" />
            <h3 className="mt-4 text-2xl">An AI-forward financial assistant</h3>
            <p className="mt-2 opacity-80">Fractional experts with enterprise finance backgrounds, armed with AI tools — at a small-shop price.</p>
            <Link to="/assistants" className="mt-5 inline-flex items-center gap-1 font-semibold text-blush">Meet them <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-3">
        {[
          ["4 hrs", "saved per week on bookkeeping"],
          ["Plain English", "explanations of every statement"],
          ["Enterprise", "experience, small-shop warmth"],
        ].map(([big, small]) => (
          <div key={big} className="rounded-2xl border border-border p-6">
            <FileText className="h-5 w-5 text-primary" />
            <p className="mt-3 font-display text-3xl text-foreground">{big}</p>
            <p className="text-sm text-muted-foreground">{small}</p>
          </div>
        ))}
      </section>
    </>
  );
}
