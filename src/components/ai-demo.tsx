import { useState } from "react";
import { Sparkles } from "lucide-react";

const samples = {
  "Why was my profit lower in March?":
    "Sales rose 8%, but your cost of goods jumped 19% — mostly from a rush restock of candles at a higher wholesale price. Tip: reorder 3 weeks earlier to keep your margin near 52%.",
  "Can I afford a part-time hire?":
    "Yes, likely. Your average monthly cash cushion is $6,400 after bills. A 15 hr/week hire (~$1,300/mo) still leaves 2.4 months of runway. Best start: before your holiday rush in October.",
  "What should I automate first?":
    "Start with receipt capture and sales syncing from your POS. That covers about 70% of your weekly bookkeeping time — roughly 4 hours back every week.",
};

export function AiDemo() {
  const keys = Object.keys(samples) as (keyof typeof samples)[];
  const [q, setQ] = useState<keyof typeof samples>(keys[0]!);
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--primary)_45%,transparent)] md:p-7">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Sparkles className="h-4 w-4" /> Try Bloom AI — sample boutique data
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => setQ(k)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              q === k ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-secondary px-4 py-2.5 text-sm text-secondary-foreground">{q}</p>
        <p key={q} className="max-w-[92%] animate-in fade-in slide-in-from-bottom-2 rounded-2xl rounded-bl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
          {samples[q]}
        </p>
      </div>
    </div>
  );
}
