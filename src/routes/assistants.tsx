import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, MapPin, SlidersHorizontal } from "lucide-react";
import { ConsultantPhoto } from "@/components/consultant-photo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { findConsultants, serviceLabels, type Consultant } from "@/lib/consultant-matching";

export const Route = createFileRoute("/assistants")({
  head: () => ({
    meta: [
      { title: "Meet the Consultants | Bloom Ledger" },
      { name: "description", content: "Fractional financial assistants with enterprise experience and automation tools, matched to your small retail business." },
      { property: "og:title", content: "Meet the Consultants | Bloom Ledger" },
      { property: "og:description", content: "Experienced consultants and financial automation for small retail." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Assistants,
});

function ServiceChip({ service }: { service: string }) {
  return <span className="rounded-md bg-secondary px-2.5 py-1 text-xs leading-relaxed text-secondary-foreground">{serviceLabels[service]}</span>;
}

function ConsultantProfile({ consultant, need }: { consultant: Consultant; need: string }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <ConsultantPhoto consultant={consultant} large />
        <div className="min-w-0">
          <DialogTitle className="font-display text-3xl leading-tight tracking-normal">{consultant.name}{consultant.credential && <span className="text-lg">, {consultant.credential}</span>}</DialogTitle>
          <DialogDescription className="mt-3 leading-relaxed">{consultant.headline}</DialogDescription>
          <p className="mt-2 text-sm leading-relaxed text-primary">{consultant.companies.join(" • ")}</p>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{consultant.location}</p>
          <Button asChild variant="link" className="mt-2 h-auto px-0">
            <a href={consultant.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight /></a>
          </Button>
        </div>
      </div>
      <p className="leading-relaxed text-muted-foreground">{consultant.bio}</p>
      <div>
        <h2 className="text-2xl">Services</h2>
        <div className="mt-3 flex flex-wrap gap-2">{consultant.services.map((service) => <ServiceChip key={service} service={service} />)}</div>
        <p className="mt-3 text-sm capitalize text-muted-foreground">{consultant.industries.join(" · ")}</p>
      </div>
      <div>
        <h2 className="text-2xl">Experience</h2>
        <ul className="mt-3 space-y-3">
          {consultant.experience.map((experience) => <li key={experience} className="flex gap-2 text-sm leading-relaxed"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{experience}</li>)}
        </ul>
      </div>
      <div className="border-t border-border pt-5">
        <h2 className="text-2xl">Book an intro chat</h2>
        {sent ? (
          <div role="status" className="mt-4 rounded-lg bg-accent p-5 text-accent-foreground">
            <p className="font-semibold">Thank you! Lovely to meet you.</p>
            <p className="mt-2 text-sm">This preview hasn’t sent or saved your details, and no chat has been booked. You can connect with {consultant.name.split(" ")[0]} on LinkedIn.</p>
          </div>
        ) : (
          <form className="mt-4 space-y-4" onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); setSent(true); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="intro-name" className="text-sm font-medium">Name</label><Input id="intro-name" name="name" autoComplete="name" required className="mt-1 h-11 bg-card" /></div>
              <div><label htmlFor="intro-email" className="text-sm font-medium">Email</label><Input id="intro-email" name="email" type="email" autoComplete="email" required className="mt-1 h-11 bg-card" /></div>
            </div>
            <div><label htmlFor="intro-need" className="text-sm font-medium">What do you need help with?</label><Textarea id="intro-need" name="need" required rows={3} defaultValue={need === "all" ? "" : serviceLabels[need]} className="mt-1 bg-card" /></div>
            <p className="text-xs text-muted-foreground">Preview only. Nothing is sent, saved, or booked.</p>
            <Button type="submit" className="h-11">Request an intro chat <ArrowUpRight /></Button>
          </form>
        )}
      </div>
    </>
  );
}

function Assistants() {
  const [need, setNeed] = useState("all");
  const [filters, setFilters] = useState<string[]>([]);
  const [selected, setSelected] = useState<Consultant | null>(null);
  const results = findConsultants(need, filters);
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-8 md:py-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">Meet the Consultants</p>
          <h1 className="mt-3 text-4xl leading-tight tracking-normal md:text-5xl">Meet your <em className="text-primary">finance team.</em></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Meet four consultants bringing finance, strategy, and technology experience to your next business decision.</p>
        </div>
        <details className="mt-6 border-y border-border py-4">
          <summary className="cursor-pointer text-sm font-semibold text-primary">Find my match · Filter by service</summary>
          <div className="pt-4">
          <h2 className="text-2xl">Find my match</h2>
          <label htmlFor="match-need" className="mt-3 block text-sm font-medium">What do you need help with?</label>
          <Select value={need} onValueChange={setNeed}>
            <SelectTrigger id="match-need" className="mt-2 h-auto min-h-12 w-full max-w-xl bg-card text-left [&>span]:line-clamp-none [&>span]:whitespace-normal"><SelectValue /></SelectTrigger>
            <SelectContent className="max-w-[calc(100vw-2.5rem)]">
              <SelectItem value="all">All services</SelectItem>
              {Object.entries(serviceLabels).map(([service, label]) => <SelectItem key={service} value={service} className="whitespace-normal">{label}</SelectItem>)}
            </SelectContent>
          </Select>
          <p className="mt-5 flex items-center gap-2 text-sm font-medium"><SlidersHorizontal className="h-4 w-4 text-primary" />Filter by service</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Service filters">
            {Object.entries(serviceLabels).map(([service, label]) => (
              <Button key={service} variant={filters.includes(service) ? "secondary" : "outline"} aria-pressed={filters.includes(service)} className="h-auto min-h-9 max-w-full whitespace-normal px-3 py-2 text-left text-xs" onClick={() => setFilters((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service])}>
                {filters.includes(service) && <Check />}{label}
              </Button>
            ))}
          </div>
          </div>
        </details>
        <div className="my-5 flex min-h-9 items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-muted-foreground">{results.length} {results.length === 1 ? "consultant" : "consultants"}{need !== "all" || filters.length ? " matched" : ""}</p>
          {(need !== "all" || filters.length > 0) && <Button variant="ghost" size="sm" onClick={() => { setNeed("all"); setFilters([]); }}>Clear filters</Button>}
        </div>
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map(({ consultant, reason }) => (
            <article key={consultant.slug} aria-label={consultant.name} className="flex min-w-0 cursor-pointer flex-col rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/60" onClick={() => setSelected(consultant)}>
              <div>
                <ConsultantPhoto consultant={consultant} portrait />
                <div className="mt-4 min-w-0"><h2 className="text-xl leading-tight tracking-normal">{consultant.name}{consultant.credential && <span className="text-sm">, {consultant.credential}</span>}</h2><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3 shrink-0" />{consultant.location}</p></div>
              </div>
              <p className="mt-5 text-sm font-semibold leading-relaxed text-foreground">{consultant.headline}</p>
              <p className="mt-2 text-xs leading-relaxed text-primary">{consultant.companies.join(" • ")}</p>
              {reason && <p className="mt-3 text-sm font-medium leading-relaxed text-primary">{reason}</p>}
              <div className="mt-4 flex flex-wrap gap-2">{[...consultant.services].sort((a, b) => Number(b === need || filters.includes(b)) - Number(a === need || filters.includes(a))).slice(0, 3).map((service) => <ServiceChip key={service} service={service} />)}</div>
              <div className="mt-auto pt-6"><Button variant="outline" className="w-full" aria-label={`View profile of ${consultant.name}`} onClick={(event) => { event.stopPropagation(); setSelected(consultant); }}>View profile <ArrowUpRight /></Button></div>
            </article>
          ))}
        </div>
        {results.length === 0 && <div className="py-12 text-center"><h2 className="text-2xl">No matches just yet.</h2><p className="mt-2 text-muted-foreground">Try another service or clear your filters.</p><Button variant="outline" className="mt-5" onClick={() => { setNeed("all"); setFilters([]); }}>Show all consultants</Button></div>}
      </section>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl gap-6 overflow-y-auto rounded-lg p-6 sm:p-8">
          {selected && <ConsultantProfile key={selected.slug} consultant={selected} need={need} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
