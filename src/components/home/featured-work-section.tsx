import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";

export function FeaturedWorkSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
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
    </>
  );
}
