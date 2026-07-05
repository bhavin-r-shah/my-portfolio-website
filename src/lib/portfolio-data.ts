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
      "Designed end-to-end systems — high-level (market needs, features, workflows, dependencies) and low-level (UX flows, UI interfaces, API & DB contracts, technology choices, test plan)",
      "Developed cloud-native microservices for Data Services Cloud Console (DSCC)",
      "Led development of reusable web components that worked across DSCC web services",
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
    title: "Accessibility & Sustainable Web Design",
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
    featured: true,

  },
  {
    slug: "nimble-array-gui",
    title: "Data Center Web App",
    // tagline: "Ember.js rebuild of a legacy GWT data-center UI at Nimble Storage.",
    // description:
    //   "Migrated the monitoring UI to Ember.js and instrumented Google Analytics to guide roadmap decisions with real usage data.",
    role: "Developer",
    company: "Nimble Storage",
    // year: "2015 – 2017",
    tags: ["Ember.js", "Google Analytics", "Google Web Toolkit (GWT)"],
    impact: [
      "Modernized the data center management & monitoring UI from legacy Google Web Toolkit to Ember.js",
      "Embedded user tracking via Google Analytics. Partnered with PM & UX to translate insights into roadmap decisions."
    ],
  },
  {
    slug: "intuit-full-time",
    title: "Business.intuit.com & Reputation Profile Web App",
    // tagline: "Ember.js rebuild of a legacy GWT data-center UI at Nimble Storage.",
    // description:
    //   "Migrated the monitoring UI to Ember.js and instrumented Google Analytics to guide roadmap decisions with real usage data.",
    role: "Developer",
    company: "Intuit",
    // year: "2015 – 2017",
    tags: ["AngularJS", "Google Analytics", "Java", "MongoDB", "Rest API", "Java Mail API", "MS Exchange Web Services", "FreeMarker"],
    impact: [
      "Developed a web app that manages the online reputation profile for businesses. Built it using AngularJS, HTML, CSS and Java Rest APIs that mined data using Java Mail API & MS exchange web services.",
      "Rebuilt business.intuit.com using jQuery, MongoDB and Java REST APIs. Engineered SEO-optimized webpages with FreeMarker template and embedded Google Analytics tracking."
    ],
  },
  {
    slug: "intuit-internship",
    title: "Intuit Internship",
    // tagline: "Ember.js rebuild of a legacy GWT data-center UI at Nimble Storage.",
    // description:
    //   "Migrated the monitoring UI to Ember.js and instrumented Google Analytics to guide roadmap decisions with real usage data.",
    role: "Developer",
    company: "Intuit",
    // year: "2015 – 2017",
    tags: ["DOJO", "Java", "HTML", "CSS"],
    impact: [
      "Developed Java REST web services and MCVS / SPA based web pages using DOJO 1.8 AMD JS, HTML and CSS."
    ],
  },
  {
    slug: "ibm-internship",
    title: "IBM Internship",
    // tagline: "Ember.js rebuild of a legacy GWT data-center UI at Nimble Storage.",
    // description:
    //   "Migrated the monitoring UI to Ember.js and instrumented Google Analytics to guide roadmap decisions with real usage data.",
    role: "Developer",
    company: "IBM",
    // year: "2015 – 2017",
    tags: ["Java", "Tomcat", "JAX-RS", "Jersey", "jQuery", "Multi-Threading"],
    impact: [
      "Built a multi-threaded client-server application in Java and Tomcat for server workload management, handling concurrent job execution.",
      "Developed REST APIs in JAX-RS, Jersey & Tomcat and a jQuery UI to track runtime job status."
    ],
  },
  {
    slug: "accenture",
    title: "Data Warehousing & ETL",
    // tagline: "Ember.js rebuild of a legacy GWT data-center UI at Nimble Storage.",
    // description:
    //   "Migrated the monitoring UI to Ember.js and instrumented Google Analytics to guide roadmap decisions with real usage data.",
    role: "Developer",
    company: "Accenture",
    // year: "2015 – 2017",
    tags: ["Java", "SQL", "Oracle", "SAS Base & Macros", "SAS Data Integration Tool"],
    impact: [
      "Re-engineered UNIX scripts.",
      "Built tool using Java Servlets, SQL, Oracle to fetch Informatica workflow stats.",
      "Developed SAS Base & Macros code and SAS Data Integration Tool jobs to update data warehouse tables."
    ],
  },
];
