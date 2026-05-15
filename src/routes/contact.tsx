import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SITE, whatsappLink } from "@/lib/site";

// Define form schema inline to avoid dependency issues
const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Lead storage utilities
function isWhatsAppAvailable(): boolean {
  if (typeof window === "undefined") return true;
  const ua = navigator.userAgent.toLowerCase();
  return /android|iphone|ipod|ipad|whatsapp/.test(ua);
}

function checkPopupBlocked(popup: Window | null): boolean {
  if (popup === null || popup === undefined) return true;
  try {
    return popup.closed === undefined || popup.closed === true;
  } catch {
    return true;
  }
}

function saveLead(data: ContactFormData, method: "whatsapp" | "email" | "offline"): void {
  if (typeof window === "undefined") return;
  try {
    const lead = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      message: data.message,
      timestamp: new Date().toISOString(),
      method,
    };
    const leads = JSON.parse(localStorage.getItem("nyeneng_leads") || "[]");
    leads.unshift(lead);
    if (leads.length > 100) leads.pop();
    localStorage.setItem("nyeneng_leads", JSON.stringify(leads));
  } catch (error) {
    console.error("Lead storage error:", error);
  }
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nyeneng | Quotes, Enquiries & WhatsApp — Rustenburg" },
      { name: "description", content: "Get a quote from Nyeneng Trading & Projects. WhatsApp +27 72 129 6893 or visit us in Lefaragatlha, Rustenburg." },
      { property: "og:title", content: "Contact Nyeneng Trading & Projects" },
      { property: "og:description", content: "Quotes, enquiries and WhatsApp — Rustenburg, North West." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const SERVICES = [
  "Residential Construction",
  "Water / Borehole / JoJo",
  "Electrical",
  "Plumbing",
  "Welding & Fabrication",
  "Tiling & Finishing",
  "Materials Supply",
  "Other",
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [whatsappAvailable, setWhatsappAvailable] = useState(true);
  const [useEmailFallback, setUseEmailFallback] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    type: "idle" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  useEffect(() => {
    setWhatsappAvailable(isWhatsAppAvailable());
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = contactFormSchema.safeParse(data);

    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      setLoading(false);
      return;
    }

    // Save lead locally
    saveLead(r.data, useEmailFallback ? "email" : "whatsapp");

    if (useEmailFallback) {
      // Email fallback
      setEmailStatus({
        type: "error",
        message: "Email integration coming soon. Please WhatsApp or call us directly.",
      });
      setLoading(false);
    } else {
      // Try WhatsApp
      const msg = `New enquiry from ${r.data.name}\nPhone: ${r.data.phone}\nEmail: ${r.data.email || "-"}\nService: ${r.data.service}\n\n${r.data.message}`;
      const whatsappUrl = whatsappLink(msg);

      const popup = window.open(whatsappUrl, "_blank", "noopener");
      const popupBlocked = checkPopupBlocked(popup);

      setLoading(false);

      if (popupBlocked) {
        setEmailStatus({
          type: "error",
          message: "WhatsApp popup blocked. Please WhatsApp us directly at +27 72 129 6893",
        });
        setUseEmailFallback(true);
      } else {
        setSent(true);
      }
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Ready to Build, Install & Transform?"
        subtitle="Send us your project details — we'll come back within 24 hours with a clear, honest quote."
      />

      <section className="container-x grid gap-10 py-16 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl border bg-card p-6 shadow-card md:p-8">
            <h2 className="font-display text-2xl font-bold text-accent">Quick Quote Request</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Submitting opens a pre-filled WhatsApp chat with our team.
            </p>

            {sent ? (
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary p-5">
                <CheckCircle2 className="mt-0.5 h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold text-accent">Thanks — your enquiry is on its way.</div>
                  <p className="mt-1 text-sm text-muted-foreground">If WhatsApp didn't open automatically, you can also reach us on {SITE.phone}.</p>
                </div>
              </div>
            ) : (
              <>
                {emailStatus.type === "error" && (
                  <div className="mt-6 flex items-start gap-3 rounded-2xl bg-destructive/10 p-5">
                    <AlertCircle className="mt-0.5 h-6 w-6 text-destructive" />
                    <div>
                      <div className="font-semibold text-destructive">WhatsApp unavailable</div>
                      <p className="mt-1 text-sm text-muted-foreground">{emailStatus.message}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" error={errors.name} required />
                  <Field label="Phone / WhatsApp" name="phone" type="tel" error={errors.phone} required />
                  <Field label="Email (optional)" name="email" type="email" error={errors.email} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-accent">
                      Service <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="service"
                      defaultValue=""
                      className="h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="" disabled>
                        Select a service…
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-accent">
                      Project details <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      maxLength={1000}
                      className="rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Tell us about your project, location and timeline…"
                    />
                    {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="sm:col-span-2 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 disabled:opacity-50"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Send via WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Side info */}
        <div className="space-y-4 lg:col-span-2">
          <ContactCard icon={Phone} title="Call / WhatsApp" lines={[SITE.phone]} href={`tel:${SITE.phone}`} cta="Tap to call" />
          <ContactCard icon={Mail} title="Email" lines={[SITE.email]} href={`mailto:${SITE.email}`} cta="Send an email" />
          <ContactCard icon={MapPin} title="Visit / Post" lines={[SITE.address]} />
          <ContactCard icon={Clock} title="Business Hours" lines={SITE.hours} />
        </div>
      </section>

      {/* Map */}
      <section className="container-x pb-20">
        <div className="overflow-hidden rounded-3xl border shadow-card">
          <iframe
            title="Nyeneng location"
            src="https://www.google.com/maps?q=Lefaragatlha,+Rustenburg,+North+West,+South+Africa&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full"
          />
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-accent">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  href,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  href?: string;
  cta?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="font-display text-base font-semibold text-accent">{title}</div>
          {lines.map((l) => (
            <div key={l} className="mt-0.5 text-sm text-muted-foreground">
              {l}
            </div>
          ))}
          {href && cta && (
            <a href={href} className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">
              {cta} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
