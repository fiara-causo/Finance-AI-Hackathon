import { createFileRoute, Link } from "@tanstack/react-router";
import { Receipt, LineChart, BellRing, MessageCircleHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Financial Automation Services | Bloom Ledger" },
      { name: "description", content: "Explore receipt automation, financial reporting, cash flow monitoring, budgeting and finance systems support for your business." },
      { property: "og:title", content: "Financial Automation Services | Bloom Ledger" },
      { property: "og:description", content: "Practical automation and experienced consultants for your business finances." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const items = [
  { icon: Receipt, t: "Receipts & expense workflows", d: "Spend less time entering receipts and sorting expenses.", examples: ["Capture vendor, date and amount from receipts for review.", "Suggest expense categories and flag possible duplicates.", "Organize records for your accountant and monthly close."], example: "A stock delivery receipt becomes an expense record ready for your approval." },
  { icon: LineChart, t: "Statements & reporting", d: "Understand what changed in your finances and where to focus.", examples: ["Compare sales, expenses and profit against your budget.", "Bring your profit and loss, balance sheet and cash flow into one reporting view.", "Summarize changes in margins, costs and cash in plain English."], example: "Find out whether lower profit came from discounts, supplier costs or payroll." },
  { icon: BellRing, t: "Cash flow & alerts", d: "Plan for bills, inventory purchases and quieter months.", examples: ["Build a cash forecast from expected collections and upcoming payments.", "Set alerts for low cash balances and overdue invoices.", "Compare the cash impact of a new hire, loan or inventory order."], example: "Check whether a seasonal inventory purchase leaves enough cash for rent and payroll." },
  { icon: MessageCircleHeart, t: "Questions & decision support", d: "Turn a business question into a financial comparison you can act on.", examples: ["Compare hiring, pricing or expansion scenarios.", "Identify the biggest drivers of a change in profit.", "Review the assumptions with a consultant before making a decision."], example: "Compare the cost of adding a part time employee with your expected monthly cash balance." },
];

const advisory = [
  { title: "Budgets & forecasts", example: "Build a monthly sales and expense plan, then update it as actual results come in." },
  { title: "Finance systems & connections", example: "Map how sales, invoicing and accounting data move between systems, and reduce repeated manual entry." },
  { title: "Funding & transaction readiness", example: "Organize financial reports, cash forecasts and supporting schedules for a lender, investor or potential buyer." },
  { title: "Accounting & controls", example: "Review revenue accounting, approval workflows and reconciliation steps with an experienced finance consultant." },
];

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-semibold text-primary">What Are We?</p>
      <h1 className="mt-3 text-2xl leading-snug md:text-3xl">Automation for clearer business finances.</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">We combine financial automation with consulting experience to help you organize your numbers, improve reporting and plan your next move.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {items.map(({ icon: Icon, t, d, examples, example }) => (
          <div key={t} className="rounded-lg border border-border bg-card p-6 md:p-7">
            <Icon className="h-7 w-7 text-primary" />
            <h2 className="mt-4 text-2xl">{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{examples.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed"><span className="font-semibold text-primary">For example: </span>{example}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 border-t border-border pt-8">
        <h2 className="text-3xl">Consulting for the bigger decisions</h2>
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">{advisory.map(({ title, example }) => <div key={title}><h3 className="text-xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{example}</p></div>)}</div>
        <p className="mt-8 text-sm text-muted-foreground">We’ll agree on the scope and the systems involved before starting any work.</p>
      </div>
      <Button asChild className="mt-6 h-11"><Link to="/contact">Book a chat</Link></Button>
    </section>
  );
}
