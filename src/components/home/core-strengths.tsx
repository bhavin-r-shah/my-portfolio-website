import { Code2, Heart, Palette, type LucideIcon } from "lucide-react";

type CoreStrength = {
  icon: LucideIcon;
  label: string;
  value: string;
  span: string;
  glow?: boolean;
  sub?: string;
  emphasis?: string;
  italic?: boolean;
};

const coreStrengths: CoreStrength[] = [
  {
    icon: Code2,
    label: "End to End Ownership",
    value:
      "System architecture, UX, API & DB design, UI & BE development, deployment and iterative improvement",
    span: "lg:col-span-3",
  },
  {
    icon: Palette,
    label: "UI/UX & Design Systems",
    value: "Designed & developed UI component library reducing dev time by ~30% across 8+ products",
    span: "lg:col-span-3",
  },
  {
    icon: Heart,
    label: "Passion: Accessibility & Sustainability",
    value:
      "Responsive & WCAG 2.2 AA-compliant UI; Sustaniable web design, optimized bundle size, curated API traffic",
    glow: true,
    span: "lg:col-span-4",
  },
];

export function CoreStrengths() {
  return (
    <>
      {/* Core Strengths */}
      <section className="container-page mt-5 mb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="display-serif text-4xl sm:text-5xl">Core Strengths</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-5 overflow-hidden rounded-2xl border border-border bg-border/60 shadow-sm lg:grid-cols-10 lg:gap-px">
          {coreStrengths.map(({ icon: Icon, label, value, sub, emphasis, italic, glow, span }) => (
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
    </>
  );
}
