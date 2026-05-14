import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import { NAV, whatsappLink } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "bg-background/90 backdrop-blur shadow-card"
          : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoIcon} alt="Nyeneng logo" width={44} height={44} className="h-11 w-11 rounded-full" />
          <div className="leading-tight">
            <div className="font-display text-base font-extrabold tracking-wide text-[var(--brand-dark)]">NYENENG</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-copper)]">
              Trading & Projects
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-accent"
              activeProps={{ className: "bg-secondary text-accent" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="ml-2 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            Get a Quote
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-accent" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Request a Quote on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
