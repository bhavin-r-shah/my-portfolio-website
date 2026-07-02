import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink } from "lucide-react";
import resume from "@/assets/resume.asset.json";
import { CtaLink } from "@/components/cta-button";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
  head: () => ({
    meta: [
      { title: "Résumé — Bhavin Shah" },
      { name: "description", content: "Download or preview Bhavin Shah's résumé — Technical Product Leader & Staff Software Engineer with 15 years of experience." },
      { property: "og:title", content: "Résumé — Bhavin Shah" },
      { property: "og:description", content: "Preview & download the latest résumé." },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
});

function ResumePage() {
  return (
    <div className="container-page py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Résumé</p>
          <h1 className="display-serif mt-3 text-5xl sm:text-6xl">The one-page version.</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            The full document is here to preview or download. For deeper
            context on any role, see <span className="text-foreground">/experience</span>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaLink href={resume.url} target="_blank" rel="noreferrer" variant="primary">
            <Download className="h-4 w-4" /> Download PDF
          </CtaLink>
          <CtaLink href={resume.url} target="_blank" rel="noreferrer" variant="secondary">
            <ExternalLink className="h-4 w-4" /> Open in new tab
          </CtaLink>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
        <object
          data={resume.url}
          type="application/pdf"
          className="h-[80vh] w-full"
          aria-label="Bhavin Shah résumé PDF"
        >
          <div className="p-10 text-sm text-muted-foreground">
            Your browser can't display PDFs inline.{" "}
            <a href={resume.url} className="text-primary underline">Download the résumé instead.</a>
          </div>
        </object>
      </div>
    </div>
  );
}
