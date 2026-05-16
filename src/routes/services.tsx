import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  Hammer, Droplets, Zap, Wrench, Flame, Grid3x3, Package,
  CheckCircle2, ArrowRight, Send,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SITE, whatsappLink } from "@/lib/site";

const FAQS = [
  {
    q: "Do you issue an Electrical Certificate of Compliance (COC)?",
    a: "Yes. All residential electrical work — new installs, DB boards, repairs and additions — is signed off by a registered electrician and we issue a valid Certificate of Compliance (COC) on completion. This is the legal document banks, insurers and property transfers require.",
  },
  {
    q: "How long does borehole drilling and equipping take?",
    a: "A typical residential borehole is drilled in 1–2 days once the site is accessible. Equipping (pump, pipework, tank stand, JoJo tank and electrical connection) usually adds another 2–4 days depending on depth, yield and the storage setup you choose.",
  },
  {
    q: "Do you supply and install genuine JoJo tanks?",
    a: "Yes — we supply genuine JoJo tanks (not look-alikes) in standard sizes from 750L up to 10,000L+. Installation includes a level base or stand, inlet/outlet plumbing, overflow, and connection to your booster pump or municipal backup line.",
  },
  {
    q: "How long does it take to build a new house?",
    a: "A standard 3-bedroom home typically takes 4–6 months from foundation to handover, weather and material lead times permitting. We give you a project programme upfront and stage payments are linked to completed milestones — no surprises.",
  },
  {
    q: "Which areas do you service?",
    a: "We are based in Rustenburg and work across the North West, including Tlhabane, Phokeng, Boitekong, Marikana, Mogwase and surrounding farms and townships. For larger projects we travel further — contact us with your location.",
  },
  {
    q: "How do I get a quote and is it free?",
    a: "Quotes are 100% free. Send us your details via the form on this page or WhatsApp us directly — we usually reply within a few hours during business days, and arrange a free on-site assessment for larger projects.",
  },
  {
    q: "Do you offer a workmanship guarantee?",
    a: "Yes. All our work carries a workmanship guarantee, and we stand by every site we leave. Manufacturer warranties (pumps, tanks, geysers, materials) are passed through to you in full.",
  },
];

const SITE_URL = "https://nyeneng-builds-futures.lovable.app";
const SERVICES_URL = `${SITE_URL}/services`;
const SERVICES_TITLE = "Construction, Boreholes, Plumbing & Electrical Services in Rustenburg | Nyeneng";
const SERVICES_DESC = "Trusted Rustenburg builders for new homes, borehole drilling, JoJo tanks, plumbing, electrical (COC), welding, tiling & materials supply across the North West. Get a free WhatsApp quote.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: SERVICES_TITLE },
      { name: "description", content: SERVICES_DESC },
      { name: "keywords", content: "construction Rustenburg, borehole drilling North West, JoJo tank installation, plumber Rustenburg, electrician COC, welding fabrication, tiling, building materials" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Nyeneng Trading & Projects" },
      { property: "og:title", content: SERVICES_TITLE },
      { property: "og:description", content: SERVICES_DESC },
      { property: "og:url", content: SERVICES_URL },
      { property: "og:locale", content: "en_ZA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SERVICES_TITLE },
      { name: "twitter:description", content: SERVICES_DESC },
    ],
    links: [{ rel: "canonical", href: SERVICES_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Nyeneng Services",
          itemListElement: [
            "Residential Construction", "Water Security Solutions", "Electrical Services",
            "Plumbing", "Welding & Fabrication", "Tiling & Finishing", "Materials Supply",
          ].map((name, i) => ({
            "@type": "ListItem", position: i + 1,
            item: { "@type": "Service", name, areaServed: "Rustenburg, North West, South Africa", provider: { "@type": "LocalBusiness", name: "Nyeneng Trading & Projects" } },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Hammer, slug: "construction", title: "Residential Construction",
    desc: "Turnkey home building from foundation to finishes — managed end-to-end by our site team.",
    items: ["New house builds", "Extensions & additions", "Renovations & remodels", "Roofing", "Brickwork & plastering", "Full project management"],
  },
  {
    icon: Droplets, slug: "water", title: "Water Security Solutions",
    desc: "Total water independence for homes, farms and businesses across the North West.",
    items: ["Borehole drilling & equipping", "JoJo tank supply & installation", "Rainwater harvesting", "Water reticulation", "Pumps & pressure systems"],
  },
  {
    icon: Zap, slug: "electrical", title: "Electrical Services",
    desc: "Safe, compliant residential electrical work with COC certification.",
    items: ["Residential wiring", "DB board installations", "Solar backup systems", "Outdoor & security lighting", "Certificates of Compliance"],
  },
  {
    icon: Wrench, slug: "plumbing", title: "Plumbing",
    desc: "From a leaking tap to a full sewer connection — done right the first time.",
    items: ["Geyser supply & install", "Drain laying", "Leak detection & repair", "Sewer connections", "Water reticulation"],
  },
  {
    icon: Flame, slug: "welding", title: "Welding & Fabrication",
    desc: "Custom steelwork built to last in tough South African conditions.",
    items: ["Driveway & pedestrian gates", "Burglar bars & window guards", "Carports & shade structures", "Steel repairs", "Staircases & railings"],
  },
  {
    icon: Grid3x3, slug: "tiling", title: "Tiling & Finishing",
    desc: "Precision finishes that lift any room — neat lines, level surfaces, no shortcuts.",
    items: ["Floor & wall tiling", "Bathroom waterproofing", "Paving", "Surface preparation", "Grouting & sealing"],
  },
  {
    icon: Package, slug: "materials", title: "Materials Supply",
    desc: "Genuine products at fair prices, with quick delivery around Rustenburg.",
    items: ["Building materials", "Plumbing materials", "Electrical products", "Steel products", "Genuine JoJo tanks"],
  },
];

const SERVICE_TITLES = SERVICES.map((s) => s.title);

const contactRegex = /^(?:\+?\d[\d\s\-()]{6,}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
const schema = z.object({
  name: z.string().trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name is too long — please keep it under 100 characters.")
    .regex(/^[\p{L}\s'.-]+$/u, "Name can only contain letters, spaces, hyphens and apostrophes."),
  contact: z.string().trim()
    .min(7, "Please enter a phone number or email so we can reply.")
    .max(100, "That contact looks too long — please double-check it.")
    .regex(contactRegex, "Enter a valid phone number (e.g. 072 123 4567) or email address."),
  service: z.string().min(1, "Please pick the service you need."),
  location: z.string().trim()
    .min(2, "Tell us where the project is (suburb / town).")
    .max(120, "Location is too long — please shorten it."),
  details: z.string().trim().max(600, "Please keep details under 600 characters.").optional().or(z.literal("")),
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Seven core trades. One accountable team."
        subtitle="Whether you're building a new home, securing your water supply, or upgrading a single room — Nyeneng covers it end-to-end."
      />

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {SERVICES.map((s) => (
            <article
              id={s.slug}
              key={s.slug}
              className="rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft md:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-accent">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {s.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(`Hi Nyeneng, I'd like a quote for ${s.title}.`)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95"
                >
                  Request a quote <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#quote"
                  className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-accent hover:bg-secondary"
                >
                  Use form
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FaqSection />

      <QuoteForm services={SERVICE_TITLES} />
    </>
  );
}

function QuoteForm({ services }: { services: string[] }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const clearFieldError = (name: string) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setFormError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = schema.safeParse(data);

    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      setFormError("Please fix the highlighted fields below and try again.");
      const first = r.error.issues[0]?.path[0] as string | undefined;
      if (first) {
        const el = form.querySelector<HTMLElement>(`[name="${first}"]`);
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const msg =
        `Hi Nyeneng, I'd like a quote.\n\n` +
        `Name: ${r.data.name}\n` +
        `Contact: ${r.data.contact}\n` +
        `Service: ${r.data.service}\n` +
        `Location: ${r.data.location}` +
        (r.data.details ? `\n\nDetails: ${r.data.details}` : "");
      const win = window.open(whatsappLink(msg), "_blank", "noopener");
      if (!win) {
        setFormError("We couldn't open WhatsApp — please allow pop-ups or tap the button again.");
        return;
      }
      setSent(true);
      form.reset();
    } catch {
      setFormError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quote" className="border-t bg-secondary/40">
      <div className="container-x py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Free quote
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl">
            Tell us about your project
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Submit the form and we'll continue the conversation on WhatsApp — usually within a few hours.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          aria-busy={submitting}
          className="mx-auto mt-8 grid max-w-2xl gap-4 rounded-3xl border bg-card p-5 shadow-card md:mt-10 md:grid-cols-2 md:p-8"
        >
          {formError && (
            <div role="alert" className="md:col-span-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {formError}
            </div>
          )}

          <FormField label="Full name" name="name" placeholder="Your name" autoComplete="name" error={errors.name} required onChange={() => clearFieldError("name")} />
          <FormField label="Phone or email" name="contact" placeholder="072 123 4567 or you@email.com" autoComplete="tel" error={errors.contact} required onChange={() => clearFieldError("contact")} />

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label htmlFor="qf-service" className="text-sm font-medium text-accent">
              Service <span className="text-destructive">*</span>
            </label>
            <select
              id="qf-service"
              name="service"
              defaultValue=""
              onChange={() => clearFieldError("service")}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "qf-service-err" : undefined}
              className={`h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors.service ? "border-destructive" : ""}`}
            >
              <option value="" disabled>Select a service…</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
              <option value="Other / Not sure">Other / Not sure</option>
            </select>
            {errors.service && <p id="qf-service-err" className="text-xs text-destructive">{errors.service}</p>}
          </div>

          <FormField label="Project location" name="location" placeholder="e.g. Rustenburg, Tlhabane" autoComplete="address-level2" error={errors.location} required onChange={() => clearFieldError("location")} />

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="qf-details" className="text-sm font-medium text-accent">Project details (optional)</label>
            <textarea
              id="qf-details"
              name="details"
              rows={4}
              maxLength={600}
              onChange={() => clearFieldError("details")}
              aria-invalid={!!errors.details}
              aria-describedby={errors.details ? "qf-details-err" : undefined}
              placeholder="Scope, size, timeline, anything else we should know…"
              className={`rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors.details ? "border-destructive" : ""}`}
            />
            {errors.details && <p id="qf-details-err" className="text-xs text-destructive">{errors.details}</p>}
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              By submitting you agree to be contacted on WhatsApp at {SITE.phone}.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" aria-hidden />
                  Opening WhatsApp…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send via WhatsApp
                </>
              )}
            </button>
          </div>

          {sent && (
            <div role="status" className="md:col-span-2 flex items-start gap-3 rounded-2xl bg-secondary p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm text-accent">
                Thanks! Your enquiry is opening in WhatsApp. If nothing happened, call us on{" "}
                <a href={`tel:${SITE.phone}`} className="font-semibold underline">{SITE.phone}</a>.
              </p>
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefer the full contact page?{" "}
          <Link to="/contact" className="font-semibold text-primary hover:underline">
            Visit Contact →
          </Link>
        </p>
      </div>
    </section>
  );
}

function FormField({
  label, name, type = "text", placeholder, error, required, autoComplete, onChange,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  error?: string; required?: boolean; autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = `qf-${name}`;
  const errId = `${id}-err`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-accent">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        maxLength={255}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={`h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${error ? "border-destructive" : ""}`}
      />
      {error && <p id={errId} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="border-t">
      <div className="container-x py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            FAQs
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl">
            Questions we hear every week
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Quick answers on COCs, boreholes, JoJo tanks, timelines and how we work.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-8 max-w-3xl rounded-3xl border bg-card px-5 shadow-card md:mt-10 md:px-7"
        >
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="last:border-b-0">
              <AccordionTrigger className="text-left font-display text-base font-semibold text-accent md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Still unsure?{" "}
          <a
            href={whatsappLink("Hi Nyeneng, I have a question about your services.")}
            target="_blank"
            rel="noopener"
            className="font-semibold text-primary hover:underline"
          >
            Ask us on WhatsApp →
          </a>
        </p>
      </div>
    </section>
  );
}
