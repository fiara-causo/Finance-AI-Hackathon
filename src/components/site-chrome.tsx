import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/day-one-cfo-logo.png";

const nav = [
  { to: "/curriculum", label: "Curriculum" },
  { to: "/assistants", label: "Meet the Consultants" },
  { to: "/services", label: "Pricing" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="shrink-0" aria-label="Day One CFO home">
          <img src={logo} alt="Day One CFO" width={1536} height={512} className="h-10 w-auto sm:h-12" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/login">Contractor login</Link></Button>
          <Button asChild><Link to="/contact">Book a chat</Link></Button>
        </div>
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
          <p className="font-display text-2xl">Day One CFO</p>
          <p className="mt-2 text-sm opacity-70">Finance that feels like it was made for your business.</p>
        </div>
        <div className="text-sm opacity-80">
          <p className="font-semibold">Services</p>
          <p className="mt-2"><Link to="/services">Automation & statements</Link></p>
          <p><Link to="/assistants">Meet the Consultants</Link></p>
          <p><Link to="/curriculum">Curriculum</Link></p>
          <p><Link to="/login">Contractor login</Link></p>
        </div>
        <p className="text-sm opacity-60 md:text-right">© 2026 Day One CFO. Guidance only, not accounting or tax advice.</p>
      </div>
    </footer>
  );
}
