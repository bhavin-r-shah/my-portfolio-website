import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, Download, MapPin, Plane, Phone } from "lucide-react";
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
    <div className="container-page my-20">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <h1 className="display-serif text-[1.4rem] sm:text-[1.8rem]">
            Interested in working together?
          </h1>

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
            <a className="card-surface card-surface-hover flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">Phone</p>
                <p className="truncate font-mono text-xs text-muted-foreground">+91 7400272708</p>
              </div>
            </a>
            <a href={SOCIAL.github} target="_blank" rel="noreferrer" className="card-surface card-surface-hover flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Github className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">GitHub</p>
                <p className="truncate font-mono text-xs text-muted-foreground">github.com/bhavin-r-shah</p>
              </div>
            </a>
          </div>

          <div className="mt-8">
            <CtaLink href={resume.url} download={resume.original_filename} variant="primary">
              <Download className="h-4 w-4" /> Download Résumé
            </CtaLink>
          </div>
        </div>

        <aside className="card-surface p-6">
          <p className="eyebrow">At a glance</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Mumbai, India</p>
                <p className="text-accent">Open to remote, hybrid, or relocation.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              {/* <Clock className="mt-0.5 h-4 w-4 text-primary" /> */}
              <Plane className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">USA Visa Status</p>
                <p className="text-muted-foreground">Approved Perm and I 140. Require H1 B visa transfer</p>
              </div>
            </li>
          </ul>

          <div className="mt-6 rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">
            <p className="font-mono">// looking for</p>
            <p className="mt-2">Staff / Principal / Tech Lead roles bridging product & engineering.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
