import { Download, Github, Linkedin, Mail } from "lucide-react";
import resume from "@/assets/resume.asset.json";
import { CtaLink } from "@/components/cta-button";
import { SOCIAL } from "@/components/site-footer";

export function LetsTalkSection() {
  return (
    <>
      {/* FINAL CTA */}
      <section className="container-page my-20">
        <div
          className="card-surface relative overflow-hidden p-8 sm:p-14"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 10%, var(--card)), var(--card))",
          }}
        >
          <p className="eyebrow">Let's talk</p>
          <h2 className="display-serif mt-3 max-w-3xl text-[1.8rem] sm:text-[2.4rem]">
            Interested in working together?
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            View my résumé, explore my GitHub, or contact me directly.
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
