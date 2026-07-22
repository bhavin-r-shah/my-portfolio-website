import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "./home-data";

export function TestimonialsSection() {
  const [expandedTestimonials, setExpandedTestimonials] = useState<Record<string, boolean>>({});

  return (
    <>
      {/* TESTIMONIALS */}
      <section className="container-page my-10">
        <h2 className="display-serif mt-2 text-[1.96875rem] sm:text-[2.625rem]">Testimonials</h2>
        <Carousel
          opts={{ align: "start" }}
          className="mt-10"
          aria-label="LinkedIn recommendations"
        >
          <CarouselContent>
            {testimonials.map((t, index) => (
              <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
                <figure className="card-surface flex h-full flex-col p-6">
                  <div className="flex flex-1 flex-col border-b border-border">
                    <blockquote
                      id={`recommendation-${index}`}
                      className={`display-serif whitespace-pre-line text-[1.09375rem] leading-snug text-foreground ${
                        expandedTestimonials[t.name] ? "" : "line-clamp-5"
                      }`}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <button
                      type="button"
                      aria-expanded={Boolean(expandedTestimonials[t.name])}
                      aria-controls={`recommendation-${index}`}
                      className="mt-4 self-start text-sm font-medium text-primary underline-offset-4 hover:underline"
                      onClick={() =>
                        setExpandedTestimonials((current) => ({
                          ...current,
                          [t.name]: !current[t.name],
                        }))
                      }
                    >
                      {expandedTestimonials[t.name] ? "Show less" : "Read full recommendation"}
                    </button>
                  </div>

                  <figcaption className="my-4 text-sm">
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="text-muted-foreground">{t.role}</p>
                  </figcaption>

                  <a
                    href={t.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary"
                    aria-label={`Open ${t.name}'s LinkedIn recommendation`}
                  >
                    View on LinkedIn <ArrowUpRight className="h-4 w-4" />
                  </a>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 top-1/2 w-10 -translate-y-1/2 sm:-left-16" />
          <CarouselNext className="-right-4 left-auto top-1/2 w-10 -translate-y-1/2 sm:-right-16" />
        </Carousel>
      </section>
    </>
  );
}
