import { createFileRoute } from "@tanstack/react-router";
import { CoreStrengths } from "@/components/home/core-strengths";
import { FeaturedWorkSection } from "@/components/home/featured-work-section";
import { HeroSection } from "@/components/home/hero-section";
import { LetsTalkSection } from "@/components/home/lets-talk-section";
import { SkillsSection } from "@/components/home/skills-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogSection } from "@/components/home/blog-section";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Bhavin Shah — Technical Product Leader & Staff Software Engineer" },
      {
        name: "description",
        content:
          "React, Go, cloud-native systems, design systems, and accessibility. 15 years bridging product and engineering.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  return (
    <>
      <HeroSection />
      <CoreStrengths />
      <SkillsSection />
      <FeaturedWorkSection />
      <BlogSection />
      <TestimonialsSection />
      {/* About Me section intentionally commented out. */}
      <LetsTalkSection />
    </>
  );
}
