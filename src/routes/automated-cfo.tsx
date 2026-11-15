import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useReducer, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Clock, X } from "lucide-react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { bankLines, cashFloor, cashProjection, demoReducer, initialDemoState, monthlyPrice, systems, type DemoAction, type DemoState } from "@/lib/automated-cfo-demo";

export const Route = createFileRoute("/automated-cfo")({
  head: () => ({ meta: [
    { title: "Automated CFO Live Demo | Day One CFO" },
    { name: "description", content: "Try a six-step month-end close with sample data: connect tools, categorize bank lines, review exceptions, reconcile, and track cash runway." },
    { property: "og:title", content: "Automated CFO Live Demo | Day One CFO" },
    { property: "og:description", content: "See your month-end close, start to finish, with an interactive Automated CFO demo." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AutomatedCfo,
});

const steps = [
  { title: "Connect Shopify, Stripe, your bank and QuickBooks", short: "Connect your tools", subtitle: "Read-only access. Nothing moves without you." },
  { title: "Every bank line categorized automatically", short: "Categorize bank lines", subtitle: "AI suggests a category and says why. Code checks every answer." },
  { title: "A review queue for only what's unclear", short: "Review what's unclear", subtitle: "Fix it once and the agent remembers it next time." },
  { title: "Payouts, sales tax and payroll reconciled to the cent", short: "Reconcile to the cent", subtitle: "Shopify and Stripe to the bank, Shopify to TaxJar, payroll to the bank." },
  { title: "A monthly P&L with plain-English insights", short: "Your monthly P&L", subtitle: "Every number comes from code. AI writes only the words around it." },
  { title: "Cash runway tracking and low-cash alerts", short: "Plan your cash runway", subtitle: "See the next six weeks of cash, and get a heads-up before it runs low." },
];
const panel = "rounded-lg border border-border bg-card p-5 sm:p-6";
const money = (value: number) => value.toLocaleString("en-US", { style: "currency", currency: "USD" });

function Status({ kind = "good", children }: { kind?: "good" | "warning" | "needs"; children?: React.ReactNode }) {
  const Icon = kind === "good" ? Check : kind === "warning" ? Clock : AlertCircle;
  return <span className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-foreground ${kind === "good" ? "bg-chart-1" : kind === "warning" ? "bg-chart-4" : "bg-chart-5"}`}><Icon className="size-3.5 shrink-0" />{children ?? (kind === "good" ? "All good" : kind === "warning" ? "Heads up" : "Needs you")}</span>;
}

function AutomationTags() {
  return <div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-chart-3 px-3 py-1 text-foreground">Written by AI</span><span className="rounded-full border border-border px-3 py-1">Numbers checked by code</span></div>;
}

function CashChart() {
  return <div className={panel}>
    <h3 className="text-lg">Projected cash, next 6 weeks</h3>
    <div className="mt-6 h-64 w-full min-w-0" role="img" aria-label="Projected cash: Oct 31 $42,310.55; Nov 7 $47,120; Nov 14 $8,610, below the $10,000 floor; Nov 21 $19,440; Nov 28 $27,930; Dec 5 $33,210.">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={cashProjection} margin={{ top: 15, right: 18, left: -15, bottom: 5 }} accessibilityLayer>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} interval={0} />
          <YAxis domain={[0, 55000]} ticks={[0, 10000, 30000, 50000]} tickFormatter={value => `$${value / 1000}k`} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip formatter={value => money(Number(value))} />
          <ReferenceLine y={cashFloor} stroke="var(--foreground)" strokeDasharray="5 5" label={{ value: "Floor $10,000", position: "insideTopRight", fill: "var(--foreground)", fontSize: 11 }} />
          <Line type="linear" dataKey="cash" name="Projected cash" stroke="var(--foreground)" strokeWidth={1.5} isAnimationActive={false} dot={props => {
            const { cx, cy, index } = props;
            return <circle key={index} cx={cx} cy={cy} r={index === 2 ? 7 : 4} fill={index === 2 ? "var(--chart-5)" : "var(--background)"} stroke="var(--foreground)" strokeWidth={1.5} />;
          }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>;
}

function StepContent({ step, state, dispatch }: { step: number; state: DemoState; dispatch: React.Dispatch<DemoAction> }) {
  if (step === 0) return <>
    <div className="grid gap-4 sm:grid-cols-2">{systems.map(system => <div key={system.name} className={panel}>
      <div className={`mb-4 flex size-11 items-center justify-center rounded-lg text-sm font-semibold text-foreground ${system.tint}`}>{system.tile}</div>
      <h3 className="text-xl">{system.name}</h3><p className="mb-5 text-sm text-muted-foreground">{system.detail}</p>
      {state.connected.includes(system.name) ? <Status>Connected</Status> : <Button variant="outline" onClick={() => dispatch({ type: "connect", name: system.name })} aria-label={`Connect ${system.name}`}>Connect</Button>}
    </div>)}</div>
    <div aria-live="polite">{state.connected.length === 4 && <p className="mt-5 rounded-lg bg-chart-1 p-4 text-sm text-foreground">October pulled in: 85 bank lines, 60 payouts, 12 payroll rows.</p>}</div>
  </>;
  if (step === 1) return <>
    <p className="mb-4 text-right text-sm text-muted-foreground">85 / 85 categorized · 6 need you</p>
    <div className="overflow-x-auto rounded-lg border border-border bg-card" tabIndex={0} aria-label="Categorized bank lines">
      <table className="w-full min-w-[660px] text-left text-sm"><thead className="border-b border-border bg-muted text-muted-foreground"><tr>{["Date", "Description", "Amount", "Category"].map(label => <th key={label} className={`px-4 py-3 font-medium ${label === "Amount" ? "text-right" : ""}`}>{label}</th>)}</tr></thead>
        <tbody>{bankLines.map(([date, description, amount, category]) => <tr key={description} className="border-b border-border last:border-0"><td className="whitespace-nowrap px-4 py-4 text-muted-foreground">{date}</td><td className="px-4 py-4 text-xs">{description}</td><td className="whitespace-nowrap px-4 py-4 text-right tabular-nums">{amount}</td><td className="px-4 py-4">{category === "Needs you" ? <Status kind="needs" /> : <span className="inline-block rounded-full bg-chart-2 px-3 py-1 text-xs text-foreground">{category}</span>}</td></tr>)}</tbody>
      </table>
    </div>
  </>;
  if (step === 2) return <div className="grid items-start gap-4 xl:grid-cols-[1.6fr_1fr]">
    <div className={panel}>
      <div className="flex flex-wrap justify-between gap-3"><h3 className="text-base">Oct 06 · ACH PMT HOLLIS GROUP</h3><span className="font-medium tabular-nums">−$2,850.00</span></div>
      <span className="mt-5 inline-block rounded-full bg-chart-3 px-3 py-1 text-xs text-foreground">Written by AI</span>
      <p className="mt-3 text-sm text-muted-foreground">Not sure: unknown vendor, 35% confident</p>
      <label htmlFor="review-category" className="mb-2 mt-6 block text-sm font-medium">Category</label>
      <Select value={state.category} onValueChange={value => dispatch({ type: "category", value })} disabled={state.remaining === 0}><SelectTrigger id="review-category"><SelectValue /></SelectTrigger><SelectContent>{["Inventory purchases", "Supplies", "Marketing", "Owner draw", "Personal"].map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent></Select>
      <div className="my-6 flex items-center gap-3"><Switch id="remember-vendor" checked={state.remember} onCheckedChange={value => dispatch({ type: "remember", value })} disabled={state.remaining === 0} /><label htmlFor="remember-vendor" className="text-sm">Remember: HOLLIS GROUP is always inventory</label></div>
      <Button disabled={state.remaining === 0} onClick={() => dispatch({ type: "confirm" })}>Confirm</Button>
    </div>
    <div className={panel}><h3 className="text-lg">Review queue</h3><p className="my-4 font-display text-6xl" aria-live="polite" aria-label={`${state.remaining} items left`}>{state.remaining}</p>{state.remaining > 0 ? <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => dispatch({ type: "clear" })}>Clear the rest</Button> : <Status>all cleared</Status>}</div>
  </div>;
  if (step === 3) return <div className="divide-y divide-border border-y border-border">{[
    { title: "Payouts → bank deposits", detail: "57 of 57 payouts matched to the cent", kind: "good" },
    { title: "Payouts still on their way", detail: "$4,414.73 from Oct 31 sales lands in early November", kind: "warning" },
    { title: "California sales tax", detail: state.taxResolved ? "You picked Shopify. A $50.00 adjustment is drafted." : "Shopify $3,312.25 vs TaxJar $3,262.25: a $50.00 gap", kind: state.taxResolved ? "good" : "needs" },
    { title: "Payroll → bank", detail: "$11,464.73 funded on both pay dates", kind: "good" },
  ].map(row => <div key={row.title} className="flex flex-wrap items-center justify-between gap-4 py-5"><div className="min-w-0 flex-1 basis-60"><h3 className="text-lg">{row.title}</h3><p className="mt-1 text-sm text-muted-foreground">{row.detail}</p></div><div className="flex flex-wrap items-center gap-2"><Status kind={row.kind === "good" ? "good" : row.kind === "warning" ? "warning" : "needs"} />{row.kind === "needs" && <Button variant="outline" size="sm" onClick={() => dispatch({ type: "resolve-tax" })}>Use Shopify's figure</Button>}</div></div>)}</div>;
  if (step === 4) return <div className="grid items-start gap-4 xl:grid-cols-2">
    <div className={panel}><h3 className="text-xl">October P&amp;L</h3><dl className="mt-6 space-y-6"><div><dt className="text-sm text-muted-foreground">Net sales</dt><dd className="mt-1 font-display text-3xl">$81,689.62</dd></div><div className="border-y border-border py-6"><dt className="text-sm text-muted-foreground">Money left after paying for inventory</dt><dd className="mt-1 font-display text-3xl">$58,519.62</dd><dd className="mt-3"><span className="rounded-full bg-chart-1 px-3 py-1 text-xs text-foreground">71.6% of net sales</span></dd></div><div><dt className="text-sm text-muted-foreground">Operating profit</dt><dd className="mt-1 font-display text-3xl">$9,447.72</dd></div></dl></div>
    <div className="space-y-4">{[
      { title: "Card fees take 3.9% of every dollar charged.", detail: "Processing fees were $3,600.33 on $91,943.97 charged.", next: "Next: check whether Afterpay's higher fee pays off." },
      { title: "Shopify and TaxJar disagree on California tax.", detail: "Shopify shows $3,312.25; TaxJar shows $3,262.25.", next: "Next: confirm the figure with your tax preparer." },
    ].map(insight => <div key={insight.title} className={panel}><AutomationTags /><h3 className="mt-4 text-xl">{insight.title}</h3><p className="mt-3 text-sm text-muted-foreground">{insight.detail}</p><p className="mt-4 text-sm">{insight.next}</p></div>)}</div>
  </div>;
  return <>
    <div className="grid items-start gap-4 xl:grid-cols-[0.85fr_1.15fr]"><div className={panel}><dl className="space-y-6"><div><dt className="text-sm text-muted-foreground">Cash on hand today</dt><dd className="mt-1 font-display text-3xl">$42,310.55</dd><dd className="mt-3"><span className="inline-block rounded-full bg-chart-1 px-3 py-1 text-xs text-foreground">Up $7,676.08 in October</span></dd></div><div className="border-t border-border pt-5"><dt className="text-sm text-muted-foreground">Your cash floor</dt><dd className="mt-1 font-display text-2xl">$10,000.00</dd></div><div><dt className="text-sm text-muted-foreground">Lowest point ahead</dt><dd className="mt-1 font-display text-3xl">$8,610.00</dd><dd className="text-sm text-muted-foreground">week of Nov 14</dd></div></dl></div><CashChart /></div>
    <div className="mt-4 flex gap-3 rounded-lg bg-chart-4 p-5 text-foreground"><AlertCircle className="mt-1 size-5 shrink-0" /><div><h3 className="text-lg">Low cash heads-up: week of Nov 14</h3><p className="mt-2 text-sm">The Linen Mill order ($18,400.00) and payroll land the same week, taking cash to $8,610.00, under your $10,000 floor.</p><p className="mt-3 text-sm">Next: move the order to Nov 21, after Shopify payouts land.</p></div></div>
  </>;
}

function Finish() {
  return <div>
    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">DONE FOR THE MONTH</p>
    <h2 className="mt-3 text-3xl sm:text-4xl">October is ready to close.</h2><p className="mt-4 text-muted-foreground">You reviewed 6 lines. Day One CFO did the rest.</p>
    <div className="my-7 flex flex-wrap gap-2">{["4 tools connected", "85 lines categorized", "Everything reconciled", "P&L ready"].map(label => <Status key={label}>{label}</Status>)}</div>
    <div className={panel}><h3 className="text-2xl">Automated CFO · ${monthlyPrice} / month flat</h3><Button asChild className="mt-5"><Link to="/contact">Start with automation</Link></Button></div>
    <div className={`${panel} mt-4`}><h3 className="text-xl">Want a person on it too?</h3><p className="mt-3 text-muted-foreground">Your Dedicated CFO Contractor reviews the close, answers questions and plans ahead with you.</p><Button asChild variant="secondary" className="mt-5 h-auto min-h-9 whitespace-normal text-left"><Link to="/services">Meet your Dedicated CFO Contractor →</Link></Button></div>
  </div>;
}

function AutomatedCfo() {
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  useEffect(() => {
    if (!state.toast) return;
    const timer = window.setTimeout(() => dispatch({ type: "dismiss-toast" }), 4500);
    return () => window.clearTimeout(timer);
  }, [state.toast]);
  const current = steps[step];
  const changeStep = (next: number) => { setStep(next); document.getElementById("demo-content")?.scrollIntoView({ block: "start" }); };
  return <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16 [&_h1]:tracking-normal [&_h2]:tracking-normal [&_h3]:tracking-normal">
    <header className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-wide text-primary">AUTOMATED CFO · LIVE DEMO</p><h1 className="mt-3 text-4xl leading-tight sm:text-5xl">See your month-end close, start to finish.</h1><p className="mt-4 text-muted-foreground">Sample data for Juniper Lane Co., an online store, October 2026.</p></header>
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[215px_minmax(0,1fr)]">
      <aside className="hidden lg:block"><ol className="space-y-3">{steps.map((item, index) => <li key={item.short}><Button variant="ghost" onClick={() => changeStep(index)} aria-current={step === index ? "step" : undefined} className="h-auto w-full justify-start gap-3 whitespace-normal rounded-lg px-2 py-3 text-left"><span className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${step === index ? "border-primary bg-primary text-primary-foreground" : index < step ? "border-chart-1 bg-chart-1 text-foreground" : "border-border text-muted-foreground"}`}>{index < step ? <Check className="size-4" /> : index + 1}</span><span className={step === index ? "text-foreground" : "text-muted-foreground"}>{item.short}</span></Button></li>)}</ol></aside>
      <div id="demo-content" className="min-w-0 scroll-mt-40">
        <div className="mb-6 flex items-center justify-between border-y border-border py-3 text-sm lg:hidden"><span>{current ? `Step ${step + 1} of 6` : "DONE FOR THE MONTH"}</span><span className="text-muted-foreground">{current?.short}</span></div>
        {current ? <><h2 className="text-2xl leading-tight sm:text-3xl">{current.title}</h2><p className="mb-7 mt-3 text-sm text-muted-foreground">{current.subtitle}</p><StepContent step={step} state={state} dispatch={dispatch} /></> : <Finish />}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-5"><Button variant="outline" disabled={step === 0} onClick={() => changeStep(step - 1)}><ArrowLeft />Back</Button>{current && <Button onClick={() => changeStep(step + 1)}>Next<ArrowRight /></Button>}</div>
      </div>
    </div>
    <p className="mt-12 text-xs text-muted-foreground">Sample data. Guidance only, not accounting or tax advice.</p>
    {state.toast && <div role="status" className="fixed inset-x-5 bottom-5 z-40 mx-auto flex max-w-md items-center justify-between gap-3 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground">{state.toast}<Button variant="ghost" size="icon" aria-label="Dismiss notification" onClick={() => dispatch({ type: "dismiss-toast" })} className="shrink-0 hover:bg-primary-foreground/10 hover:text-primary-foreground"><X /></Button></div>}
  </section>;
}