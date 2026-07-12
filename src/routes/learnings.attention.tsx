import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Clock, ExternalLink, Sparkles } from "lucide-react";

export const Route = createFileRoute("/learnings/attention")({
  component: AttentionBlog,
  head: () => ({
    meta: [
      { title: "Attention — Bhavin Shah" },
      {
        name: "description",
        content:
          "Beginner-friendly AI engineering notes on attention, token relationships, context, and next-token prediction.",
      },
      { property: "og:title", content: "Attention" },
      {
        property: "og:description",
        content:
          "A practical learning blog from handwritten notes explaining how attention helps LLMs decide which tokens matter.",
      },
      { property: "og:url", content: "/learnings/attention" },
    ],
    links: [{ rel: "canonical", href: "/learnings/attention" }],
  }),
});

const relationRows = [
  { token: "India", score: "0.95" },
  { token: "New Delhi", score: "0.96" },
  { token: "France", score: "0.92" },
  { token: "Coffee shop", score: "0.35" },
];

const attentionRows = [
  { token: "The", score: "0.02" },
  { token: "capital", score: "0.91" },
  { token: "of", score: "0.10" },
  { token: "is", score: "0.09" },
];

function AttentionBlog() {
  return (
    <article className="container-page my-10 sm:my-14">
      <Link to="/learnings" className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to learnings
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow">AI Engineering / Attention</p>
        <h1 className="display-serif mt-3 text-4xl text-primary sm:text-5xl">Attention</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">
            Updated Jul 2026
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> 9 min read
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Built from handwritten notes
          </span>
        </div>
      </header>

      <section className="mt-12 rounded-3xl bg-primary p-8 text-primary-foreground">
        <h2 className="text-2xl font-semibold text-primary-foreground">Beginner mental model</h2>
        <p className="mt-3 text-primary-foreground/85">
          Attention is the mechanism that helps an LLM decide: “When I am processing this token,
          what other words or tokens should I pay attention to?” It lets each token look at other
          tokens and decide which ones are important for understanding context or predicting the
          next token.
        </p>
      </section>

      <Section title="What is attention?">
        <ul>
          <li>
            Attention is a mechanism that helps an LLM decide: “When I am processing this word or
            token, what other words or tokens should I pay attention to?”
          </li>
          <li>
            Attention lets each token look at other tokens and decide which ones are important for
            the LLM to understand the context or predict the next token.
          </li>
          <li>Attention mechanism runs on a trained model.</li>
          <li>Attention is determined by relationships between tokens.</li>
        </ul>
        <p>
          The original Transformer paper,
          <a
            href="https://arxiv.org/abs/1706.03762"
            target="_blank"
            rel="noreferrer"
            className="mx-1 inline-flex items-center gap-1 text-accent underline-offset-4 hover:underline"
          >
            Attention Is All You Need <ExternalLink className="h-3 w-3" />
          </a>
          , made attention the central operation for modern language models.
        </p>
      </Section>

      <Section title="Example 1: attention when predicting the next token">
        <p className="font-medium text-foreground">The capital of India is _____</p>
        <p>
          During pre-training, an LLM sees lots of text. It may see examples like “India's capital,
          New Delhi,” “New Delhi, the capital of India,” “Red Fort is in New Delhi, India,” and
          “PM's residence is in New Delhi, India.”
        </p>
        <p>
          From repeated patterns, it learns that India and New Delhi are related. Both are like a
          place, but “India” and “New Delhi” are more closely related than “India” and “France” in
          this sentence context.
        </p>
        <RelationTable />
        <p>
          So when predicting the next token, the model has seen lots of text saying India and New
          Delhi are closely related. The vectors change so India and New Delhi point close together,
          and the LLM predicts “New Delhi.”
        </p>
      </Section>

      <Section title="Diagram: token relationships shape the next prediction">
        <TokenRelationDiagram />
      </Section>

      <Section title="Diagram: attention scores inside the sentence">
        <p className="font-medium text-foreground">The capital of India is _____</p>
        <p>
          When looking at the token “India,” the attention mechanism calculates a score between
          “India” and all other words. Because the model has seen many texts containing “capital”
          and “India” together, it knows they are related.
        </p>
        <AttentionScoreDiagram />
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-foreground">
              <tr>
                <th className="px-4 py-3">For token “India”, attention with</th>
                <th className="px-4 py-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {attentionRows.map((row) => (
                <tr key={row.token} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{row.token}</td>
                  <td className="px-4 py-3 font-mono text-primary">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Thus, attention knows that to understand the context of this sentence and to predict the
          next token, attention should be given to “capital.”
        </p>
      </Section>

      <Section title="Example 2: attention by understanding the pattern">
        <p className="font-medium text-foreground">
          The animal did not cross the road because it was tired.
        </p>
        <p>
          When the LLM looks at the token “it,” what other tokens should it attend to so that the
          LLM understands the context?
        </p>
        <p>The LLM asks a query: who was tired?</p>
        <ul>
          <li>
            The model is trained to know that “tired” is an adjective, and some noun in this
            sentence will tell who was tired.
          </li>
          <li>Two nouns appear: animal and road.</li>
          <li>The model has been trained that only living things can get tired.</li>
          <li>So it knows the animal was tired.</li>
        </ul>
        <PatternDiagram />
        <p>
          Hence, the attention score of “it” with “animal” is high. It understands the context by
          looking at patterns: “tired” belongs to a noun, only living things can be tired, and
          animal is a living thing while road is not.
        </p>
      </Section>

      <section className="mt-12 rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border">
        <h2 className="text-2xl font-semibold">Takeaway</h2>
        <p className="mt-3 text-muted-foreground">
          Attention is not magic. It is a learned scoring process. For each token, the model asks
          which other tokens are useful right now, assigns higher scores to the useful tokens, and
          uses that weighted context to understand meaning and predict what comes next.
        </p>
      </section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 max-w-4xl space-y-4 text-muted-foreground [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-6">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function DiagramCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

function RelationTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-secondary text-foreground">
          <tr>
            <th className="px-4 py-3">Text</th>
            <th className="px-4 py-3">Dimension: like a place</th>
          </tr>
        </thead>
        <tbody>
          {relationRows.map((row) => (
            <tr key={row.token} className="border-t border-border">
              <td className="px-4 py-3 font-medium text-foreground">{row.token}</td>
              <td className="px-4 py-3 font-mono text-primary">[{row.score}]</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TokenRelationDiagram() {
  return (
    <DiagramCard title="Pre-training evidence becomes a next-token prediction">
      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="rounded-2xl border border-border bg-secondary/50 p-4 text-sm">
          <p className="font-semibold text-foreground">Patterns seen during pre-training</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>India's capital, New Delhi</li>
            <li>New Delhi, the capital of India</li>
            <li>Red Fort is in New Delhi, India</li>
            <li>PM's residence is in New Delhi, India</li>
          </ul>
        </div>
        <ArrowRight className="mx-auto h-6 w-6 text-primary" />
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
          <p className="font-semibold text-foreground">Prediction</p>
          <p className="mt-3 text-muted-foreground">The capital of India is</p>
          <p className="mt-2 text-2xl font-semibold text-primary">New Delhi</p>
        </div>
      </div>
    </DiagramCard>
  );
}

function AttentionScoreDiagram() {
  const tokens = ["The", "capital", "of", "India", "is", "_____"];

  return (
    <DiagramCard title="India attends to the words around it">
      <svg
        viewBox="0 0 760 270"
        role="img"
        aria-label="Attention score diagram"
        className="mt-4 w-full"
      >
        <defs>
          <marker
            id="attentionArrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" className="fill-primary" />
          </marker>
        </defs>
        {tokens.map((token, index) => {
          const x = 40 + index * 115;
          return (
            <g key={token}>
              <rect
                x={x}
                y="170"
                width="90"
                height="42"
                rx="12"
                className="fill-secondary stroke-border"
              />
              <text x={x + 45} y="197" textAnchor="middle" className="fill-foreground text-[15px]">
                {token}
              </text>
            </g>
          );
        })}
        <path
          d="M430 170 C390 70 205 70 200 170"
          className="fill-none stroke-primary stroke-[5]"
          markerEnd="url(#attentionArrow)"
        />
        <path
          d="M430 170 C420 115 92 115 85 170"
          className="fill-none stroke-muted-foreground stroke-2 opacity-40"
          markerEnd="url(#attentionArrow)"
        />
        <path
          d="M430 170 C450 105 315 105 315 170"
          className="fill-none stroke-muted-foreground stroke-2 opacity-40"
          markerEnd="url(#attentionArrow)"
        />
        <text x="295" y="58" className="fill-primary text-[15px] font-semibold">
          high attention to “capital”
        </text>
        <text x="68" y="105" className="fill-muted-foreground text-[13px]">
          low
        </text>
        <text x="315" y="100" className="fill-muted-foreground text-[13px]">
          lower
        </text>
      </svg>
    </DiagramCard>
  );
}

function PatternDiagram() {
  return (
    <DiagramCard title="Resolving what “it” refers to">
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <PatternStep title="Pattern 1" text="Adjective ‘tired’ belongs to a noun." />
        <PatternStep title="Pattern 2" text="Only living things can be tired." />
        <PatternStep title="Pattern 3" text="Animal is a living thing; road is not." />
      </div>
      <div className="mt-5 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
        <p className="font-medium text-foreground">Attention result</p>
        <p className="mt-2 text-muted-foreground">
          The token “it” gives high attention to “animal,” so the sentence means the animal was
          tired.
        </p>
      </div>
    </DiagramCard>
  );
}

function PatternStep({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-4 text-sm">
      <p className="font-mono text-xs text-primary">{title}</p>
      <p className="mt-2 font-medium text-foreground">{text}</p>
    </div>
  );
}
