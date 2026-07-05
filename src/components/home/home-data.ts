import { Code2, Cpu, Gauge, Layers, Leaf, Palette, Sparkles } from "lucide-react";
import { SOCIAL } from "@/components/site-footer";

export const skillGroups = [
  {
    icon: Code2,
    label: "Frontend",
    items: [
      "ReactJS",
      "TypeScript",
      "StencilJS",
      "Tailwind CSS",
      "EmberJS",
      "AngularJS",
      "HTML",
      "Google Analytics",
    ],
  },
  {
    icon: Palette,
    label: "UX",
    items: ["WCAG 2.2 AA", "Design Systems", "Figma"],
  },
  {
    icon: Cpu,
    label: "Backend",
    items: ["Go (Golang)", "Java", "REST", "gRPC", "Kafka", "PostgreSQL", "Redis", "MongoDB"],
  },
  {
    icon: Gauge,
    label: "Quality",
    items: ["Cypress", "Jest", "BDD", "Gherkin"],
  },
  {
    icon: Layers,
    label: "Platform",
    items: ["GitHub Actions", "Jenkins", "Git", "Unix"],
  },
  {
    icon: Sparkles,
    label: "AI-Assisted Dev",
    items: ["GitHub Copilot", "Codex", "Lovable", "Vercel v0"],
  },
  {
    icon: Leaf,
    label: "Sustainability",
    items: ["Tree-shaking", "CDN-first", "Lazy loading", "Dark theme"],
  },
];

export const linkedinRecommendationsUrl = `${SOCIAL.linkedin}details/recommendations/`;

export const testimonials = [
  {
    quote:
      "I highly recommend Bhavin Shah as an exceptional Engineer. I've had the pleasure of collaborating with Bhavin and have consistently been impressed by his technical prowess and his invaluable contributions to our team.\n\nBhavin possesses a comprehensive skill set across various programming languages, frameworks, system design, and testing. His problem-solving abilities are outstanding; he approaches complex challenges with a keen analytical mind and consistently delivers robust, well-debugged solutions.\n\nBeyond his technical expertise, Bhavin is an exemplary team member. He excels at collaboration and communication, always willing to share his knowledge and support his peers. His positive attitude and unwavering reliability make him a true asset to any project. I've also witnessed his strong mentorship qualities and his remarkable ability to quickly grasp new concepts, which speaks volumes about his commitment to continuous learning and his leadership potential.\n\nBhavin's contributions significantly enhance our team's success, and his dedication to quality and collaboration is evident in everything he does.",
    name: "Yashwanth Pinneka",
    role: "Principal Engineer at HPE",
    href: linkedinRecommendationsUrl,
  },
  {
    quote:
      "I've had the pleasure of working with Bhavin on several projects, and he consistently demonstrates a deep understanding of frontend development coupled with a meticulous eye for design. His commitment to ensuring that applications not only function flawlessly but also provide a cohesive and intuitive user experience is truly commendable.\n\nBhavin's attention to detail in UI design ensures that every component aligns with the overall aesthetic and functionality of the application. He proactively identifies inconsistencies and addresses them, ensuring a polished final product that resonates with users.\n\nBeyond his UI expertise, Bhavin plays a pivotal role in maintaining the health of our continuous integration processes. His proactive approach to identifying and resolving issues ensures that our development pipeline remains smooth and efficient, minimizing disruptions and facilitating timely releases.\n\nWorking with Bhavin is a seamless experience. He communicates effectively, collaborates well with cross-functional teams, and always brings a solution-oriented mindset to the table. Any team would benefit immensely from his technical acumen and dedication to excellence.",
    name: "Guglielmo Turco",
    role: "Staff Software Engineer at HPE",
    href: linkedinRecommendationsUrl,
  },
  {
    quote:
      "I've had the pleasure of working closely with Bhavin and continue to be impressed by his problem-solving abilities, sharp analytical mindset, and collaborative nature. He approaches challenges with clarity and focus, consistently offering thoughtful and effective solutions that drive results. Bhavin has a natural ability to think outside the box while staying grounded in what's practical. He's an excellent collaborator, equally comfortable working alongside peers or engaging with leadership to move initiatives forward.",
    name: "Mandy Shen",
    role: "Staff Software Engineer at Nimble Storage",
    href: linkedinRecommendationsUrl,
  },
  {
    quote:
      "Bhavin has exceptional expertise across the full stack. On the front end, he has strong experience with React, Vite, Jest, and Cypress, and have played a key role in developing high-quality, reusable component libraries that drive consistency and scalability. His code reviews are thorough, insightful, and always aimed at elevating team standards. On the backend, he is equally skilled with Go, gRPC, REST APIs, and Postgres, making him a well-rounded and dependable engineer. Beyond technical skills, Bhavin is a great team player—approachable, collaborative, and always willing to help. Bhavin's positive attitude and willingness to share knowledge make him a joy to work with.",
    name: "Yugandhar Pathi",
    role: "Principal Cloud Developer at HPE",
    href: linkedinRecommendationsUrl,
  },
];
