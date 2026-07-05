export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  company: string;
  tags: string[];
  impact: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "ui-component-library",
    title: "Enterprise UI Component Library",
    tagline: "~60 reusable components adopted across 8+ products.",
    description:
      "Designed component patterns in Figma and led development of a React + Stencil.js component library styled with Tailwind CSS. Standardized tokens, motion, and a11y primitives across the org.",
    role: "Tech Lead · Co-Designer & Developer",
    company: "HPE",
    tags: ["React", "Stencil.js", "Tailwind", "Figma"],
    impact: [
      "Reduced feature dev time by ~30% across 8+ product teams",
    ],
    featured: true,
  },
  {
    slug: "cloud-microservices-platform",
    title: "Cloud-Native Microservices",
    tagline: "Go, gRPC, Kafka, PostgreSQL",
    description:
      "Owned system architecture end-to-end: high-level workflows, API and DB contracts, and low-level service design. Migrated CI/CD from Jenkins to GitHub Actions.",
    role: "Tech Lead · Co-Designer & Developer",
    company: "HPE",
    tags: ["Go", "gRPC", "Kafka", "PostgreSQL", "Redis", "Docker"],
    impact: [
      "Delivered 5 product initiatives from requirements to production",
      "Standardized retry, debounce & stale-data patterns across services",
      "Cut CI runtime with parallelized GitHub Actions pipelines",
    ],
    featured: true,
  },
  {
    slug: "sustainable-web-poc",
    title: "Sustainable Web Application POC",
    tagline: "Cutting client-side energy use through frontend engineering.",
    description:
      "Explored a green-by-design frontend: tree-shaken bundles, CDN-first delivery, curated API calls, lazy loading, dark theme, SVG sprites, and reduced-motion respect.",
    role: "Full-Stack Engineer",
    year: "2024",
    tags: ["Sustainability", "Performance", "Web Vitals", "CDN"],
    impact: [
      "Reduced data transfer per session by ~40% in benchmark flows",
      "Documented an internal green-web checklist for product teams",
      "Measured energy proxy via CPU + network idle time",
    ],
    featured: true,
  },
  {
    slug: "visual-regression-guard",
    title: "PR-Time Visual Regression Guard",
    tagline: "Cypress + GitHub Actions bot that catches UI regressions on every commit.",
    description:
      "Snapshots critical UI states per PR, diffs against baseline, and posts inline results. Cut post-merge visual bugs to near-zero on adopting teams.",
    role: "Author",
    year: "2023",
    tags: ["Cypress", "GitHub Actions", "Testing"],
    impact: [
      "Blocks regressions before merge with human-readable diffs",
      "Baseline updates via a single label on the PR",
    ],
  },
  {
    slug: "a11y-linters",
    title: "Accessibility Linters & Test Harness",
    tagline: "Org-wide adoption of WCAG 2.2 AA via linting + Cypress a11y tests.",
    description:
      "Wrote lint rules and Cypress helpers that fail builds on axe violations. Ran enablement sessions to drive adoption across product teams.",
    role: "Accessibility Lead",
    year: "2023",
    tags: ["A11y", "ESLint", "Cypress", "axe-core"],
    impact: [
      "Established a11y as a merge-blocking quality gate",
      "Trained 40+ engineers on assistive-tech testing",
    ],
  },
  {
    slug: "analytics-driven-ui",
    title: "Analytics-Driven UI Modernization",
    tagline: "Ember.js rebuild of a legacy GWT data-center UI at Nimble Storage.",
    description:
      "Migrated the monitoring UI to Ember.js and instrumented Google Analytics to guide roadmap decisions with real usage data.",
    role: "Senior Engineer",
    year: "2015 – 2017",
    tags: ["Ember.js", "Google Analytics", "UX"],
    impact: [
      "Traded legacy GWT for a modern SPA with measurable UX gains",
      "Fed analytics into PM/UX planning cycles",
    ],
  },
];
