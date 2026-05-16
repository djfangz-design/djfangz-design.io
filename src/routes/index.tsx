import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Hammer,
  Droplets,
  Zap,
  Wrench,
  Flame,
  Grid3x3,
  Package,
  ShieldCheck,
  Users,
  Clock,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";
import waterImg from "@/assets/water-jojo.jpg";
import communityImg from "@/assets/community-home.jpg";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SITE, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nyeneng Trading & Projects | Construction & Borehole Drilling Rustenburg" },
      { name: "description", content: "Construction company in Rustenburg offering borehole drilling, JoJo tank installation, plumbing, electrical, welding & tiling across North West." },
      { property: "og:title", content: "Nyeneng Trading & Projects — Rustenburg" },
      { property: "og:description", content: "Multi-trade construction & water solutions across Rustenburg and North West." },
      { property: "og:url", content: "https://nyeneng-builds-futures.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://nyeneng-builds-futures.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://nyeneng-builds-futures.lovable.app/" },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  { icon: Hammer, title: "Residential Construction", desc: "New builds, extensions, renovations, roofing & full project management." },
  { icon: Droplets, title: "Water Security Solutions", desc: "Borehole drilling, JoJo tanks, pumps & rainwater harvesting." },
  { icon: Zap, title: "Electrical Services", desc: "Wiring, DB boards, solar backup & Certificates of Compliance." },
  { icon: Wrench, title: "Plumbing", desc: "Geysers, drainage, leak detection & sewer connections." },
  { icon: Flame, title: "Welding & Fabrication", desc: "Gates, burglar bars, carports, staircases & steel repairs." },
  { icon: Grid3x3, title: "Tiling & Finishing", desc: "Floor & wall tiling, waterproofing, paving & surface prep." },
];

const STATS = [
  { value: 7, suffix: "+", label: "Years Active" },
  { value: 7, suffix: "", label: "Core Trades" },
  { value: 100, suffix: "%", label: "SANS Compliant" },
  { value: 250, suffix: "+", label: "Projects Delivered" },
];

const TRUST = [
  { icon: ShieldCheck, label: "SANS Compliant" },
  { icon: CheckCircle2, label: "Quality Workmanship" },
  { icon: Users, label: "Community Focused" },
  { icon: Clock, label: "Reliable Delivery" },
];

const TESTIMONIALS = [
  { name: "Lerato M.", role: "Homeowner, Tlhabane", quote: "Nyeneng built our family home from foundation to finishes. Honest team, neat work, on time." },
  { name: "Sipho K.", role: "Property Owner, Boitekong", quote: "They drilled my borehole and installed two JoJo tanks. Water security sorted — great pricing." },
  { name: "Naledi P.", role: "Resident, Rustenburg", quote: "From electrical CoC to new tiling, they handled everything under one roof. Truly multi-trade." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Nyeneng construction site in Rustenburg at golden hour"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container-x relative py-24 md:py-36">
          <div className="max-w-2xl animate-float-up text-white">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.16_140)]" />
              Established {SITE.established} · Rustenburg, North West
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-balance md:text-6xl">
              South Africa's Trusted Multi-Trade Partner
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
              Construction, Water Solutions, Electrical, Plumbing, Welding & more — all under one roof.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/95 px-6 py-3 text-sm font-semibold text-accent shadow-soft hover:bg-white"
              >
                WhatsApp Us
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST.map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-sm text-white/90">
                  <t.icon className="h-4 w-4 text-[oklch(0.85_0.14_140)]" /> {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-accent text-accent-foreground">
        <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4 md:py-14">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-extrabold text-primary-foreground md:text-5xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-accent-foreground/70 md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-20">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What we do</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl text-balance">
              Seven trades. One reliable partner.
            </h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              to="/services"
              className="group rounded-2xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-accent">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WATER FEATURE */}
      <section className="bg-secondary/60">
        <div className="container-x grid items-center gap-10 py-20 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img src={waterImg} alt="Borehole drilling and JoJo tanks" width={1280} height={896} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Water Security</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl text-balance">
              From dry tap to total water independence.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We drill boreholes, install genuine JoJo tanks, set up pump systems and full water reticulation —
              keeping homes and businesses across Rustenburg flowing through every season.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Borehole siting & drilling", "JoJo tank supply + install", "Pumps & pressure systems", "Rainwater harvesting"].map((i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {i}</li>
              ))}
            </ul>
            <a href={whatsappLink("Hi Nyeneng, I'd like a quote for water solutions.")} target="_blank" rel="noopener"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Get a water quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container-x py-20">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Nyeneng</div>
        <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl text-balance">
          One trusted contractor for the entire job.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Package, t: "Multi-trade expertise", d: "Skip the coordination headache — we handle every trade." },
            { icon: ShieldCheck, t: "SANS compliant", d: "Workmanship that meets South African standards." },
            { icon: Users, t: "Community impact", d: "Local team employing & uplifting Rustenburg residents." },
            { icon: Clock, t: "Fast turnaround", d: "Reliable scheduling, honest timelines, no ghosting." },
          ].map((w) => (
            <div key={w.t} className="rounded-2xl border bg-card p-6 shadow-card">
              <w.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display text-base font-semibold text-accent">{w.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/60">
        <div className="container-x py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Client voices</div>
          <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl text-balance">
            Trusted across Rustenburg.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border bg-card p-6 shadow-card">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-sm text-foreground/90">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-sm">
                  <div className="font-semibold text-accent">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-3xl bg-accent p-8 text-accent-foreground shadow-soft md:p-14">
          <img src={communityImg} alt="" width={1280} height={896} loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl text-balance">
              Ready to Build, Install & Transform?
            </h2>
            <p className="mt-3 text-accent-foreground/85">
              Tell us about your project. We'll come back with a clear, fair quote within 24 hours.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                Request a Quote
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
