import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase } from "lucide-react";
import photo from "@/assets/bhavin-photo.asset.json";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Bhavin Shah" },
      {
        name: "description",
        content:
          "About Bhavin Shah — Technical Product Leader and Staff Software Engineer with 15 years across HPE, Nimble Storage, Intuit, IBM, and Accenture.",
      },
      { property: "og:title", content: "About — Bhavin Shah" },
      { property: "og:description", content: "Background, education, and how I work." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const timeline = [
  {
    years: "2017 – 2025",
    role: "Staff Software Engineer",
    org: "Hewlett Packard Enterprise",
    where: "Mumbai, India",
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

const principles = [
  {
    title: "Product-first engineering",
    body: "Start with the user story and the workflow. Architecture serves the roadmap, not the other way around.",
  },
  {
    title: "Design systems compound",
    body: "One well-built component library pays interest for years. Invest early in tokens, a11y, and motion primitives.",
  },
  {
    title: "Accessibility is a merge gate",
    body: "WCAG 2.2 AA belongs in linters and CI — not in a Q4 audit.",
  },
  {
    title: "AI as a force multiplier",
    body: "Copilot and LLM reviews accelerate scaffolding and unblock refactors. Human judgement stays in the loop.",
  },
  {
    title: "Sustainability by default",
    body: "Green frontends are just good frontends: smaller bundles, fewer round-trips, respect for reduced motion.",
  },
  {
    title: "Write it down",
    body: "Notes, ADRs, and case studies keep decisions defensible and teams unblocked.",
  },
];

function AboutPage() {
  return (
    <div className="container-page py-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:items-start">
        <div className="md:sticky md:top-24">
          <div className="aspect-square w-full max-w-[15rem] overflow-hidden rounded-2xl border border-border">
            <img
              src={photo.url}
              alt="Bhavin Shah"
              className="h-full w-full scale-105 object-cover object-left"
            />
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <p className="font-mono text-xs text-muted-foreground">Based in Mumbai, India</p>
            <p className="font-mono text-xs text-muted-foreground">Open to remote & hybrid</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">About</p>
          <h1 className="display-serif mt-3 text-5xl sm:text-6xl">
            Fifteen years of turning ambiguity into shipped software.
          </h1>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90">
            <p>
              I'm a Technical Product Leader and Staff Software Engineer. I've spent my career
              sitting between product and engineering — talking to customers, drawing workflows,
              writing services, and reviewing pull requests in the same week.
            </p>
            <p>
              Most recently at HPE, I led five product initiatives from requirements to production,
              designed system architectures at both the workflow and API/DB level, and drove a React
              + Stencil component library that cut feature dev time by 30% across 8+ product teams.
            </p>
            <p>
              I care deeply about accessibility, sustainable frontends, and the craft of clear
              communication across cross-functional teams. I trained as a computer scientist (M.S.,
              Northeastern University; B.E., Mumbai University).
            </p>
          </div>

          <div className="mt-12">
            <p className="eyebrow inline-flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5" /> Education
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="card-surface p-4">
                <p className="font-medium">M.S. Computer Science</p>
                <p className="text-muted-foreground">Northeastern University, Boston, USA</p>
              </li>
              <li className="card-surface p-4">
                <p className="font-medium">B.E. Information Technology</p>
                <p className="text-muted-foreground">Mumbai University, India</p>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <p className="eyebrow inline-flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5" /> Experience
            </p>
            <ol className="mt-4 border-l border-border">
              {timeline.map((t) => (
                <li key={t.years + t.org} className="relative pl-6 pb-6 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-primary bg-background" />
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
          </div>

          <div className="mt-12">
            <p className="eyebrow">How I work</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {principles.map((p) => (
                <div key={p.title} className="card-surface p-5">
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
