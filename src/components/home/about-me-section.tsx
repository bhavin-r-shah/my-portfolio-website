import { ArrowRight } from "lucide-react";
import photo from "@/assets/bhavin-photo.asset.json";
import { CtaLink } from "@/components/cta-button";

export function AboutMeSection() {
  return (
    <>
      {/* ABOUT PREVIEW */}
      <section className="container-page py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-border">
            <img src={photo.url} alt="Bhavin Shah" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">About</p>
            <h2 className="display-serif mt-2 text-4xl sm:text-5xl">
              Product-minded. Engineering-native.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I trained as a computer scientist (M.S., Northeastern) and spent the last decade+
              shipping software at HPE, Nimble Storage, Intuit, IBM, and Accenture. I've owned
              features end-to-end — from customer discovery and system design through UI, APIs,
              storage, CI/CD, and iteration — and I lead teams as an Agile Scrum Master.
            </p>
            <div className="mt-6 flex gap-3">
              <CtaLink href="/about" variant="secondary">
                More about me <ArrowRight className="h-4 w-4" />
              </CtaLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
