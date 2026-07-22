import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Clock, ExternalLink, Sparkles } from "lucide-react";

export const Route = createFileRoute("/blog/attention")({
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
      { property: "og:url", content: "/blog/attention" },
    ],
    links: [{ rel: "canonical", href: "/blog/attention" }],
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
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to blog posts
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow">AI Engineering / Attention</p>
        <h1 className="display-serif mt-3 text-[1.4rem] sm:text-[1.8rem] text-primary">Attention</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">
            Updated Jul 2026
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> 5 min read
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Built from handwritten notes
          </span>
        </div>
      </header>

      <Section title="What is attention?">
        <p>
          Q) How does LLM understand entire sentences or paragraphs? <br/>
          Q) How does it understand the context of the text? <br />
          Ans) <span className="text-primary">Attention Mechanism</span>
        </p>
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

      <Section title="Attention Score">
        <p>When LLM reads a word (token), it asks: What other related words shall I pay attention to so that I understand the sentence?</p>
        Let's take an example.
        <p>User Prompt: <span className="font-medium text-primary">The capital of India is _____ ?</span></p>
        <p>
          When looking at the token <span className="text-accent">“India”</span> the attention mechanism <span className="text-accent">calculates a score</span> between
          “India” and all other words in the sentence.
        </p>
        <p>
          Now during pre-training, the LLM has seen lots of text like:<br/>
          - “India's capital, New Delhi, .... ”<br/>
          - “New Delhi, the capital of India, ....”<br/>
          - “Red Fort is in New Delhi, India”<br/>
          - “PM's resides in the captial - New Delhi, India.”<br/>
        </p>
        
        <p>
          The model has seen the tokens “capital” and “India” together many times. So LLM determines that when looking at token India, the token Capital can help me understand the context of this sentence. So it gives a high attention score to token Capital.
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

      <Section title="Example 1: Attention when predicting the next token">
        <p>User Prompt: <span className="font-medium text-primary">The capital of India is _____ ?</span></p>
        <p>
          Now during pre-training, the LLM has seen lots of text like:<br/>
          - “India's capital, New Delhi, .... ”<br/>
          - “New Delhi, the capital of India, ....”<br/>
          - “Red Fort is in New Delhi, India”<br/>
          - “PM's resides in the captial - New Delhi, India.”<br/>
        </p>
        <p>
          From repeated patterns, it learns that India and New Delhi are related.
        </p>
        <RelationTable />
        <p>
          From the above table you can see that there are other places which are also semantically related to India like France (both are like a place, so vectors are close).
          So the answer to user's query can be France or New Delhi. <br/>
          But since the model has seen lots of text referring to India and New Delhi in the same context, it knows that India & New Delhi are more closely related than India & France.
          Hence when predicting the next token, the model predicts “New Delhi” instead of France.
        </p>
      </Section>

      <Section title="Example 2: attention by understanding the pattern">
        <p className="font-medium text-primary">
          The animal did not cross the road because it was tired.
        </p>
        <p>
          When the LLM looks at the token <span className="text-accent">“it”</span>, it asks: What other tokens should it attend to so that the
          LLM understands the context?
        </p>
        <p>The LLM asks a query: Who was tired?</p>
        <ul>
          <li>
            The model is trained to know that “tired” is an adjective, and some noun in this
            sentence will tell who was tired.
          </li>
          <li>Two nouns appear: animal and road.</li>
          <li>The model has been trained that only living things can get tired.</li>
          <li>So it knows the animal was tired and not road.</li>
        </ul>
        <p>
          Hence, the attention score of “it” with “animal” is high. It understands the context by
          looking at patterns: “tired” belongs to a noun, only living things can be tired, and
          animal is a living thing while road is not.
        </p>
      </Section>

      <section className="mt-12 rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border">
        <h2 className="text-2xl font-semibold text-ring">Takeaway</h2>
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


function AttentionScoreDiagram() {
  const tokens = ["The", "capital", "of", "India", "is", "_____"];

  return (
    <DiagramCard title="Attention between word 'India' and the words around it">
      <svg
        viewBox="0 40 760 200"
        role="img"
        aria-label="Attention score diagram"
        className="w-full"
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
          d="M430 170 C390 70 205 70 205 166"
          className="fill-none stroke-primary stroke-[3]"
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
        <text x="235" y="78" className="fill-primary text-[14px] font-semibold">
          high attention to “capital”
        </text>
        <text x="140" y="150" className="fill-muted-foreground text-[13px]">
          lower
        </text>
        <text x="335" y="150" className="fill-muted-foreground text-[13px]">
          low
        </text>
      </svg>
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
