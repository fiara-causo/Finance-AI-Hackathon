import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, FileText, Plug } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Contractor workspace demo | Bloom Ledger" },
      { name: "description", content: "Demo of the Bloom Ledger contractor workspace: connected systems, documents and the month end close." },
      { property: "og:title", content: "Contractor workspace | Bloom Ledger" },
      { property: "og:description", content: "See connected systems, uploaded documents and a six step month end close." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Portal,
});

const steps = ["Upload exports", "Automation categorizes", "You review", "Code reconciles", "P&L + insights", "Close"];
const systems = [
  { n: "Shopify", s: "Connected", d: "Orders, refunds, payouts" }, { n: "Stripe", s: "Connected", d: "Card payouts and fees" },
  { n: "Chase Business", s: "Connected", d: "Bank feed" }, { n: "QuickBooks Online", s: "Connected", d: "General ledger" },
  { n: "Gusto", s: "Connected", d: "Payroll register" }, { n: "TaxJar", s: "Connected", d: "Sales tax filings" },
  { n: "Amazon Seller", s: "Available", d: "Marketplace settlements" }, { n: "PayPal", s: "Available", d: "Payouts" },
  { n: "Xero", s: "Available", d: "General ledger" },
];
const docs = [
  ["chase_oct_2026_statement.csv", "Bank statement", "85 lines"], ["shopify_payouts_oct.csv", "Processor export", "57 payouts"],
  ["stripe_balance_oct.csv", "Processor export", "112 lines"], ["gusto_payroll_register_oct.pdf", "Payroll", "2 pay dates"],
  ["taxjar_ca_oct.csv", "Sales tax", "1 state"], ["sba_loan_schedule.pdf", "Loan", "Amortization"],
];
const lines = [["Oct 02", "SHOPIFY PAYMENTS PAYOUT SP-1001", "+1,281.04", "Sales deposits", 98], ["Oct 05", "SBA LOAN PMT", "-1,412.66", "Loan payment", 96], ["Oct 06", "ACH PMT HOLLIS GROUP", "-2,850.00", "Uncategorized", 35], ["Oct 09", "NETFLIX.COM", "-22.99", "Personal, flag", 71], ["Oct 12", "PAYMENT TO LINEN MILL CO", "-18,400.00", "Inventory purchases", 94]] as const;
const recs = [["Processor payouts → bank deposits", "57 of 57 paid payouts matched to the cent", "PASS"], ["Payouts still in transit at month end", "$4,414.73 from Oct 31 sales, due in early November", "WARN"], ["California sales tax", "Owner picked Shopify; the $50.00 adjustment is drafted", "FIXED"], ["Payroll register → bank", "$11,464.73 funded on both pay dates", "PASS"]] as const;
const pl = [["Revenue", "$112,400"], ["Cost of goods sold", "($30,100)"], ["Gross profit", "$82,300"], ["Operating expenses", "($60,300)"], ["Net income", "$22,000"]];
const checks = ["Every line categorized", "Review queue cleared", "Payouts add up", "Sales tie by gateway", "Refunds tie", "Deposits matched", "Sales tax agrees"];

type View = "systems" | "docs" | number;

function Portal() {
  const [view, setView] = useState<View>(0);
  const [remember, setRemember] = useState(true);
  const [queue, setQueue] = useState(4);
  const stepIdx = typeof view === "number" ? view : -1;
  const badge = (s: string) => s === "WARN" ? "bg-gold text-ink" : "bg-primary text-primary-foreground";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      <aside className="bg-ink p-6 text-background md:w-72 md:shrink-0">
        <p className="font-display text-xl">Finance contractor</p>
        <p className="text-sm opacity-60">Juniper Lane Co. · October 2026</p>
        <div className="mt-5 space-y-1 border-t border-background/15 pt-4">
          {([["systems", "Connected systems", Plug], ["docs", "Documents", FileText]] as const).map(([k, l, I]) => (
            <button key={k} onClick={() => setView(k)} className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${view === k ? "bg-background/10" : "opacity-70"}`}><I className="h-4 w-4" />{l}</button>
          ))}
        </div>
        <p className="mt-5 text-xs uppercase opacity-50">Month end close</p>
        <ol className="mt-2 space-y-1">
          {steps.map((s, i) => (
            <li key={s}><button onClick={() => setView(i)} className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${stepIdx === i ? "bg-background/10 font-semibold" : "opacity-70"}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${i < stepIdx ? "bg-primary" : stepIdx === i ? "bg-background text-ink" : "border border-background/40"}`}>{i < stepIdx ? <Check className="h-3 w-3" /> : i + 1}</span>{s}
            </button></li>
          ))}
        </ol>
        <div className="mt-6 space-y-1 text-xs opacity-70"><p className="font-semibold">Who does what</p><p>Code: every number</p><p>Automation: labels and words</p><p>Owner: final say</p></div>
        <Link to="/" className="mt-6 block text-xs underline opacity-60">Sign out</Link>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        {view === "systems" && (<><Head k="Workspace" t="Connected systems" s="Everything this client's books pull from" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{systems.map((x) => (
            <div key={x.n} className="rounded-lg border border-border bg-card p-5"><div className="flex items-center justify-between"><p className="font-semibold">{x.n}</p><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${x.s === "Connected" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{x.s}</span></div><p className="mt-1 text-sm text-muted-foreground">{x.d}</p>{x.s !== "Connected" && <Button size="sm" variant="outline" className="mt-3">Connect</Button>}</div>
          ))}</div></>)}
        {view === "docs" && (<><Head k="Workspace" t="Uploaded documents" s="Exports and statements for October 2026" />
          <div className="divide-y divide-border rounded-lg border border-border bg-card">{docs.map(([n, t, m]) => (
            <div key={n} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4"><span className="flex items-center gap-3"><FileText className="h-4 w-4 text-primary" /><span className="font-medium">{n}</span></span><span className="text-sm text-muted-foreground">{t} · {m}</span></div>
          ))}</div></>)}
        {view === 0 && (<><Head k="Step 1" t="Upload exports" s="Six files received from connected systems" />
          <div className="grid gap-3 sm:grid-cols-2">{docs.map(([n, t]) => <div key={n} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"><Check className="h-5 w-5 text-primary" /><div><p className="text-sm font-medium">{n}</p><p className="text-xs text-muted-foreground">{t}</p></div></div>)}</div></>)}
        {view === 1 && (<><Head k="Step 2" t="Automation labels every bank line" s="Picks a category and says why; code checks each answer" />
          <div className="overflow-x-auto rounded-lg border border-border bg-card"><table className="w-full text-sm"><tbody className="divide-y divide-border">{lines.map(([d, n, a, c, p]) => (
            <tr key={n}><td className="px-4 py-3 text-muted-foreground">{d}</td><td className="px-4 py-3 font-medium">{n}</td><td className="px-4 py-3 text-right">{a}</td><td className="px-4 py-3">{c}</td><td className={`px-4 py-3 text-right font-semibold ${p < 50 ? "text-gold" : "text-primary"}`}>{p}%</td></tr>
          ))}</tbody></table></div></>)}
        {view === 2 && (<><Head k="Step 3" t="You review only what's unclear" s="Fix it once and the agent remembers it next time" />
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex flex-wrap justify-between gap-2 text-lg font-semibold"><span>Oct 06 · ACH PMT HOLLIS GROUP</span><span>-$2,850.00</span></div>
              <p className="mt-2 text-sm text-muted-foreground">Uncategorized · 35% sure · "Unknown vendor ACH payment"</p>
              <p className="mt-5 text-sm">Category</p><div className="mt-1 rounded-md border border-primary px-4 py-3 font-medium">Inventory purchases</div>
              <label className="mt-5 flex items-center gap-3 text-sm"><Switch checked={remember} onCheckedChange={setRemember} />Remember: HOLLIS GROUP is always Inventory purchases</label>
              <Button className="mt-5" onClick={() => setQueue((q) => Math.max(0, q - 1))} disabled={queue === 0}>Approve</Button>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center"><p className="text-muted-foreground">Review queue</p><p className="font-display text-7xl text-gold">{queue}</p><p>items left</p><p className="text-sm text-muted-foreground">of 85 lines</p></div>
          </div></>)}
        {view === 3 && (<><Head k="Step 4" t="Code ties out every dollar" s="Payouts to bank, Shopify to TaxJar, payroll register to bank" />
          <div className="space-y-3">{recs.map(([t, d, s]) => (
            <div key={t} className={`flex items-center justify-between gap-4 rounded-lg border border-l-4 border-border bg-card p-5 ${s === "WARN" ? "border-l-gold" : "border-l-primary"}`}><div><p className="font-semibold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${badge(s)}`}>{s}</span></div>
          ))}</div></>)}
        {view === 4 && (<><Head k="Step 5" t="P&L and insights" s="Every number from code, explained in plain English" />
          <div className="grid gap-4 lg:grid-cols-2">
            <dl className="divide-y divide-border rounded-lg border border-border bg-card">{pl.map(([k, v]) => <div key={k} className="flex justify-between px-5 py-3"><dt>{k}</dt><dd className="font-semibold">{v}</dd></div>)}</dl>
            <div className="space-y-3 text-sm">{["Gross margin held at 73%, up 2 points on lower shipping costs.", "Cash is $4,414.73 lower than profit because October 31 payouts land in November.", "Inventory spend of $18,400 was 16% of revenue; plan for it before holiday restocks."].map((x) => <p key={x} className="rounded-lg bg-secondary p-4">{x}</p>)}</div>
          </div></>)}
        {view === 5 && (<><Head k="Step 6" t="Ready to close" s="A checklist, suggested entries, exports, and a human one click away" />
          <div className="rounded-lg bg-ink p-5 text-lg font-semibold text-background">Ready to close · 1 warning (payouts in transit)</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{checks.map((c) => <p key={c} className="flex items-center gap-2"><span className={`grid h-6 w-6 place-items-center rounded-full ${c === "Deposits matched" ? "bg-gold" : "bg-primary"} text-primary-foreground`}><Check className="h-3 w-3" /></span>{c}</p>)}</div>
          <Button className="mt-6">Owner sign off</Button></>)}
        {typeof view === "number" && view < 5 && <Button variant="outline" className="mt-8" onClick={() => setView(view + 1)}>Next step</Button>}
      </main>
    </div>
  );
}

function Head({ k, t, s }: { k: string; t: string; s: string }) {
  return <div className="mb-6"><p className="text-xs font-bold uppercase text-primary">{k}</p><h1 className="mt-1 text-3xl md:text-4xl">{t}</h1><p className="mt-2 text-muted-foreground">{s}</p></div>;
}
