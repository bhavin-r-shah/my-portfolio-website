export interface Project {
  slug: string;
  title: string;
  tagline?: string;
  description?: string;
  role: string;
  company: string;
  tags: string[];
  impact: string[];
  repo?: string;
  live?: string;
  year?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "cloud-app-development",
    title: "Cloud-Native Microservices & Web Components",
    // tagline: "Go, gRPC, Kafka, PostgreSQL",
    // description:
    //   "Developedd cloud native microservices and reusable web components",
    role: "Developer · Project Lead",
    company: "Hewlett Packard Enterprise",
    tags: ["Go", "gRPC", "Kafka", "PostgreSQL", "Redis", "Docker","StencilJS", "Tailwind CSS"],
    impact: [
      "Designed end-to-end systems — high-level (market needs, features, end-to-end workflows, dependencies) and low-level (UX flows, UI interfaces, API & DB contracts, technology choices, test plan)",
      "Developed cloud-native microservices for Data Services Cloud Console",
      "Led development of reusable web components that interacted with these web services",
      "Migrated CI/CD from Jenkins to GitHub Actions"
    ],
    featured: true,
  },
  {
    slug: "ui-component-library",
    title: "React UI Component Library",
    // tagline: "~60 reusable components adopted across 8+ products.",
    // description:
    //   "Designed component patterns in Figma and  styled with Tailwind CSS.",
    role: "Tech Lead · Co - UX Designer · Developer",
    company: "Hewlett Packard Enterprise",
    tags: ["React", "Tailwind", "Figma"],
    impact: ["Co-designed component patterns in Figma", "Led development of a React component library with ~60 reusable components", "Reduced feature dev time by ~30% across 8+ product teams"],
    featured: true,
  },
  {
    slug: "visual-regression-guard",
    title: "PR-Time Visual Regression Guard",
    role: "Tech Lead  · Developer",
    company: "Hewlett Packard Enterprise",
    tags: ["Cypress", "GitHub Actions", "Testing"],
    impact: [
      "Architected a tool with Cypress & GitHub Actions to automatically detect UI visual regressions on each PR commit",
      "Developed automated GitHub Actions workflow that snapshots critical UI states per PR --> diffs against baseline image --> posts the diff image and a detailed report",
      "Attached human-readable PR diffs showing the Baseline, comparison and diff images",
    ],
  },
  {
    slug: "a11y-&-sustainability-POC",
    title: "Side Projects: Accessibility & Sustainable Web Design",
    // tagline: "Org-wide adoption of WCAG 2.2 AA via linting + Cypress a11y tests.",
    // description:
    //   "Wrote lint rules and Cypress helpers that fail builds on axe violations. Ran enablement sessions to drive adoption across product teams.",
    role: "Developer",
    company: "Hewlett Packard Enterprise",
    // year: "2023",
    tags: ["A11y", "ESLint", "WCAG 2.2 AA", "axe-core", "Sustainability", "Performance", "Green UI", "CDN"],
    impact: [
      "Trained UI Chapter on adoption of UI Accessibility WCAG 2.2 AA standards. Built POC that implemented A11y using linters & Cypress tests and enabled keyboard, mouse & screen reader accessibility",
      "Explored a green-by-design frontend to reduce data transfer & client side energy consumption. Design Themes: Optimize bundle size using tree shaking & minification, CDN-first delivery, curated API calls, lazy loading, dark theme, SVG sprites"
    ],
  },
  {
    slug: "analytics-driven-ui",
    title: "Analytics-Driven UI Modernization",
    tagline: "Ember.js rebuild of a legacy GWT data-center UI at Nimble Storage.",
    description:
      "Migrated the monitoring UI to Ember.js and instrumented Google Analytics to guide roadmap decisions with real usage data.",
    role: "Senior Engineer",
    company: "Nimble Storage",
    year: "2015 – 2017",
    tags: ["Ember.js", "Google Analytics", "UX"],
    impact: [
      "Traded legacy GWT for a modern SPA with measurable UX gains",
      "Fed analytics into PM/UX planning cycles",
    ],
  },
];
