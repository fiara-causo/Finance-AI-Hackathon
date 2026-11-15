import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a chat | Day One CFO" },
      { name: "description", content: "Tell us about your business and we'll show you how Day One CFO can help." },
      { property: "og:title", content: "Contact Day One CFO" },
      { property: "og:description", content: "Book a chat about financial automation for your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

// Hardcoded time slots for the MVP. Nothing is saved on the site. When BOOKING_URL is set, the request
// is also texted to the team through Linq by the book-chat function (supabase/functions/book-chat).
// Leave it null to keep the form presentation only.
const BOOKING_URL: string | null = null;
const days = ["Monday", "Tuesday", "Wednesday"] as const;
const times = ["10:00 AM", "1:00 PM", "3:30 PM"] as const;

function Contact() {
  const [sent, setSent] = useState(false);
  const [slot, setSlot] = useState<{ day: string; time: string } | null>(null);
  return (
    <section className="mx-auto max-w-xl px-5 py-16">
      <h1 className="text-4xl md:text-5xl">Let's talk about your business.</h1>
      {sent ? (
        <div className="mt-8 rounded-2xl bg-accent p-6 text-accent-foreground">
          <p className="font-semibold">Thank you! We'll be in touch soon.</p>
          {slot && <p className="mt-2 text-sm">You asked for {slot.day} at {slot.time}. We'll confirm that time or suggest a close one.</p>}
        </div>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={(e) => {
          e.preventDefault();
          if (BOOKING_URL && slot) {
            const f = new FormData(e.currentTarget);
            // Fire and forget: the visitor sees the confirmation either way.
            fetch(BOOKING_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...slot, name: f.get("name"), email: f.get("email"), business: f.get("business"), note: f.get("note") }) }).catch(() => {});
          }
          setSent(true);
        }}>
          <fieldset>
            <legend className="text-sm font-semibold">Pick a time for a 30 minute chat</legend>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {days.map((d) => (
                <div key={d} className="space-y-2">
                  <p className="text-center text-sm text-muted-foreground">{d}</p>
                  {times.map((t) => {
                    const on = slot?.day === d && slot.time === t;
                    return (
                      <button key={t} type="button" aria-pressed={on} onClick={() => setSlot({ day: d, time: t })}
                        className={`w-full rounded-xl border px-2 py-2.5 text-sm transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-primary"}`}>
                        {t}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            {slot && <p className="mt-3 text-sm">Selected: {slot.day} at {slot.time}</p>}
          </fieldset>
          {([["name", "Your name"], ["email", "Email"], ["business", "Business name"]] as const).map(([k, l]) => (
            <input key={k} name={k} required placeholder={l} type={k === "email" ? "email" : "text"} className="w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:border-primary" />
          ))}
          <textarea name="note" placeholder="What would you love help with?" rows={4} className="w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:border-primary" />
          <Button type="submit" className="h-11" disabled={!slot}>{slot ? "Request this time" : "Pick a time first"}</Button>
        </form>
      )}
    </section>
  );
}
