import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Clock, Database, Sparkles } from "lucide-react";

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
        <h1 className="display-serif mt-3 text-4xl text-primary sm:text-5xl">RAG: Architecture</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">
            Updated Jul 2026
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> 10 min read
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Built from handwritten notes
          </span>
        </div>
      </header>

      <section className="mt-10 rounded-3xl bg-primary p-6 text-primary-foreground">
        <h2 className="text-xl font-semibold text-primary-foreground">Mental Model</h2>
        <p className="mt-3 text-primary-foreground/85">
          RAG stands for Retrieval Augmented Generation. It gives an LLM extra relevant context at
          answer time, so the model can answer from your documents, not only from what it learned
          during training.
        </p>
      </section>

      <Section title="Why RAG exists">
        <p>LLMs have two common failures:</p>
        <p className="mt-3">
            1. <strong>Knowledge cutoff:</strong><br/>
            - Once the LLM has completed its training, it will not
            learn anything new.<br/>
            - For example, if an LLM was trained on web development knowledge up
            to June 2025, it will not know features from a new React version released after June
            2025.<br/>
            - It also will not know your private component library and CSS styles because that
            data was not part of training.
        </p>
        <p className="mt-3">
            2. <strong>Hallucination:</strong> if you ask an LLM something it does not know, it may
            guess. It still produces an answer, but the answer may be wrong, unrelated, or
            irrelevant. Since the model has to answer something, it can hallucinate instead of
            saying, “I do not know this.”
        </p>
      </Section>

      <Section title="RAG combines two memories">
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="1. Parametric memory">
            What the LLM already knows from the parameters it has already been trained on.
          </Callout>
          <Callout title="2. Non-parametric memory">
            An external index of documents your model can read from when answering the question. It
            provides extra relevant context.
          </Callout>
        </div>
      </Section>

      <Section title="Example: leave policy question">
        <p>User asks: <span className="text-ring">“What is the leave policy?”</span></p>
        <div className="grid gap-5 lg:grid-cols-2 mt-3">
          <Callout title="Without RAG">
            The LLM may guess:<br/>
            “Typically 10 paid leaves” OR <br/>
            It may hallucinate: “Leave policy describes the company&apos;s rules on how an employee can
            take time off.”
          </Callout>
          <Callout title="With RAG">
            <ol>
              <li>1. User asks a question.</li>
              <li>2. RAG system searches company documents.</li>
              <li>3. It finds the leave policy.</li>
              <li>4. It sends the user prompt plus leave policy to the LLM.</li>
              <li>5. LLM answers using this retrieved leave policy.</li>
            </ol>
          </Callout>
        </div>
        <p className="mt-3">
          Your RAG application is not part of the LLM. You build the RAG app for your company to
          provide extra relevant information to the LLM, so when it answers, it can answer from data
          your RAG gave, its own training, the user prompt, and the retrieved context.
        </p>
      </Section>

      <Section title="Basic RAG architecture">
        <ArchitectureDiagram />
        <p>
          The high-level path is: ingest data, split it into useful pieces, embed it, index it in a
          vector database, retrieve relevant chunks, and send the user query plus retrieved chunks
          to the LLM.
        </p>
      </Section>

      <Section title="1. Ingest">
        <p>
          Provide the RAG app the company documents. These could be PDFs, Word documents, web pages,
          code, GitHub links, support tickets, support logs, images, videos, or other internal
          sources. Examples include a leave policy document, GitHub repository, or support logs.
        </p>
      </Section>

      <Section title="2. Chunking">
        <p>
          Split documents into smaller chunks. If company data is large, not all of it will fit in
          the LLM context window. When answering, the LLM may use only part of the data or
          summarized data, which can cause hallucination. Chunking helps limit the LLM context
          window.
        </p>
        <p>
          For example, an HR policies document may become separate chunks for leave policy, travel
          policy, holiday calendar, and work-from-home policy. If the user asks “What is the leave
          policy?”, your RAG can retrieve only the relevant leave policy chunk, not the whole
          document.
        </p>
      </Section>

      <Section title="3. Embedding">
        <p>
          Convert chunks to vectors. LLMs do not understand text directly; they understand vectors.
          The user query is also converted to an embedding. Use the same embedding model for chunks
          and the user query so similar meaning lands close together in the same vector space.
        </p>
      </Section>

      <Section title="4. Vector database">
        <p>
          Store embeddings in a vector database, such as Chroma DB, Pinecone, or Postgres with
          pgvector. A regular SQL database is not enough when the goal is vector comparison rather
          than text comparison or keyword search.
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
          Retrieval performs similarity search to compare the user query embedding vector with chunk
          vectors. It retrieves the top K chunks. These are the most relevant chunks likely to have
          the right data to feed the LLM. K is decided by you when designing the RAG system.
        </p>
        <RetrievalDiagram />
      </Section>

      <Section title="Final generation step">
        <p>
          The LLM gets the user query and relevant chunks from RAG. The LLM answers using this
          additional context.
        </p>
        <GenerationDiagram />
      </Section>

      <Section title="Takeaways">
        <ul>
          <li>RAG does not retrain the LLM; it adds relevant context at answer time.</li>
          <li>
            RAG helps with private data, fresh data, and grounding answers in source material.
          </li>
          <li>Embeddings and vector search help retrieve by meaning instead of exact keywords.</li>
          <li>The retrieved context should be small enough to fit the model context window.</li>
        </ul>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 max-w-4xl">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="prose prose-neutral mt-4 max-w-none text-muted-foreground prose-li:my-1 prose-strong:text-foreground">
        {children}
      </div>
    </section>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
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
  return (
    <div className="not-prose rounded-3xl border border-border bg-secondary/40 p-6">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>Ingest</FlowBox>
        <Arrow />
        <FlowBox>Chunk</FlowBox>
        <Arrow />
        <FlowBox>Embed</FlowBox>
        <Arrow />
        <FlowBox>Index in DB</FlowBox>
        <Arrow />
        <FlowBox accent>Retrieve</FlowBox>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-3">
          <FlowBox>Company docs, latest papers, support tickets</FlowBox>
          <FlowBox>Embeddings stored in vector DB</FlowBox>
        </div>
        <div className="space-y-3">
          <FlowBox>User query embedded by the same embedding model</FlowBox>
          <FlowBox accent>
            Compare query vector with chunk vectors and retrieve top K chunks
          </FlowBox>
          <FlowBox>Send user query + relevant chunks to LLM</FlowBox>
        </div>
      </div>
    </div>
  );
}

function RetrievalDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-card p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>User query</FlowBox>
        <Arrow />
        <FlowBox>Query embedding</FlowBox>
        <Arrow />
        <FlowBox accent>Vector DB similarity search</FlowBox>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <Database className="h-5 w-5 text-accent" /> Compare with stored chunk embeddings → retrieve
        top K
      </div>
    </div>
  );
}

function GenerationDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-secondary/40 p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>User query</FlowBox>
        <Arrow />
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
      <code>{children}</code>
    </pre>
  );
}
