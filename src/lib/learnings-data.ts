export type LearningCategory =
  | "AI Engineering"
  | "React / Frontend"
  | "DSA Patterns"
  | "Sustainable Web"
  | "System Design Basics";

export interface Learning {
  slug: string;
  title: string;
  summary: string;
  category: LearningCategory;
  readingTime: string;
  updated: string;
  href: string;
}

export const categories: LearningCategory[] = [
  "AI Engineering",
  // "React / Frontend",
  // "DSA Patterns",
  // "Sustainable Web",
  // "System Design Basics",
];

export const learnings: Learning[] = [
  {
    slug: "llm-101",
    title: "LLM 101: Prompts, Tokens, and Context Windows",
    summary:
      "A beginner-friendly mental model for how LLMs generate responses, how tokens drive cost, and how to write prompts with role, task, context, rules, and output format.",
    category: "AI Engineering",
    readingTime: "7 min",
    updated: "Jul 2026",
    href: "/learnings/llm-101",
  },
  // {
  //   slug: "shipping-with-copilot",
  //   title: "Shipping Faster with GitHub Copilot Without Losing Rigor",
  //   summary:
  //     "How I use Copilot and VS Code AI extensions for scaffolding, refactors, and reviews — with guardrails so quality doesn't slide.",
  //   category: "AI Engineering",
  //   readingTime: "6 min",
  //   updated: "May 2026",
  //   href: "/learnings/shipping-with-copilot",
  // },
  // {
  //   slug: "prompting-for-code-review",
  //   title: "Prompt Patterns for Code Review Bots",
  //   summary:
  //     "Structured prompts that make LLM reviews useful: role, contract, invariants, and diff-scoped context.",
  //   category: "AI Engineering",
  //   readingTime: "7 min",
  //   updated: "Apr 2026",
  //   href: "/learnings/prompting-for-code-review",
  // },
  // {
  //   slug: "react-suspense-loaders",
  //   title: "Data Loading with Suspense + Router Loaders",
  //   summary:
  //     "Why moving fetching into route loaders beats useEffect for perceived performance and error boundaries.",
  //   category: "React / Frontend",
  //   readingTime: "8 min",
  //   updated: "Mar 2026",
  //   href: "/learnings/react-suspense-loaders",
  // },
  // {
  //   slug: "design-tokens-tailwind-v4",
  //   title: "Design Tokens in Tailwind v4: @theme in Practice",
  //   summary:
  //     "Moving from tailwind.config.js to CSS-first tokens without breaking component variants.",
  //   category: "React / Frontend",
  //   readingTime: "5 min",
  //   updated: "Feb 2026",
  //   href: "/learnings/design-tokens-tailwind-v4",
  // },
  // {
  //   slug: "sliding-window-cheatsheet",
  //   title: "The Sliding Window Pattern — A Working Cheatsheet",
  //   summary:
  //     "Fixed vs. variable windows, template code in TypeScript, and the four problem shapes that keep coming back.",
  //   category: "DSA Patterns",
  //   readingTime: "9 min",
  //   updated: "Jan 2026",
  //   href: "/learnings/sliding-window-cheatsheet",
  // },
  // {
  //   slug: "graph-bfs-templates",
  //   title: "BFS Templates: Grid, Multi-Source, Bidirectional",
  //   summary:
  //     "One mental model, three variants. When to use each and how to avoid re-visiting bugs.",
  //   category: "DSA Patterns",
  //   readingTime: "6 min",
  //   updated: "Dec 2025",
  //   href: "/learnings/graph-bfs-templates",
  // },
  // {
  //   slug: "green-frontend-checklist",
  //   title: "A Green Frontend Checklist That Actually Ships",
  //   summary:
  //     "Tree shaking, CDN posture, image discipline, lazy routes, dark theme, and reduced-motion — mapped to Web Vitals.",
  //   category: "Sustainable Web",
  //   readingTime: "10 min",
  //   updated: "Nov 2025",
  //   href: "/learnings/green-frontend-checklist",
  // },
  // {
  //   slug: "system-design-primer-101",
  //   title: "System Design 101 for Product-Minded Engineers",
  //   summary:
  //     "A pragmatic sequence: users → workflows → contracts → data → services → SLOs. What to draw first, and why.",
  //   category: "System Design Basics",
  //   readingTime: "12 min",
  //   updated: "Oct 2025",
  //   href: "/learnings/system-design-primer-101",
  // },
  // {
  //   slug: "caching-layers",
  //   title: "Choosing the Right Cache Layer",
  //   summary:
  //     "Browser, CDN, gateway, service, and DB. A decision matrix based on read patterns and freshness needs.",
  //   category: "System Design Basics",
  //   readingTime: "8 min",
  //   updated: "Sep 2025",
  //   href: "/learnings/caching-layers",
  // },
];
