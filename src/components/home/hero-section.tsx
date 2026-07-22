import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import photo from "@/assets/bhavin-photo.asset.json";
import resume from "@/assets/resume.asset.json";
import { CtaLink } from "@/components/cta-button";
import { SOCIAL } from "@/components/site-footer";

export function HeroSection() {
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
        <div className="container-page grid gap-12 py-6 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] md:items-center md:py-10 lg:gap-16">
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
            {/* <h1 className="display-serif mt-6 text-[1.5rem] sm:text-[1.8rem] md:text-[2.4rem]">
        Leading the intersection of user-centric{" "}
        <span className="italic text-primary">product strategy</span> and{" "}
        <span className="italic text-accent">resilient engineering.</span>
      </h1> */}

            <h1 className="display-serif mt-6 text-[1.4rem] sm:text-[1.8rem]">
              <span className="italic text-primary">Product-Minded.</span>{" "}
              <span className="italic text-accent">Engineering-Native</span>
            </h1>
            {/* Hero subtext */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              I’m <span className="font-medium text-foreground">Bhavin Shah</span> — a
              <span className="italic text-primary"> full-stack </span>
              engineer with <span className="italic text-accent">15 years</span> of experience
              bridging product and engineering. I've delivered cloud-native microservices & web
              applications across distributed teams. I've owned features end-to-end — from customer
              discovery to system design & development. I have translated customer needs into roadmaps & driven
              product strategy as Agile Scrum Master.
            </p>

            {/* Hero Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href="/experience" variant="primary">
                View Experience <ArrowRight className="h-4 w-4" />
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
    </>
  );
}
