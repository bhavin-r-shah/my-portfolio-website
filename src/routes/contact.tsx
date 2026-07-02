import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, Download, MapPin, Clock } from "lucide-react";
import { CtaLink } from "@/components/cta-button";
import resume from "@/assets/resume.asset.json";
import { SOCIAL } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Bhavin Shah" },
      { name: "description", content: "Get in touch with Bhavin Shah — email, LinkedIn, GitHub, or download the résumé." },
      { property: "og:title", content: "Contact — Bhavin Shah" },
      { property: "og:description", content: "Email, LinkedIn, GitHub, and résumé." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <div className="container-page py-20">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="display-serif mt-3 text-5xl sm:text-6xl">
            Interested in working together?
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            The fastest path is email. I read every message and reply within
            one business day. If you'd rather DM, LinkedIn works too.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={SOCIAL.email} className="card-surface card-surface-hover flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">Email</p>
                <p className="truncate font-mono text-xs text-muted-foreground">bhavinshah120986@gmail.com</p>
              </div>
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" className="card-surface card-surface-hover flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Linkedin className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">LinkedIn</p>
                <p className="truncate font-mono text-xs text-muted-foreground">shah-bhavin-r</p>
              </div>
            </a>
            <a href={SOCIAL.github} target="_blank" rel="noreferrer" className="card-surface card-surface-hover flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Github className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">GitHub</p>
                <p className="truncate font-mono text-xs text-muted-foreground">github.com/bhavinshah</p>
              </div>
            </a>
            <a href={resume.url} target="_blank" rel="noreferrer" className="card-surface card-surface-hover flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Download className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">Résumé (PDF)</p>
                <p className="truncate font-mono text-xs text-muted-foreground">Bhavin_Shah_Resume.pdf</p>
              </div>
            </a>
          </div>
        </div>

        <aside className="card-surface p-6">
          <p className="eyebrow">At a glance</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Durham, North Carolina</p>
                <p className="text-muted-foreground">Open to remote, hybrid, or relocation.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Response time</p>
                <p className="text-muted-foreground">Within one business day.</p>
              </div>
            </li>
          </ul>

          <div className="mt-6 rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">
            <p className="font-mono">// looking for</p>
            <p className="mt-2">Staff / Principal / Tech Lead roles bridging product & engineering. Especially interested in platforms, developer tooling, design systems, and applied AI.</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink href={SOCIAL.email} variant="primary">
              <Mail className="h-4 w-4" /> Email me
            </CtaLink>
          </div>
        </aside>
      </div>
    </div>
  );
}
