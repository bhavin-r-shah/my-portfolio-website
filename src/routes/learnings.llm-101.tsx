import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/learnings/llm-101")({
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
      { property: "og:url", content: "/learnings/llm-101" },
    ],
    links: [{ rel: "canonical", href: "/learnings/llm-101" }],
  }),
});

const promptParts = ["Role", "Task", "Context", "Rules", "Output format"];
const contextParts = [
  "User prompt",
  "System prompt",
  "Chat history",
  "Retrieved documents",
  "Tool results",
  "AI response",
];

function Llm101Blog() {
  return (
    <article className="container-page my-10 sm:my-14">
      <Link to="/learnings" className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to learnings
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow">AI Engineering / LLM 101</p>
        <h1 className="display-serif mt-3 text-4xl sm:text-5xl text-primary">
          {/* <h2 className="display-serif text-4xl sm:text-5xl"></h2> */}
          LLM 101: prompts, tokens, and context windows
        </h1>
        {/* <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          These are my first-principles notes while learning AI engineering: what a large language
          model is, why it feels smart without “thinking,” and how better prompts shape better
          outputs. The goal is to convert raw notes into interview-ready engineering clarity.
        </p> */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">Updated Jul 2026</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> 7 min read</span>
          <span className="inline-flex items-center gap-1"><Sparkles className="h-4 w-4" /> Built from handwritten notes</span>
        </div>
      </header>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Mental model: how an LLM responds</h2>
          <p className="mt-3 text-muted-foreground">
            An LLM is a large language model trained on a large dataset. At runtime, it combines the
            prompt, the patterns it learned during training, and the context available in the request
            to predict a useful response.
          </p>
        </div>
        <LlmFlowDiagram />
      </section>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Callout title="It predicts; it does not know the future">
          LLMs generate likely continuations from learned patterns plus the context you provide.
        </Callout>
        <Callout title="Examples">
          ChatGPT, Claude, Gemini, DeepSeek, and Llama are familiar examples of LLM-powered systems.
        </Callout>
        <Callout title="Engineering takeaway">
          Better context and clearer constraints usually matter more than clever wording.
        </Callout>
      </div>

      <Section title="Tokens: the unit LLMs process">
        <p>
          A token is the smallest unit an LLM processes. It can be a word, a piece of a word, or even
          punctuation. A rough planning shortcut is that one token is about four characters, but every
          model has its own tokenizer.
        </p>
        <ul>
          <li>Billing often depends on the number of input and output tokens consumed.</li>
          <li>Each token receives an internal ID before the model processes it.</li>
          <li>
            Tokenization is model-specific: <code>car</code> may stay one token, while a longer word
            like <code>automobile</code> may split into smaller pieces.
          </li>
        </ul>
      </Section>

      <Section title="Prompts: instructions given to the model">
        <p>
          A prompt is the instruction package sent to the model. The handwritten notes separate two
          important types: the user prompt and the system prompt.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Definition title="User prompt">
            The message written by the user, such as the question or task typed into ChatGPT.
          </Definition>
          <Definition title="System prompt">
            Higher-priority instructions used when designing AI apps, such as “You are a helpful
            assistant that answers only from the provided documents.”
          </Definition>
        </div>
      </Section>

      <Section title="A good prompt has five parts">
        <div className="mt-5 flex flex-wrap gap-2">
          {promptParts.map((part, index) => (
            <span key={part} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm">
              {index + 1}. {part}
            </span>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-5">
          <p className="font-mono text-sm text-muted-foreground">Example prompt structure</p>
          <p className="mt-3 text-sm leading-7">
            <strong>Role:</strong> You are a senior AI engineer. <strong>Task:</strong> Explain RAG to
            a beginner. <strong>Context:</strong> The student is a UI engineer. <strong>Rules:</strong>
            Use simple language, avoid unnecessary math, and give examples. <strong>Output format:</strong>
            Include the definition, why it matters, and one example.
          </p>
        </div>
      </Section>

      <Section title="System prompts create guardrails">
        <p>
          System prompts are especially important in AI applications because they define behavior,
          safety boundaries, and source-of-truth rules before user input arrives.
        </p>
        <ul>
          <li>Answer only from provided or retrieved documents.</li>
          <li>If the answer is not in the documents, say “I don’t know.”</li>
          <li>Do not hallucinate; cite sources when possible.</li>
          <li>Use only retrieved documents, not the open internet, unless the app explicitly allows it.</li>
          <li>Ask a clarifying question when the request is ambiguous.</li>
        </ul>
      </Section>

      <Section title="Context window: what the model can attend to at once">
        <p>
          The context window is the maximum amount of data the model can look at in one request. It is
          measured in tokens. Once the window fills up, the application or model has to compact,
          summarize, truncate, or retrieve more focused data.
        </p>
        <ContextWindowDiagram />
      </Section>

      <section className="mt-12 rounded-3xl bg-primary p-8 text-primary-foreground">
        <h2 className="text-2xl font-semibold text-primary-foreground">My practical takeaway</h2>
        <p className="mt-3 max-w-3xl text-primary-foreground/85">
          LLM engineering starts with disciplined context design: choose the right instructions, pass
          only relevant documents, constrain the response, and make uncertainty explicit. That is the
          difference between a demo that feels magical and a product that users can trust.
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
    { x: 20, y: 85, w: 130, label: "User prompt" },
    { x: 185, y: 120, w: 160, label: "Post-trained data" },
    { x: 70, y: 155, w: 120, label: "Patterns" },
    { x: 245, y: 45, w: 95, label: "LLM" },
    { x: 455, y: 85, w: 145, label: "Predicts a response" },
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-sm">
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
        <path d="M150 106 C195 106 200 66 245 66" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
        <path d="M345 66 C390 66 410 106 455 106" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
        <path d="M345 141 C390 141 410 120 455 120" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
        <path d="M190 176 C235 176 235 105 245 85" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
        <path d="M265 120 L285 88" className="fill-none stroke-primary stroke-2" markerEnd="url(#arrow)" />
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
        All of these compete for the same token budget. If the request is too large, compacting or
        summarizing keeps the most relevant information inside the window.
      </div>
    </div>
  );
}
