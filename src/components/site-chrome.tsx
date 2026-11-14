import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/product", label: "See it work" },
  { to: "/assistants", label: "Meet the Consultants" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-display text-xl font-semibold text-foreground">
          Bloom<span className="italic text-primary"> Ledger</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Button asChild><Link to="/contact">Book a chat</Link></Button>
      </div>
      <nav className="flex justify-center gap-5 border-t border-border/60 py-2 text-xs font-medium text-muted-foreground md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} activeProps={{ className: "text-foreground" }}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-background">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Bloom<span className="italic text-blush"> Ledger</span></p>
          <p className="mt-2 text-sm opacity-70">Finance that feels like it was made for your business.</p>
        </div>
        <div className="text-sm opacity-80">
          <p className="font-semibold">Services</p>
          <p className="mt-2"><Link to="/services">Automation & statements</Link></p>
          <p><Link to="/assistants">Meet the Consultants</Link></p>
        </div>
        <p className="text-sm opacity-60 md:text-right">© 2026 Bloom Ledger. Built for small retail.</p>
      </div>
    </footer>
  );
}
