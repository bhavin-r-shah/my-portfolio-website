import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Clock,
  Database,
  FileText,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/learnings/rag-architecture")({
  component: RagArchitectureBlog,
  head: () => ({
    meta: [
      { title: "RAG: Architecture — Bhavin Shah" },
      {
        name: "description",
        content:
          "A beginner-friendly learning blog explaining Retrieval Augmented Generation, knowledge cutoffs, hallucination, vector databases, embeddings, retrieval, and the basic RAG architecture.",
      },
      { property: "og:title", content: "RAG: Architecture" },
      {
        property: "og:description",
        content:
          "Handwritten RAG notes converted into a clear beginner blog with architecture diagrams.",
      },
      { property: "og:url", content: "/learnings/rag-architecture" },
    ],
    links: [{ rel: "canonical", href: "/learnings/rag-architecture" }],
  }),
});

function RagArchitectureBlog() {
  return (
    <article className="container-page my-10 sm:my-14">
      <Link to="/learnings" className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to learnings
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow">AI Engineering / RAG</p>
        <h1 className="display-serif mt-3 text-[1.8rem] text-primary sm:text-[2.4rem]">RAG: Architecture</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">
            Updated Jul 2026
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> 12 min read
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Built from handwritten notes
          </span>
        </div>
      </header>

      <section className="mt-10 rounded-3xl bg-primary p-6 text-primary-foreground">
        <h2 className="text-xl font-semibold text-primary-foreground">Mental Model</h2>
        <p className="mt-3 text-primary-foreground/85">
          RAG is a sytem to provide extra relevant information to an LLM, so that the model can answer from your documents and not only from what it learned
          during training.
        </p>
      </section>

      <Section title="Why RAG exists">
        <p>LLMs have two common failures:</p>
        <p className="mt-3">
          1. <strong>Knowledge cutoff:</strong>
          <br />
          - Once the LLM has completed its training, it will not learn anything new.
          <br />
          - For example, if an LLM was trained on web development knowledge up to June 2025, it will
          not know features from a new React version released after June 2025.
          <br />- It also will not know your private component library and CSS styles because that
          data was not part of training.
        </p>
        <p className="mt-3">
          2. <strong>Hallucination:</strong>
          <br/> - If you ask an LLM something it does not know, it may
          guess. It will produce an answer, that too confidently. But the answer may be wrong, unrelated, or irrelevant.
          <br />- Since the model has to answer something, it can hallucinate instead of saying, “I do not
          know this.”
        </p>
      </Section>

      <Section title="RAG">
        <p>
          - RAG stands for Retrieval Augmented Generation.<br/>
          - Your RAG application is not part of the LLM. You build the RAG app to
          provide extra relevant information to the LLM, so when it answers, it can answer from data
          your RAG gave, its own training, the user prompt and the retrieved context.
          </p>

          <h2 className="text-l font-semibold text-foreground mt-5">RAG combines two memories</h2>
          <div className="grid gap-4 md:grid-cols-2 mt-3">
            <Callout title="1. Parametric memory">
              What the LLM already knows from the parameters it has already been trained on.
            </Callout>
            <Callout title="2. Non-parametric memory">
              External set of documents your model can read from when answering the question. It
              provides extra relevant context.
            </Callout>
          </div>

          <h2 className="text-l font-semibold text-foreground mt-5">Example:</h2>
          <p className="mt-3">
            User asks: <span className="text-ring">“What is the leave policy?”</span>
          </p>
          <div className="grid gap-5 lg:grid-cols-2 mt-3">
            <Callout title="Without RAG">
              The LLM may guess:
              <br />
              - “Typically 10 paid leaves” OR <br />
              - It may hallucinate: “Leave policy describes the company&apos;s rules on how an employee
              can take time off.”
            </Callout>
            <Callout title="With RAG">
              <ol>
                <li>1. User asks a question.</li>
                <li>2. RAG system searches company documents.</li>
                <li>3. It finds the leave policy.</li>
                <li>4. It sends the user prompt & the leave policy to the LLM.</li>
                <li>5. LLM answers using this retrieved leave policy.</li>
              </ol>
            </Callout>
          </div>
      </Section>

      <Section title="Basic RAG architecture" wide>
        <ArchitectureDiagram />
        {/* <p>
          The high-level path is: ingest data, split it into useful pieces, embed it, index it in a
          vector database, retrieve relevant chunks, and send the user query plus retrieved chunks
          to the LLM.
        </p> */}
      </Section>

      <Section title="1. Ingest">
        <p>
          - Provide the RAG app, extra relevant information like the company documents, codebase, design principles, user feedback etc.
          <br />
          - These could be PDFs, Word documents, web pages, code, GitHub links, support tickets,
          support logs, images, videos, or other internal sources.
          <br />- e.g. HR policies, GitHub repository, or support logs.
        </p>
      </Section>

      <Section title="2. Chunking">
        <p>
          - Split documents into smaller chunks
          <br />
          - If company data is large, not all of it will fit in the LLM context window. So when
          answering, the LLM may use only part of the company data or use summarized data, which can
          cause hallucination.
          <br />- <span className="text-primary">Chunking helps limit the LLM context window.</span>
        </p>
        <p className="mt-3">
          - For example, an HR policies document may become separate chunks for leave policy, travel
          policy, holiday calendar, and work-from-home policy.
          <br />- If the user asks “What is the leave policy?”, your RAG can retrieve only the
          relevant leave policy chunk, not the whole document.
        </p>
      </Section>

      <Section title="3. Embedding">
        <p>
          - Convert chunks to vectors.
          <br />- LLMs do not understand text directly; they understand vectors.<br />
          - The user query is
          also converted to an embedding. <span className="text-primary">Use the same embedding model for chunks and the user query
          so similar meaning tokens lands close together in the same vector space.</span>
        </p>
      </Section>

      <Section title="4. Vector database">
        <p className="mb-3">
          - Store embeddings in a vector database, such as Chroma DB, Pinecone, or Postgres with
          pgvector.
          <br />- We cannot use a regular SQL database since we are not doing text comparison or
          keyword search. We do vector comparison, hence we need vector DB.
        </p>
        <CodeBlock>{`{
  "id": "employee-policy-leave-001",
  "text": "Employees get 20 paid leaves per year",
  "embedding": [0.12, -0.44, 0.9],
  "metadata": {
    "source": "employee-handbook.pdf",
    "section": "HR - Leave Policy",
    "page": 12,
    "chunkIndex": 1
  }
}`}</CodeBlock>
      </Section>

      <Section title="5. Retrieval">
        <p>
          - Retrieval performs vector similarity search to compare the user query embedding vector with
          chunk vectors.
          <br />
          - It retrieves the top K chunks. These are the most relevant chunks likely to have the
          right data to feed the LLM.
          <br />- K is decided when designing the RAG system.
        </p>
      </Section>

      <Section title="Final generation step">
        <p className="mb-3">
          The LLM gets the user query vector & relevant chunks from RAG. The LLM answers using this
          additional context.
        </p>
        <GenerationDiagram />
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section className={wide ? "mt-12 w-full max-w-none" : "mt-12 max-w-4xl"}>
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="prose prose-neutral mt-4 max-w-none text-muted-foreground prose-li:my-1 prose-strong:text-foreground">
        {children}
      </div>
    </section>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function FlowBox({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <div
      className={
        accent
          ? "rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-center font-semibold text-primary"
          : "rounded-xl border border-border bg-background px-4 py-3 text-center font-semibold text-foreground"
      }
    >
      {children}
    </div>
  );
}

function Arrow() {
  return <ArrowRight className="mx-auto h-5 w-5 text-accent md:rotate-0" />;
}

function ArchitectureDiagram() {
  const documentCards = ["Company Policies", "Latest Papers", "Support Tickets"];
  const chunks = ["Leave policy","Holiday Calendar", "WFH Policy", "Travel policy"];
  const embeddingBars = ["w-8", "w-12", "w-10"];

  return (
    <div className="not-prose overflow-hidden rounded-3xl border border-border bg-secondary/40 p-5 sm:p-6">
      <div className="mb-6 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-ring">
          Offline Indexing + Online Retrieval
        </p>
        {/* <h3 className="mt-2 text-xl font-semibold text-foreground">Basic RAG Architecture</h3> */}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-start">
        <DiagramBoundary
          title="Offline"
          caption="Prepare knowledge before the user asks a question"
        >
          <DiagramStep number={1} title="Ingest" caption="Supply extra relevant information">
            <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              {documentCards.map((document) => (
                <div
                  key={document}
                  className="rounded-xl border border-border bg-background p-3 text-center text-sm font-semibold text-foreground"
                >
                  <FileText className="mx-auto mb-2 h-5 w-5 text-accent" />
                  {document}
                </div>
              ))}
            </div>
          </DiagramStep>

          <DiagramArrowLabel label="Break docs into chunks. Helps limit the LLM context window which reduce hallucination." />

          <DiagramStep
            number={2}
            title="Chunking"
            caption="Split source material into useful pieces"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
              {chunks.map((chunk) => (
                <div key={chunk} className="rounded-lg border border-primary/30 bg-primary/10 p-3">
                  <div className="mx-auto mb-2 h-10 w-8 rounded border border-primary/40 bg-background" />
                  <p className="text-center text-xs font-medium text-primary">{chunk}</p>
                </div>
              ))}
            </div>
          </DiagramStep>

          <DiagramArrowLabel label="Convert each text chunk into vectors. LLM systems compare vectors, not raw text." />

          <DiagramStep number={3} title="Embedding" caption="Represent every chunk in vector space">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
              {chunks.map((chunk) => (
                <VectorCard key={chunk} bars={embeddingBars} label={chunk} />
              ))}
            </div>
          </DiagramStep>

          <DiagramArrowLabel label="Store chunk embeddings in the vector database." />

          <VectorDatabase number={4} title="Vector DB" caption="Indexed chunk embeddings" />
        </DiagramBoundary>

        <div className="hidden h-full items-center justify-center xl:flex">
          <ArrowRight className="h-12 w-12 text-ring" strokeWidth={2.5} />
        </div>

        <DiagramBoundary title="Online" caption="Runs when the user asks a question" accent>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
            <DiagramStep number={5} title="User Query" caption="Embed query with the same model">
              <div className="rounded-xl border border-border bg-background p-4 text-center font-semibold text-foreground">
                “What is the leave policy?”
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                <ArrowDown className="h-8 w-8 text-ring mb-3" /> Query vector
              </div>
              <VectorCard bars={["w-10", "w-14", "w-8"]} label="Embedded query" />
            </DiagramStep>

            <div className="flex items-center justify-center">
              <ArrowRight
                className="h-10 w-10 rotate-90 text-ring lg:rotate-0"
                strokeWidth={2.5}
              />
            </div>

            <VectorDatabase
              number={6}
              title="Search within DB"
              caption="Compare query vector with chunk vectors"
            />
          </div>

          <DiagramArrowLabel label="Vector similarity search returns the most relevant chunks." />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
            <DiagramStep
              number={7}
              title="Top K Relevant Chunks"
              caption="K = 5 most similar chunks"
              accent
            >
              <div className="grid grid-cols-2 gap-2">
                <VectorCard bars={["w-9", "w-12", "w-7"]} label="Leave policy" />
                <VectorCard bars={["w-8", "w-10", "w-12"]} label="Benefits FAQ" />
              </div>
            </DiagramStep>

            <div className="flex flex-col items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <ArrowRight
                className="h-10 w-10 rotate-90 text-ring lg:rotate-0"
                strokeWidth={2.5}
              />
              {/* <span className="text-center">User query</span>
              <span className="text-center">Vector</span>
              <span className="text-center text-xl">+</span>
              <span className="text-center">Top K</span>
              <span className="text-center">Chunks</span> */}
            </div>

            <DiagramStep number={8} title="LLM" caption="Receives" accent>
              <div className="space-y-2">
                <div className="rounded-xl border border-border bg-background p-3 text-center text-sm font-semibold text-primary">
                  User Query Vector
                </div>
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-center text-sm font-semibold text-primary">
                  Top K Relevant Chunks
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Generate grounded answer
                </p>
              </div>
            </DiagramStep>
          </div>
        </DiagramBoundary>
      </div>
    </div>
  );
}

function DiagramBoundary({
  title,
  caption,
  children,
  accent = false,
}: {
  title: string;
  caption: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <section
      className={
        accent
          ? "space-y-4 rounded-3xl border-2 border-primary/30 bg-primary/5 p-4 sm:p-5"
          : "space-y-4 rounded-3xl border-2 border-border bg-background/60 p-4 sm:p-5"
      }
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ring">{title}</p>
        <h4 className="mt-1 text-lg font-semibold text-foreground">{caption}</h4>
      </div>
      {children}
    </section>
  );
}

function DiagramStep({
  number,
  title,
  caption,
  children,
  accent = false,
}: {
  number: number;
  title: string;
  caption: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-2xl border border-primary/30 bg-card p-4 shadow-sm"
          : "rounded-2xl border border-border bg-card p-4 shadow-sm"
      }
    >
      <div className="mb-3 flex min-w-0 items-start gap-3">
        <StepNumber number={number} />
        <div className="min-w-0">
          <h4 className="break-words text-lg font-semibold text-foreground">{title}</h4>
          <p className="break-words text-sm text-muted-foreground">{caption}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function DiagramArrowLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-background/80 px-4 py-3 text-sm text-muted-foreground">
      <ArrowDown className="h-9 w-9 shrink-0 text-ring" strokeWidth={2.5} />
      <span className="min-w-0 break-words">{label}</span>
    </div>
  );
}

function VectorCard({ bars, label }: { bars: string[]; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="space-y-1.5">
        {bars.map((bar, index) => (
          <div key={`${label}-${index}`} className={`h-1.5 rounded-full bg-accent/70 ${bar}`} />
        ))}
      </div>
      <p className="mt-2 text-center text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function VectorDatabase({
  number,
  title,
  caption,
}: {
  number: number;
  title: string;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
      <StepNumber number={number} className="mx-auto mb-3" />
      <Database className="mx-auto h-12 w-12 text-accent" />
      <h4 className="mt-3 text-lg font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{caption}</p>
      {/* <div className="mt-4 rounded-xl border border-border bg-background p-3 text-sm font-medium text-foreground">
        Vector similarity
      </div> */}
    </div>
  );
}

function StepNumber({ number, className = "" }: { number: number; className?: string }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground shadow-sm ${className}`}
      aria-label={`Step ${number}`}
    >
      {number}
    </span>
  );
}

function GenerationDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-secondary/40 p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>User query vector</FlowBox>
        <span className="text-2xl text-accent">+</span>
        <FlowBox>Relevant chunks</FlowBox>
        <Arrow />
        <FlowBox accent>LLM answers using additional context</FlowBox>
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-primary p-5 text-sm text-primary-foreground">
      Example of a chunk stored in DB:
      <br />
      <br />
      <code>{children}</code>
    </pre>
  );
}
