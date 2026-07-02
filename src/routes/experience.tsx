import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
  head: () => ({
    meta: [
      { title: "Work Experience — Bhavin Shah" },
      { name: "description", content: "Case studies from 15 years of work: enterprise UI component libraries, cloud-native microservices in Go, sustainable web POCs, and accessibility tooling." },
      { property: "og:title", content: "Work Experience — Bhavin Shah" },
      { property: "og:description", content: "Projects delivered across HPE, Nimble Storage, Intuit, IBM, and Accenture." },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
});

function ExperiencePage() {
  return (
    <div className="container-page py-20">
      <p className="eyebrow">Work experience</p>
      <h1 className="display-serif mt-3 max-w-3xl text-5xl sm:text-6xl">
        Case studies from 15 years of shipping.
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Projects I've led or contributed to across HPE, Nimble Storage, Intuit,
        IBM, and Accenture. Each entry captures the problem, my role, the
        stack, and the outcome.
      </p>

      <div className="mt-14 space-y-6">
        {projects.map((p) => (
          <article
            key={p.slug}
            id={p.slug}
            className="card-surface card-surface-hover scroll-mt-24 overflow-hidden"
          >
            <div className="grid gap-0 md:grid-cols-[1fr_1.6fr]">
              <div
                className="relative flex min-h-56 items-center justify-center border-b border-border md:border-b-0 md:border-r"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--primary) 20%, var(--card)), color-mix(in oklab, var(--accent) 15%, var(--card)))",
                }}
              >
                <span className="display-serif text-7xl italic text-foreground/70">
                  {p.title.split(" ").map((w) => w[0]).slice(0, 3).join("")}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground backdrop-blur">
                  {p.year}
                </span>
              </div>

              <div className="flex flex-col p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-semibold text-foreground">{p.title}</h2>
                  <p className="font-mono text-xs text-muted-foreground">{p.role}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed">{p.description}</p>

                <ul className="mt-5 space-y-1.5 text-sm">
                  {p.impact.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground/85">{i}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-sm">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Github className="h-4 w-4" /> Repo
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary">
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
  );
}
