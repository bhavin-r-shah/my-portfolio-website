import { skillGroups } from "./home-data";

export function SkillsSection() {
  return (
    <>
      {/* SKILLS SNAPSHOT */}
      <section className="container-page my-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="display-serif text-[1.4rem] sm:text-[1.8rem]">Skills</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </>
  );
}
