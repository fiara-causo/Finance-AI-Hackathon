import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Contractor login | Bloom Ledger" },
      { name: "description", content: "Sign in to the Bloom Ledger contractor workspace demo." },
      { property: "og:title", content: "Contractor login | Bloom Ledger" },
      { property: "og:description", content: "Demo workspace for Bloom Ledger CFO contractors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto flex max-w-md flex-col px-5 py-20">
      <Lock className="h-8 w-8 text-primary" />
      <h1 className="mt-4 text-3xl">Contractor login</h1>
      <p className="mt-2 text-sm text-muted-foreground">Demo credentials are filled in for presentations.</p>
      <form className="mt-8 space-y-4 rounded-lg border border-border bg-card p-6" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/portal" }); }}>
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" defaultValue="demo@bloomledger.com" /></div>
        <div className="space-y-2"><Label htmlFor="pw">Password</Label><Input id="pw" type="password" defaultValue="demo-password" /></div>
        <Button type="submit" className="h-11 w-full">Sign in to demo workspace</Button>
      </form>
    </section>
  );
}
