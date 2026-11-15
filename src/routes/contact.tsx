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

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-xl px-5 py-16">
      <h1 className="text-4xl md:text-5xl">Let's talk about your business.</h1>
      {sent ? (
        <p className="mt-8 rounded-2xl bg-accent p-6 text-accent-foreground">Thank you! We'll be in touch soon.</p>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {["Your name", "Email", "Business name"].map((l) => (
            <input key={l} required placeholder={l} type={l === "Email" ? "email" : "text"} className="w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:border-primary" />
          ))}
          <textarea placeholder="What would you love help with?" rows={4} className="w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:border-primary" />
          <Button type="submit" className="h-11">Send</Button>
        </form>
      )}
    </section>
  );
}
