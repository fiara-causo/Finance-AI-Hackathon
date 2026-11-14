import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Workflow, UserRound, ArrowUpRight } from "lucide-react";
import { AiDemo } from "@/components/ai-demo";
import { Button } from "@/components/ui/button";
import { ConsultantPhoto } from "@/components/consultant-photo";
import { findConsultants } from "@/lib/consultant-matching";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bloom Ledger — Expert people. Smarter finance." },
      { name: "description", content: "Meet the finance and technology team behind Bloom Ledger. Enterprise experience and AI-powered financial support for small retail businesses." },
      { property: "og:title", content: "Bloom Ledger — Expert people. Smarter finance." },
      { property: "og:description", content: "Meet our finance and technology consultants and explore AI-powered financial support for your shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const team = findConsultants("all", []);
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-10 md:pt-14">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase text-primary">Independent minds. Enterprise experience.</p>
              <h1 className="mt-3 text-5xl leading-tight md:text-6xl">Bloom Ledger<span className="text-primary">.</span></h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">Real people behind smarter finance. Meet the team bringing financial clarity, strategy, and AI to your business.</p>
            </div>
            <Button asChild className="h-11 w-fit"><Link to="/assistants">Find your financial partner <ArrowUpRight /></Link></Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
            {team.map(({ consultant }) => (
              <Link key={consultant.slug} to="/assistants" className="group min-w-0">
                <ConsultantPhoto consultant={consultant} portrait />
                <div className="mt-4 flex items-start justify-between gap-2"><h2 className="text-xl leading-tight md:text-2xl">{consultant.name}</h2><ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none" /></div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{consultant.headline}</p>
                <p className="mt-2 text-xs leading-relaxed text-primary">{consultant.companies.join(" • ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink text-background">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 py-7 md:flex-row md:items-center">
          <h2 className="text-2xl">Big-company experience.<br className="md:hidden" /> Small-business focus.</h2>
          <p className="max-w-lg text-sm leading-relaxed opacity-80">From retail planning and forecasting to strategy, controls, and technology — expertise that meets you where you are.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-3xl md:text-4xl">Two ways to move forward</h2>
        <div className="mt-7 grid gap-8 md:grid-cols-2">
          <div className="border-t-2 border-primary py-6">
            <Workflow className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-2xl">AI automation & statement insights</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">Automate your money tasks and turn your financial statements into clear next steps.</p>
            <Button asChild variant="link" className="mt-3 px-0"><Link to="/services">Explore AI tools <ArrowRight /></Link></Button>
          </div>
          <div className="border-t-2 border-primary py-6">
            <UserRound className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-2xl">An AI-forward financial assistant</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">Work with consultants whose finance, strategy, and technology experience supports your next decision.</p>
            <Button asChild variant="link" className="mt-3 px-0"><Link to="/assistants">Meet your match <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-2">
          <div><p className="text-xs font-bold uppercase text-primary">Your numbers, made clear</p><h2 className="mt-3 text-3xl">A little less admin.<br />A lot more insight.</h2></div>
          <AiDemo />
        </div>
      </section>
    </>
  );
}
