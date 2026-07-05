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
      "I've had the pleasure of working closely with Bhavin and continue to be impressed by his problem-solving abilities, sharp analytical mindset, and collaborative nature. He approaches challenges with clarity and focus, consistently offering thoughtful and effective solutions that drive results. Bhavin has a natural ability to think outside the box while staying grounded in what's practical. He's an excellent collaborator, equally comfortable working alongside peers or engaging with leadership to move initiatives forward.",
    name: "Mandy Shen",
    role: "Staff Software Engineer at Nimble Storage",
    href: linkedinRecommendationsUrl,
  },
  {
    quote:
      "I highly recommend Bhavin Shah as an exceptional Engineer. I've had the pleasure of collaborating with Bhavin and have consistently been impressed by his technical prowess and his invaluable contributions to our team.\n\nBhavin possesses a comprehensive skill set across various programming languages, frameworks, system design, and testing. His problem-solving abilities are outstanding; he approaches complex challenges with a keen analytical mind and consistently delivers robust, well-debugged solutions.\n\nBeyond his technical expertise, Bhavin is an exemplary team member. He excels at collaboration and communication, always willing to share his knowledge and support his peers. His positive attitude and unwavering reliability make him a true asset to any project. I've also witnessed his strong mentorship qualities and his remarkable ability to quickly grasp new concepts, which speaks volumes about his commitment to continuous learning and his leadership potential.\n\nBhavin's contributions significantly enhance our team's success, and his dedication to quality and collaboration is evident in everything he does.",
    name: "Yashwanth Pinneka",
    role: "Principal Engineer at HPE",
    href: linkedinRecommendationsUrl,
  },
  {
    quote:
      "Bhavin has exceptional expertise across the full stack. On the front end, he has strong experience with React, Vite, Jest, and Cypress, and have played a key role in developing high-quality, reusable component libraries that drive consistency and scalability. His code reviews are thorough, insightful, and always aimed at elevating team standards. On the backend, he is equally skilled with Go, gRPC, REST APIs, and Postgres, making him a well-rounded and dependable engineer. Beyond technical skills, Bhavin is a great team player—approachable, collaborative, and always willing to help. Bhavin's positive attitude and willingness to share knowledge make him a joy to work with.",
    name: "Yugandhar Pathi",
    role: "Principal Cloud Developer at HPE",
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
    quote: "Bhavin demonstrates exceptional talent in front-end technologies, consistently delivering intuitive, responsive, and visually compelling user interfaces. His strong understanding of modern frameworks and keen attention to user experience make him a standout contributor in any development team. Beyond his front-end expertise, he shows a deep passion and commitment to backend development, frequently taking the initiative to learn new technologies, contribute to API design, and support system integration efforts. I feel Bhavin is truly a valuable and well-rounded engineer, easy to collaborate and work with.",
    name: "Vishnu Dutt Kidambi",
    role: "Senior Software Engineer at HPE",
    href: linkedinRecommendationsUrl,
  },
  {
    quote: "I consider Bhavin as a true front-end developer.  We both worked on a same front-end project and I was impressed by his ability to solve complex problems and his JavaScript skill.  He is overall a good software engineer who plans before starts coding and deeply cares about quality of the code, which you would see in his full unit test coverage. ",
    name: "Hemil Patel",
    role: "Senior Software Engineer at Retell AI",
    href: linkedinRecommendationsUrl,
  },
  {
    quote: "Bhavin joined our team as a junior engineer and over the last two years has impressed us with his capacity for hard work and independent software development and research. He learns new things quickly and as part of our team Bhavin translated UI designs into functional HTML5 Web UI's, researched and implemented several POP/IMAP/OUTLOOK data connectors, and handled a number of other design and software development tasks. When you first meet him Bhavin can appear to be a quiet person however he often comes up with many original ideas, is well organized and is always willing to go the extra mile. Bhavin is a competent engineer and an excellent team player!",
    name: "Chris Lesner",
    role: "Staff Software Engineer at Intuit Inc.",
    href: linkedinRecommendationsUrl,
  },
  {
    quote: "Bhavin worked with me on an innovative service for facilitating and managing on-line trust. He carried out tasks on the front end, using angular.js and on the back, creating REST services and business logic in java. Bhavin is a reliable and diligent young engineer. He was not only implementing his immediate assignment but also invested effort understanding goals of the entire system, how different parts fit together and what is critical for the over all success. Bhavin was also active contributing ideas to the project and had a positive presence on the team.",
    name: "Alex Ran",
    // role: "Senior Software Engineer at HPE",
    href: linkedinRecommendationsUrl,
  },
  {
    quote: "Bhavin is a highly driven engineer, who strives hard to learn and adapt quickly to new changes and technologies. He is passionate about problem solving, inspired to ideate methods that go beyond what was thought possible. Never afraid to ask when he was stuck or need help. He is exceptional in building relationships and putting himself in your shoes. It was a honor to work with him. ",
    name: "Nirmala Ranganathan",
    role: "Product Leader @ Amazon Search",
    href: linkedinRecommendationsUrl,
  },
  {
    quote: "Bhavin is a detail-oriented and a hard-working person. He is proficient in Java, creating RESTEasy web services and also excelled in front end technologies. He always strives to provide the best possible solution. He is passionate about rapid prototyping and is never short of ideas in brainstorming sessions. Bhavin is a good team player and gets on well with those around him.",
    name: "Madhumitha Loganathan",
    role: "Vice President, Core Platform - Mobile, J.P. Morgan",
    href: linkedinRecommendationsUrl,
  },
];