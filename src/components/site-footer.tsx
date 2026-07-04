import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import resumeAsset from "@/assets/resume.asset.json";

const SOCIAL = {
  github: "https://github.com/bhavin-r-shah",
  linkedin: "https://www.linkedin.com/in/shah-bhavin-r/",
  email: "mailto:bhavinshah120986@gmail.com",
};

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display-serif text-3xl">Bhavin Shah</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Technical Product Leader & Staff Software Engineer. Bridging product and engineering
            across cloud-native, full-stack systems.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL.email}
              aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={resumeAsset.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Resume PDF"
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Site</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/experience" className="text-muted-foreground hover:text-foreground">
                Work Experience
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-muted-foreground hover:text-foreground">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/notes" className="text-muted-foreground hover:text-foreground">
                Learnings
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SOCIAL.email} className="text-muted-foreground hover:text-foreground">
                Email
              </a>
            </li>
            <li>
              <a
                href={resumeAsset.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Bhavin Shah. Built with React, TanStack Start & Tailwind.
          </p>
          <p className="font-mono">v1.0 · handcrafted in Durham, NC</p>
        </div>
      </div>
    </footer>
  );
}

export { SOCIAL };
