import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/curriculum")({
  head: () => ({
    meta: [
      { title: "Founder Finance Playbook | Day One CFO" },
      { name: "description", content: "A free four module curriculum that teaches founders to read their numbers in plain English." },
      { property: "og:title", content: "Founder Finance Playbook | Day One CFO" },
      { property: "og:description", content: "Learn the 15 numbers every founder needs, accrual accounting, your P&L and your own books." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Curriculum,
});

const modules = [
  { n: "Module 1 · Start here", t: "Explain it like I'm 12", d: "Run a tiny cookie shop. Learn the 15 numbers every founder needs.", meta: "Cookie shop · 15 rounds · free cheat sheet", rows: [["Cookie sales", "$100"], ["Making costs", "$40"], ["Gross profit", "$60"]] },
  { n: "Module 2", t: "Accrual accounting", d: "Sales are booming. So where's the money? Signed, earned and paid are three different days.", meta: "The situation room · 5 chapters", rows: [["Signed", "Jan"], ["Earned", "Feb"], ["Paid", "Mar"]] },
  { n: "Module 3", t: "The step by step P&L", d: "From sale to bottom line, one line at a time.", meta: "The situation room · 8 steps", rows: [["Revenue", "$112K"], ["Gross profit", "$82K"], ["Net income", "$22K"]] },
  { n: "Module 4", t: "Read your own books", d: "Know enough to read your books and ask your bookkeeper smart questions.", meta: "QuickBooks · 4 essential reports", rows: [["P&L", "Monthly"], ["Balance sheet", "Monthly"], ["Cash flow", "Weekly"]] },
];

function Curriculum() {
  const [done, setDone] = useState(false);
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-wide text-primary">The founder's curriculum</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Founder Finance Playbook</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">Four short modules. Plain English. Built for founders who never studied finance.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {modules.map((m) => (
          <article key={m.t} className="flex flex-col rounded-lg border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase text-primary">{m.n}</p>
            <h2 className="mt-2 text-2xl">{m.t}</h2>
            <p className="mt-2 text-muted-foreground">{m.d}</p>
            <dl className="mt-5 divide-y divide-border rounded-md border border-border text-sm">
              {m.rows.map(([k, v]) => <div key={k} className="flex justify-between px-4 py-2"><dt>{k}</dt><dd className="font-semibold">{v}</dd></div>)}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">{m.meta}</p>
            <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold"><BookOpen className="h-3 w-3" /> Coming soon</span>
          </article>
        ))}
      </div>
      <div className="mt-12 rounded-lg bg-ink p-8 text-background md:p-10">
        <h2 className="text-3xl">Get the playbook and cheat sheet</h2>
        <p className="mt-2 opacity-80">Be first in line when modules open.</p>
        {done ? (
          <p className="mt-6 flex items-center gap-2 font-semibold"><CheckCircle2 className="h-5 w-5 text-primary" /> Thanks! You're on the list.</p>
        ) : (
          <form className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <Input required type="email" placeholder="you@business.com" aria-label="Email" className="h-11 bg-background text-foreground" />
            <Button type="submit" className="h-11">Send it to me</Button>
          </form>
        )}
      </div>
    </section>
  );
}
