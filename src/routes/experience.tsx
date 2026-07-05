import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Briefcase, Building2, Github, GraduationCap, UserRound } from "lucide-react";
import { projects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
  head: () => ({
    meta: [
      { title: "Experience — Bhavin Shah" },
      {
        name: "description",
        content:
          "Case studies from 15 years of work: enterprise UI component libraries, cloud-native microservices in Go, sustainable web POCs, and accessibility tooling.",
      },
      { property: "og:title", content: "Experience — Bhavin Shah" },
      {
        property: "og:description",
        content: "Projects delivered across HPE, Nimble Storage, Intuit, IBM, and Accenture.",
      },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
});

const timeline = [
  {
    years: "2017 – 2025",
    role: "Staff Software Engineer",
    org: "Hewlett Packard Enterprise",
    where: "Durham, NC",
  },
  {
    years: "2015 – 2017",
    role: "Senior Software Engineer",
    org: "Nimble Storage (acq. by HPE)",
    where: "San Jose, CA",
  },
  { years: "2013 – 2015", role: "Software Engineer I", org: "Intuit", where: "Mountain View, CA" },
  { years: "2012", role: "Software Engineer Intern", org: "Intuit", where: "Mountain View, CA" },
  { years: "2011", role: "Software Developer Intern", org: "IBM", where: "Littleton, MA" },
  { years: "2008 – 2010", role: "Software Engineer", org: "Accenture", where: "Mumbai, India" },
];

function ExperiencePage() {
  return (
    <div className="container-page my-10">
      <h1 className="display-serif max-w-3xl text-5xl sm:text-6xl">Experience</h1>
      <p className="mt-5 text-muted-foreground">
        Projects I've led or contributed to across HPE, Nimble Storage, Intuit, IBM and Accenture.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.5fr] lg:items-start">
        <aside className="space-y-6 lg:sticky lg:top-24">
          <section className="card-surface p-6">
            <p className="eyebrow inline-flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5" /> Education
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-xl border border-border bg-background/40 p-4">
                <p className="font-medium">M.S. Computer Science</p>
                <p className="text-muted-foreground">Northeastern University, Boston, USA</p>
              </li>
              <li className="rounded-xl border border-border bg-background/40 p-4">
                <p className="font-medium">B.E. Information Technology</p>
                <p className="text-muted-foreground">Mumbai University, India</p>
              </li>
            </ul>
          </section>

          <section className="card-surface p-6">
            <p className="eyebrow inline-flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5" /> Experience timeline
            </p>
            <ol className="mt-4 border-l border-border">
              {timeline.map((t) => (
                <li key={t.years + t.org} className="relative pb-6 pl-6 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-primary bg-card" />
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {t.years}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{t.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.org} · {t.where}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </aside>

        <div className="space-y-6">
          {projects.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="card-surface card-surface-hover scroll-mt-24 overflow-hidden"
            >
              <div>
                {/*
                <div
                  className="relative flex min-h-56 items-center justify-center border-b border-border"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--primary) 20%, var(--card)), color-mix(in oklab, var(--accent) 15%, var(--card)))",
                  }}
                >
                  <span className="display-serif text-7xl italic text-foreground/70">
                    {p.title
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 3)
                      .join("")}
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground backdrop-blur">
                    {p.year}
                  </span>
                </div>
                */}

                <div className="flex flex-col px-6 py-3 md:px-8 md:py-6">
                  <div className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold text-foreground">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.tagline}</p>
                    </div>

                    <dl className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border bg-surface/50 p-4">
                        <dt className="eyebrow inline-flex items-center gap-2">
                          <Building2 className="h-3.5 w-3.5" /> Company
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-foreground">{p.company}</dd>
                      </div>
                      <div className="rounded-2xl border border-border bg-surface/50 p-4">
                        <dt className="eyebrow inline-flex items-center gap-2">
                          <UserRound className="h-3.5 w-3.5" /> Project role
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-foreground">{p.role}</dd>
                      </div>
                    </dl>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{p.description}</p>

                  <ul className="mt-3 space-y-1.5 text-sm">
                    {p.impact.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span className="text-foreground/85">{i}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 text-sm">
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                          <Github className="h-4 w-4" /> Repo
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary"
                        >
                          Live <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
