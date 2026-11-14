import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, FileText, Flag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import demo from "@/data/product-demo.json";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "See it work | Bloom Ledger" },
      {
        name: "description",
        content:
          "Drop in a bank statement and see checked numbers, sources for every line and a profit and loss in minutes.",
      },
      { property: "og:title", content: "See it work | Bloom Ledger" },
      {
        property: "og:description",
        content: "From a bank statement to checked numbers, with a source for every line.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Product,
});

type Row = (typeof demo.rows)[number];
const money = (n: number) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const clean = (c: string) =>
  c.replace(" (reconcile only)", "").replace(" (exclude)", "").replace(" (flag)", "");
const BATCH = 5;

function Product() {
  const total = demo.rows.length;
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const done = shown >= total;

  useEffect(() => {
    if (!started || done) return;
    const t = setTimeout(() => setShown((s) => Math.min(total, s + BATCH)), 90);
    return () => clearTimeout(t);
  }, [started, shown, done, total]);

  const rows: Row[] = useMemo(() => demo.rows.slice(0, shown), [shown]);
  const reviewCount = demo.rows.filter((r) => r.needsReview).length;
  const s = demo.statement;
  const net = s.closing - s.opening;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-semibold text-primary">See it work</p>
      <h1 className="mt-3 text-xl leading-snug md:text-3xl">
        Drop in a statement. Get numbers you can check.
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        This is a preview with sample data from a made up online shop for October 2026. Nothing here
        is a real customer record.
      </p>

      <div className="mt-10 rounded-lg border border-border bg-card p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-primary" />
            <div>
              <p className="font-semibold">{s.fileName}</p>
              <p className="text-sm text-muted-foreground">
                {s.institution}, account ending {s.accountLast4}, {s.pages} pages
              </p>
            </div>
          </div>
          <Button onClick={() => setStarted(true)} disabled={started} aria-live="polite">
            {!started ? (
              "Read my statement"
            ) : done ? (
              "Statement read"
            ) : (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reading
              </>
            )}
          </Button>
        </div>
        {started && (
          <div className="mt-5" aria-label="Progress">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(shown / total) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {shown} of {total} transactions found
            </p>
          </div>
        )}
      </div>

      {started && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-lg font-semibold">Transactions</h2>
              {done && reviewCount > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Flag className="h-3 w-3" />
                  {reviewCount} to review
                </Badge>
              )}
            </div>
            <div className="max-h-[28rem] overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card text-left text-xs text-muted-foreground">
                  <tr>
                    <th className="px-5 py-2 font-medium">Date</th>
                    <th className="px-2 py-2 font-medium">Description</th>
                    <th className="px-2 py-2 font-medium">Category</th>
                    <th className="px-2 py-2 text-right font-medium">Amount</th>
                    <th className="px-5 py-2 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-border/60">
                      <td className="whitespace-nowrap px-5 py-2 text-muted-foreground">
                        {r.date.slice(5)}
                      </td>
                      <td className="px-2 py-2">{r.description}</td>
                      <td className="px-2 py-2">
                        {r.needsReview ? (
                          <span className="font-medium text-primary">
                            {clean(r.category)}, check this
                          </span>
                        ) : (
                          <span className="text-muted-foreground">{clean(r.category)}</span>
                        )}
                      </td>
                      <td
                        className={`whitespace-nowrap px-2 py-2 text-right tabular-nums ${r.amount < 0 ? "" : "text-primary"}`}
                      >
                        {money(r.amount)}
                      </td>
                      <td
                        className="whitespace-nowrap px-5 py-2 text-xs text-muted-foreground"
                        title={`Page ${r.source.slice(1).split("-")[0]}, row ${r.source.split("-r")[1]} of your statement`}
                      >
                        {r.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Do the numbers add up?</h2>
              {!done ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Checking once every line is read.
                </p>
              ) : (
                <>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Starting balance {money(s.opening)}, plus every line we read ({money(net)}),
                    gives {money(s.closing)}. That matches the closing balance printed on your
                    statement.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {[
                      "Balance adds up to the penny",
                      "Deposits match the statement total",
                      "Withdrawals match the statement total",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    Every line shows where it came from on your statement, so you can check any
                    number yourself.
                  </p>
                </>
              )}
            </div>

            {done && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-semibold">October profit and loss</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Built from the bank statement plus the shop's sales, payout and payroll files.
                </p>
                <dl className="mt-4 space-y-1.5 text-sm">
                  {demo.pnl.map((l) => {
                    const total = l.kind.includes("total");
                    return (
                      <div
                        key={l.label}
                        className={`flex justify-between gap-4 ${total ? "border-t border-border pt-2 font-semibold" : ""}`}
                      >
                        <dt>
                          {l.label}
                          {l.kind.includes("est") ? " (estimate)" : ""}
                        </dt>
                        <dd className="whitespace-nowrap tabular-nums">{money(l.amount)}</dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Estimate: inventory purchases stand in for the cost of goods, because there is no
                  month end inventory count.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Want a consultant to look over your numbers? Book a chat and we will walk through your own
          statements.
        </p>
        <Button asChild>
          <Link to="/contact">Book a chat</Link>
        </Button>
      </div>
    </section>
  );
}
