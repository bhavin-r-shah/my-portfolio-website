import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { SOCIAL } from "@/components/site-footer";
import { CtaLink } from "@/components/cta-button";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Side Projects — Bhavin Shah" },
      { name: "description", content: "Personal side projects, experiments, and open-source contributions — coming soon." },
      { property: "og:title", content: "Side Projects — Bhavin Shah" },
      { property: "og:description", content: "A space for side projects, experiments, and open-source work — coming soon." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
});

function ProjectsPage() {
  const upcoming = [
    {
      title: "AI-Assisted Résumé Reviewer",
      blurb: "LLM-powered feedback on résumés with rubric-driven scoring and inline rewrites.",
      tags: ["React", "TypeScript", "LLM"],
    },
    {
      title: "Sustainable Web Audit Tool",
      blurb: "Chrome extension that scores pages on data-transfer, CPU idle, and green-web heuristics.",
      tags: ["Chrome API", "Web Vitals", "Sustainability"],
    },
    {
      title: "A11y Component Playground",
      blurb: "Open-source library of accessible React primitives with keyboard-first demos.",
      tags: ["React", "WCAG 2.2", "Storybook"],
    },
  ];

  return (
    <div className="container-page py-20">
      <p className="eyebrow inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Coming soon
      </p>
      <h1 className="display-serif mt-3 max-w-3xl text-5xl sm:text-6xl">
        Side projects, experiments &amp; open source.
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        This space is reserved for things I'm building on the side — small
        tools, weekend experiments, AI-assisted projects, and open-source
        contributions. New entries land here as I ship them. For delivered
        production work, see{" "}
        <Link to="/experience" className="text-primary underline-offset-4 hover:underline">
          Work Experience
        </Link>
        .
      </p>

      <div
        className="mt-12 card-surface relative overflow-hidden p-8 sm:p-12"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--primary) 12%, var(--card)), var(--card))",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="font-mono text-xs text-muted-foreground">status</p>
            <p className="text-lg font-semibold">Building in public — check back soon.</p>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground">
          Follow along on GitHub or via Learning Notes for early write-ups,
          code snippets, and lessons from what I'm exploring right now.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CtaLink href={SOCIAL.github} target="_blank" rel="noreferrer" variant="primary">
            <Github className="h-4 w-4" /> Follow on GitHub
          </CtaLink>
          <CtaLink href="/notes" variant="secondary">
            Read Learning Notes <ArrowRight className="h-4 w-4" />
          </CtaLink>
        </div>
      </div>

      <div className="mt-16">
        <p className="eyebrow">On the workbench</p>
        <h2 className="display-serif mt-2 text-3xl sm:text-4xl">Ideas in progress.</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((u) => (
            <article key={u.title} className="card-surface flex flex-col p-6">
              <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">
                planned
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{u.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{u.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {u.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
