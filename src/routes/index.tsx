import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import marcus from "@/assets/client-marcus.jpg";
import sarah from "@/assets/client-sarah.jpg";
import david from "@/assets/client-david.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Day One CFO | Understand your numbers. Run a better business." },
      { name: "description", content: "Plain English clarity about your numbers for founders who didn't study finance. Automated books and a CFO when you need one." },
      { property: "og:title", content: "Day One CFO | Understand your numbers" },
      { property: "og:description", content: "You didn't start a company to spend your weekends decoding a P&L." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pains = [
  { q: "Where did the cash go?", d: "Sales are up, the P&L says you made money, and the bank account is still shrinking." },
  { q: "Why does payroll feel scary?", d: "Your report says you're profitable, yet every second Friday feels like a cliff edge." },
  { q: "What do I even ask?", d: "Your bookkeeper sends a PDF each month. You nod along and hope nothing is wrong." },
];

const stories = [
  { photo: marcus, name: "Marcus T.", role: "B2B SaaS founder", pain: "Sales were booming, but our bank balance kept dropping.", win: "I finally understood how upfront annual contracts were tricking my brain." },
  { photo: sarah, name: "Sarah K.", role: "Agency founder", pain: "I used to nod along on calls with our CPA.", win: "Now I bring three smart questions to every monthly review." },
  { photo: david, name: "David L.", role: "Ecommerce founder", pain: "I thought being bad at numbers meant I was failing as a CEO.", win: "Accounting is mostly addition dressed up in jargon." },
];

const paths = [
  { t: "I hate math. Teach me the basics.", d: "A short cookie shop game. 15 founder numbers, no homework.", to: "/curriculum" as const },
  { t: "I want it handled for me.", d: "Automated books, reconciliations and a monthly P&L in plain English.", to: "/services" as const },
  { t: "I want a person on my side.", d: "A dedicated CFO contractor for a flat monthly rate.", to: "/assistants" as const },
];

function Index() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center md:py-28">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">For founders who didn't study finance</p>
          <h1 className="mt-4 text-4xl leading-tight md:text-6xl">You didn't start a company to spend your weekends decoding a P&amp;L.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Plain English clarity about your numbers. No spreadsheets, no accountant jargon, no homework. Understand your numbers. Run a better business.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11"><Link to="/curriculum">Start the free curriculum <ArrowRight /></Link></Button>
            <Button asChild variant="outline" className="h-11"><Link to="/services">See pricing</Link></Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl md:text-4xl">Sound familiar?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pains.map((p) => (
            <div key={p.q} className="rounded-lg border border-border bg-card p-6">
              <p className="font-display text-2xl text-primary">"{p.q}"</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-lg">You're not bad at numbers. Nobody ever explained them without the jargon. <span className="text-primary">That's what we're here for.</span></p>
      </section>
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl md:text-4xl">Founders who felt the same way</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {stories.map((s) => (
              <figure key={s.name} className="rounded-lg bg-card p-6">
                <figcaption className="flex items-center gap-3 text-sm">
                  <img src={s.photo} alt={s.name} width={816} height={816} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                  <span><span className="block font-semibold">{s.name}</span><span className="text-muted-foreground">{s.role}</span></span>
                </figcaption>
                <blockquote className="mt-4 font-semibold">{s.pain}</blockquote>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.win}</p>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Illustrative founder stories.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl md:text-4xl">Where would you like to start?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {paths.map((p) => (
            <Link key={p.t} to={p.to} className="group rounded-lg border-t-2 border-primary bg-card p-6 transition-shadow hover:shadow-lg">
              <h3 className="text-xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              <p className="mt-4 text-sm font-semibold text-primary">Start here <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" /></p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
