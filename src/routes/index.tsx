import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Download,
  Github,
  Heart,
  Linkedin,
  Mail,
  Sparkles,
  Cpu,
  Layers,
  Leaf,
  Gauge,
  Code2,
  Target,
} from "lucide-react";
import photo from "@/assets/bhavin-photo.asset.json";
import resume from "@/assets/resume.asset.json";
import { CtaLink } from "@/components/cta-button";
import { projects } from "@/lib/portfolio-data";
import { SOCIAL } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Bhavin Shah — Technical Product Leader & Staff Software Engineer" },
      {
        name: "description",
        content:
          "React, Go, cloud-native systems, design systems, and accessibility. 15 years bridging product and engineering.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const skillGroups = [
  {
    icon: Code2,
    label: "Frontend",
    items: ["React", "TypeScript", "Stencil.js", "Tailwind CSS", "Cypress", "Jest"],
  },
  {
    icon: Cpu,
    label: "Backend",
    items: ["Go (Golang)", "Java", "REST", "gRPC", "Kafka", "PostgreSQL", "Redis", "MongoDB"],
  },
  {
    icon: Layers,
    label: "Platform",
    items: ["GitHub Actions", "Jenkins", "Docker", "Git", "Unix"],
  },
  {
    icon: Sparkles,
    label: "AI-Assisted Dev",
    items: ["GitHub Copilot", "VS Code AI", "ChatGPT workflows"],
  },
  {
    icon: Gauge,
    label: "Quality & UX",
    items: ["WCAG 2.2 AA", "Design Systems", "Figma", "Web Vitals"],
  },
  {
    icon: Leaf,
    label: "Sustainability",
    items: ["Tree-shaking", "CDN-first", "Lazy loading", "Dark theme"],
  },
];

const testimonials = [
  {
    quote:
      "Bhavin is the rare engineer who leads with product intuition. He'd walk into a review with the architecture, the trade-offs, and the customer story ready.",
    name: "Engineering Manager, HPE",
    role: "Manager (former)",
  },
  {
    quote:
      "He raised the accessibility bar for the whole org. Our components shipped a11y by default because of the guardrails he built.",
    name: "Principal Engineer",
    role: "Peer at HPE",
  },
  {
    quote:
      "Clear communicator across PMs, designers, and backend teams. Bhavin unblocks conversations that other people avoid.",
    name: "Product Manager",
    role: "Cross-functional partner",
  },
];

function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(600px 300px at 15% 10%, color-mix(in oklab, var(--primary) 12%, transparent), transparent), radial-gradient(500px 260px at 90% 0%, color-mix(in oklab, var(--accent) 15%, transparent), transparent)",
          }}
        />
        <div className="container-page grid gap-12 py-8 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] md:items-center md:py-12 lg:gap-16">
          <div className="max-w-2xl">
            {/* Open to Roles */}
            {/* <p className="eyebrow inline-flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
              </span>
              Open to Staff / Principal & Tech Lead roles
            </p> */}
            {/* Hero Description Text */}
            <h1 className="display-serif mt-6 text-3xl sm:text-4xl md:text-5xl">
              Leading the intersection of user-centric{" "}
              <span className="italic text-primary">product strategy</span> and{" "}
              <span className="italic text-accent">resilient engineering.</span>
            </h1>
            {/* Hero subtext */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              I’m <span className="font-medium text-foreground">Bhavin Shah</span> — a full-stack
              engineer with <span className="italic text-accent">15 years</span> of experience
              bridging product and engineering. I have delivered cloud-native microservices & web
              applications across distributed teams. I have translated customer needs into roadmaps
              & driven product strategy as Agile Scrum Master.
            </p>

            {/* Hero Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href="/experience" variant="primary">
                View Work Experience <ArrowRight className="h-4 w-4" />
              </CtaLink>
              <CtaLink href={resume.url} download={resume.original_filename} variant="secondary">
                <Download className="h-4 w-4" /> Download Résumé
              </CtaLink>
            </div>

            {/* Hero Social Links */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <CtaLink href={SOCIAL.github} target="_blank" rel="noreferrer" variant="ghost">
                <Github className="h-4 w-4" /> GitHub
              </CtaLink>
              <CtaLink href={SOCIAL.linkedin} target="_blank" rel="noreferrer" variant="ghost">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </CtaLink>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative">
            <div className="relative mx-auto flex w-full max-w-[16.5rem] flex-col gap-5 rounded-3xl p-4 sm:max-w-[17rem] lg:max-w-[18rem]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={photo.url}
                  alt="Portrait of Bhavin Shah"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SNAPSHOT */}
      <section>
        <div className="container-page py-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="display-serif text-4xl sm:text-5xl">Skills Snapshot</h2>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map(({ icon: Icon, label, items }) => (
              <div key={label} className="card-surface p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-base font-semibold">{label}</p>
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((i) => (
                    <li
                      key={i}
                      className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-page mt-3">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-border/60 shadow-sm lg:grid-cols-10 lg:gap-px">
          {[
            { icon: Briefcase, label: "Experience", value: "15+ Years", span: "lg:col-span-2" },
            {
              icon: Code2,
              label: "Core Tech",
              value: "Go, React, REST API, PostgreSQL,",
              emphasis: "Design Systems",
              span: "lg:col-span-3",
            },
            {
              icon: Target,
              label: "Focus",
              value: "Product Strategy &",
              emphasis: "Delivery",
              span: "lg:col-span-2",
            },
            {
              icon: Heart,
              label: "Passion",
              value: "User-Friendly Applications, Accessibility & Sustainability",
              glow: true,
              span: "lg:col-span-3",
            },
          ].map(({ icon: Icon, label, value, sub, emphasis, italic, glow, span }) => (
            <div
              key={label}
              className={`group relative flex flex-col overflow-hidden bg-card p-6 transition-colors hover:bg-surface ${span}`}
            >
              {glow && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
                />
              )}
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="eyebrow">{label}</span>
              </div>
              <div>
                <p
                  className={`display-serif leading-snug text-foreground items-start ${italic ? "text-lg italic" : sub ? "text-2xl italic" : "text-xl"}`}
                >
                  {value}
                  {emphasis && (
                    <>
                      {" "}
                      <span className="text-primary not-italic">{emphasis}</span>
                    </>
                  )}
                </p>
                {sub && <p className="mt-1 text-sm font-medium text-muted-foreground">{sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display-serif mt-2 text-4xl sm:text-5xl">Work that hires me back.</h2>
          </div>
          <Link
            to="/experience"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-flex items-center gap-1"
          >
            All experience <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/experience"
              hash={p.slug}
              className="card-surface card-surface-hover group flex flex-col overflow-hidden"
            >
              <div
                className="aspect-[16/10] w-full border-b border-border"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--primary) 18%, var(--card)), color-mix(in oklab, var(--accent) 15%, var(--card)))",
                }}
              >
                <div className="grid h-full place-items-center">
                  <span className="display-serif text-6xl italic text-foreground/70">
                    {p.title
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 3)
                      .join("")}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow">{p.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Case study{" "}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROOF OF WORK */}
      <section className="container-page py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <p className="eyebrow">Proof of work</p>
            <h2 className="display-serif mt-2 text-4xl sm:text-5xl">Ship. Measure. Repeat.</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              GitHub is the working notebook — components, patterns, and small tools that back up
              the case studies. Open source contributions and side projects land here as I ship
              them.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaLink href={SOCIAL.github} target="_blank" rel="noreferrer" variant="primary">
                <Github className="h-4 w-4" /> Visit GitHub
              </CtaLink>
              <CtaLink href="/learnings" variant="secondary">
                Read Learnings <ArrowRight className="h-4 w-4" />
              </CtaLink>
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm">github.com/bhavin-r-shah</p>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">
                live
              </span>
            </div>
            <div
              className="mt-6 grid gap-[3px]"
              style={{ gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
            >
              {Array.from({ length: 371 }).map((_, i) => {
                const level = [0, 0, 1, 1, 2, 2, 3, 3, 4][
                  Math.floor(Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 9)
                ];
                const alpha = [0.06, 0.14, 0.28, 0.5, 0.78][level];
                return (
                  <span
                    key={i}
                    className="aspect-square w-full rounded-[2px]"
                    style={{
                      background: `color-mix(in oklab, var(--primary) ${alpha * 100}%, var(--surface))`,
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="font-mono">371 days · illustrative</span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                {[0.1, 0.25, 0.45, 0.7].map((a) => (
                  <span
                    key={a}
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{
                      background: `color-mix(in oklab, var(--primary) ${a * 100}%, var(--surface))`,
                    }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border bg-surface/60">
        <div className="container-page py-20">
          <p className="eyebrow">What colleagues say</p>
          <h2 className="display-serif mt-2 text-4xl sm:text-5xl">On working with me.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card-surface flex flex-col p-6">
                <blockquote className="display-serif text-xl leading-snug text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="container-page py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-border">
            <img src={photo.url} alt="Bhavin Shah" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">About</p>
            <h2 className="display-serif mt-2 text-4xl sm:text-5xl">
              Product-minded. Engineering-native.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I trained as a computer scientist (M.S., Northeastern) and spent the last decade+
              shipping software at HPE, Nimble Storage, Intuit, IBM, and Accenture. I've owned
              features end-to-end — from customer discovery and system design through UI, APIs,
              storage, CI/CD, and iteration — and I lead teams as an Agile Scrum Master.
            </p>
            <div className="mt-6 flex gap-3">
              <CtaLink href="/about" variant="secondary">
                More about me <ArrowRight className="h-4 w-4" />
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-page pb-24">
        <div
          className="card-surface relative overflow-hidden p-8 sm:p-14"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 10%, var(--card)), var(--card))",
          }}
        >
          <p className="eyebrow">Let's talk</p>
          <h2 className="display-serif mt-3 max-w-3xl text-4xl sm:text-5xl">
            Interested in working together?
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            View my résumé, explore my GitHub, or contact me directly. I reply within a business
            day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href={resume.url} download={resume.original_filename} variant="primary">
              <Download className="h-4 w-4" /> Download Résumé
            </CtaLink>
            <CtaLink href={SOCIAL.email} variant="secondary">
              <Mail className="h-4 w-4" /> Email Me
            </CtaLink>
            <CtaLink href={SOCIAL.github} target="_blank" rel="noreferrer" variant="secondary">
              <Github className="h-4 w-4" /> View GitHub
            </CtaLink>
            <CtaLink href={SOCIAL.linkedin} target="_blank" rel="noreferrer" variant="secondary">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
