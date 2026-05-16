import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, HeartHandshake, ShieldCheck, Users, Hammer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import communityImg from "@/assets/community-home.jpg";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nyeneng Trading & Projects | Rustenburg Construction Company" },
      { name: "description", content: "Founded in 2016, Nyeneng is a Rustenburg-based multi-trade construction & infrastructure company serving North West province." },
      { property: "og:title", content: "About Nyeneng Trading & Projects" },
      { property: "og:description", content: "Community-rooted multi-trade construction in Rustenburg since 2016." },
      { property: "og:url", content: "https://nyeneng-builds-futures.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://nyeneng-builds-futures.lovable.app/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://nyeneng-builds-futures.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://nyeneng-builds-futures.lovable.app/about" },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: HeartHandshake, t: "Community Development", d: "We hire locally and uplift the neighbourhoods we work in." },
  { icon: ShieldCheck, t: "Quality Workmanship", d: "Every joint, brick and pipe is held to SANS standards." },
  { icon: Users, t: "Integrity", d: "Honest timelines, transparent pricing, no hidden costs." },
  { icon: Hammer, t: "One-Stop Service", d: "Construction, water, electrical, plumbing, welding & tiling — one team." },
];

const DIRECTORS = [
  { name: "Tlhabane Jooste Maboa", role: "Director" },
  { name: "Katlego Philda Maboa", role: "Director" },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Established ${SITE.established}`}
        title="Rooted in Rustenburg. Built for South Africa."
        subtitle="Nyeneng Trading & Projects is a multi-trade construction and infrastructure company serving homeowners, businesses and communities across the North West."
      />

      <section className="container-x grid items-center gap-12 py-16 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img src={communityImg} alt="A family in front of their newly built Nyeneng home" width={1280} height={896} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-accent text-balance">Our Story</h2>
          <div className="mt-4 space-y-4 text-foreground/85">
            <p>
              Nyeneng Trading & Projects was founded in {SITE.established} with a simple goal:
              give South African homeowners and businesses one reliable partner for the entire build.
              No more juggling separate contractors. No more half-finished jobs.
            </p>
            <p>
              From our base in Rustenburg, we've grown into a true multi-trade specialist — combining
              residential construction, water security, electrical, plumbing, welding, tiling and
              materials supply under a single, accountable team.
            </p>
            <p>
              Every project we touch is a chance to build community. We employ locally, train young
              tradespeople, and stand behind our work long after the dust settles.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="container-x grid gap-8 py-16 md:grid-cols-2">
          <div className="rounded-3xl border bg-card p-8 shadow-card">
            <Target className="h-8 w-8 text-primary" />
            <h3 className="mt-4 font-display text-2xl font-bold text-accent">Our Mission</h3>
            <p className="mt-3 text-foreground/85">
              To deliver dependable, high-quality multi-trade construction and infrastructure
              services that improve the lives of South African families — one project, one home,
              one community at a time.
            </p>
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-card">
            <Eye className="h-8 w-8 text-primary" />
            <h3 className="mt-4 font-display text-2xl font-bold text-accent">Our Vision</h3>
            <p className="mt-3 text-foreground/85">
              To be the most trusted name in multi-trade construction across the North West —
              known for integrity, craftsmanship and a deep commitment to community development.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What we stand for</div>
        <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl text-balance">Our Values</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.t} className="rounded-2xl border bg-card p-6 shadow-card">
              <v.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display text-base font-semibold text-accent">{v.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-accent text-accent-foreground">
        <div className="container-x py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground/70">Leadership</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl text-balance">Meet the Directors</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {DIRECTORS.map((d) => (
              <div key={d.name} className="rounded-3xl bg-white/5 p-8 backdrop-blur">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {d.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{d.name}</h3>
                <div className="text-sm text-accent-foreground/70">{d.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
