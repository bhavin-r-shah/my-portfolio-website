import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/blog/llm-101")({
  component: Llm101Blog,
  head: () => ({
    meta: [
      { title: "LLM 101: Prompts, Tokens, and Context Windows — Bhavin Shah" },
      {
        name: "description",
        content:
          "A practical LLM 101 blog from handwritten AI engineering notes: what LLMs are, how tokens work, prompt structure, system prompts, and context windows.",
      },
      { property: "og:title", content: "LLM 101: Prompts, Tokens, and Context Windows" },
      {
        property: "og:description",
        content:
          "Beginner-friendly AI engineering notes with diagrams for LLM response generation and context windows.",
      },
      { property: "og:url", content: "/blog/llm-101" },
    ],
    links: [{ rel: "canonical", href: "/blog/llm-101" }],
  }),
});

const promptParts = ["Role", "Task", "Context", "Rules", "Output format"];
const colorParts = ["primary", "ring", "accent", "foreground", "destructive"];
const contextParts = [
  "User prompt",
  "System prompt",
  "Chat history",
  "Retrieved documents",
  "Tool results",
  "AI response",
];
const examplePromptParts = [
  "You are a senior AI engineer.",
  "Explain RAG to a beginner.",
  "The student is a Product Manager.",
  "Use simple language, avoid unnecessary math and give examples.",
  "Include the definition, why it matters and one example."
];

function Llm101Blog() {
  return (
    <article className="container-page my-10 sm:my-14">
      {/* Back Link */}
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>

      {/* Header */}
      <header className="mt-8 max-w-4xl">
        <p className="eyebrow">AI Engineering / LLM 101</p>
        <h1 className="display-serif mt-3 text-[1.4rem] sm:text-[1.8rem] text-primary">
          {/* <h2 className="display-serif text-[1.5rem] sm:text-[2rem]"></h2> */}
          LLM 101: prompts, tokens and context windows
        </h1>
        {/* <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          These are my first-principles notes while learning AI engineering: what a large language
          model is, why it feels smart without “thinking,” and how better prompts shape better
          outputs. The goal is to convert raw notes into interview-ready engineering clarity.
        </p> */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">Updated Jul 2026</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> 5 min read</span>
          <span className="inline-flex items-center gap-1"><Sparkles className="h-4 w-4" /> Built from handwritten notes</span>
        </div>
      </header>

      {/* LLM Intro */}
      <section className="mt-12">
        <div>
          <h2 className="text-2xl font-semibold">What is an LLM?</h2>
          <p className="mt-3 text-muted-foreground">
            LLM stands for Large Language Model. It is a system that is trained on a large dataset like the stock market history or all the languages in the world or the entire text on the web.
          </p>
          <p className="mt-3 text-muted-foreground">
            What is it trained for? LLM's job <ArrowRight className="inline h-4 w-4" /> Given an input, predict a response based on your training.
          </p>
        </div>
      </section>

      {/* LLM Response */}
      <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold">How does it respond?</h2>
          <p className="mt-3 text-muted-foreground">
            LLM does not think. It does not know the future.
          </p>
          <p className="mt-3 text-muted-foreground">
            It only knows the dataset and generates a response based on the patterns it learned during training plus the context you give in the prompt.
          </p>
          <p className="mt-3 text-muted-foreground">
            e.g. ChatGPT, Claude, Gemini, DeepSeek, Llama
          </p>
        </div>
        <LlmFlowDiagram />
      </section>

      {/* Token */}
      <Section title="Token">
        <p>
          A token is the smallest unit an LLM processes. It can be a word or a part of the word. Roughly 1 token is ~ 4 characters, but every
          model has its own tokenizer which decides how to break the text into tokens.
        </p>
        <ul>
          <li>Billing often depends on the number of input and output tokens consumed.</li>
          <li>Each token receives an internal ID before the model processes it.</li>
          <li>
            Tokenization is model-specific: <code>car</code> may stay one token <code>car</code>, while a longer word
            like <code>automobile</code> may split into 3 tokens <code>auto</code>, <code>mob</code> and <code>ile</code>.
          </li>
        </ul>
      </Section>

      {/* Prompt */}
      <Section title="Prompt">
        <p>
          Prompt is the instruction given to the model. 2 types: the user prompt and the system prompt.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Definition title="User prompt">
            The message written by the user i.e. the question you ask or task you give to ChatGPT. e.g.<br/>
            "Explain RAG to a beginner."<br/>
            "Modify my resume so that it is ATS compliant and has high ATS score."
          </Definition>
          <Definition title="System prompt">
            Instruction given to the LLM on what it needs to do. These are set when designing AI apps. e.g.<br />
            “You are a resume writer that modifies resumes to get high ATS scores."<br />
            "Do not add any skills or experience that the user has not provided in the resume.”
          </Definition>
        </div>
        <div className="mt-5">
          <h2 className="text-xl font-semibold text-foreground">A good prompt has five parts</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {promptParts.map((part, index) => (
              <span key={part} className={`rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm text-${colorParts[index]}`}>
                {index + 1}. {part}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-5">
          <p className="font-mono text-sm text-muted-foreground">Example prompt structure</p>
          <p className="mt-3 text-sm leading-7">
            {examplePromptParts.map((part, index) => (
              <span className={`text-${colorParts[index]}`}>{part} </span>
            ))}
          </p>
        </div>
        <div className="mt-5">
          <h2 className="text-xl font-semibold text-foreground">
            System prompt: Key to Success
          </h2>
          <p className="mt-3">
            System prompts are especially important as they define behavior,
            safety boundaries, and source-of-truth rules for the LLM before user input arrives. e.g.
          </p>
          <ul>
            <li>Answer only from provided or retrieved documents.</li>
            <li>If the answer is not in the documents, say “I don’t know.”</li>
            <li>Do not hallucinate; cite sources when possible.</li>
            <li>Use only retrieved documents, not the open internet, unless the app explicitly allows it.</li>
            <li>Ask a clarifying question when the request is ambiguous.</li>
          </ul>
        </div>
      </Section>

      <Section title="Context window">
        <p>
          Context window is how much data the model can look at in one request i.e. the maximum no. of tokens the model can attend to, at once. <br/>
          Once the window fills up, LLM compacts (summarizes) the data within the context window.
        </p>
        <ContextWindowDiagram />
      </Section>

      <section className="mt-12 rounded-3xl bg-primary p-8 text-primary-foreground">
        <h2 className="text-xl font-semibold text-primary-foreground">Takeaway</h2>
        <p className="mt-3 text-primary-foreground/85">
          Key to AI engineering is giving the right context to the LLM at the right time in the right amount.<br/>
          And that starts with a disciplined context design: choosing the right instructions, passing
          only relevant documents, providing necessary tools and modelling the response.
        </p>
      </section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 max-w-4xl space-y-4 text-muted-foreground [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-6">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card-surface p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function Definition({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function LlmFlowDiagram() {
  const nodes = [
    { x: 20, y: 25, w: 130, label: "Prompt" },
    { x: 220, y: 130, w: 160, label: "Post-trained data" },
    { x: 30, y: 155, w: 120, label: "Patterns" },
    { x: 245, y: 45, w: 95, label: "LLM" },
    { x: 455, y: 85, w: 145, label: "Predicts a response" },
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <svg viewBox="0 0 620 230" role="img" aria-label="LLM response generation flow" className="w-full">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-primary" />
          </marker>
        </defs>
        {nodes.map((n) => (
          <g key={n.label}>
            <rect x={n.x} y={n.y} width={n.w} height="42" rx="8" className="fill-secondary stroke-primary/40" />
            <text x={n.x + n.w / 2} y={n.y + 26} textAnchor="middle" className="fill-foreground text-[13px] font-medium">{n.label}</text>
          </g>
        ))}
        {/* User prompt --> LLM */}
        <path d="M152 46 C195 16 200 46 245 66" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
        {/* LLM --> Predicts a response */}
        <path d="M345 66 C390 66 410 106 455 106" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
        {/* <path d="M345 141 C390 141 410 120 455 120" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" /> */}
        {/* Patterns --> LLM */}
        <path d="M90 154 C155 70 35 95 245 85" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
        {/* Post-trained data --> LLM */}
        <path d="M285 130 L285 88" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
      </svg>
    </div>
  );
}

function ContextWindowDiagram() {
  return (
    <div className="mt-6 rounded-3xl border border-border bg-card p-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Context window contents</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {contextParts.map((part) => (
          <span key={part} className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground">
            {part}
          </span>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border-2 border-dashed border-primary/40 p-4 text-sm text-muted-foreground">
        All of these compete for the same token budget. If the request is too large, LLM compacts the context window and
         tries to keep the most relevant information, but that can cause accuracy loss causing LLM to hallucinate.
      </div>
    </div>
  );
}
