import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Clock, Database, Sparkles } from "lucide-react";

export const Route = createFileRoute("/learnings/rag-chunking-embedding")({
  component: RagChunkingEmbeddingBlog,
  head: () => ({
    meta: [
      { title: "RAG: Chunking & Embedding — Bhavin Shah" },
      {
        name: "description",
        content:
          "Beginner-friendly RAG notes on chunking strategies, overlap, metadata, embeddings, parsers, and retrieval quality.",
      },
      { property: "og:title", content: "RAG: Chunking & Embedding" },
      {
        property: "og:description",
        content:
          "Handwritten RAG chunking and embedding notes converted into a clear beginner blog with diagrams.",
      },
      { property: "og:url", content: "/learnings/rag-chunking-embedding" },
    ],
    links: [{ rel: "canonical", href: "/learnings/rag-chunking-embedding" }],
  }),
});

function RagChunkingEmbeddingBlog() {
  return (
    <article className="container-page my-10 sm:my-14">
      <Link to="/learnings" className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to learnings
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow">AI Engineering / RAG</p>
        <h1 className="display-serif mt-3 text-4xl text-primary sm:text-5xl">
          RAG: Chunking &amp; Embedding
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">
            Updated Jul 2026
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> 13 min read
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Built from handwritten notes
          </span>
        </div>
      </header>

      <section className="mt-12 rounded-3xl bg-primary p-8 text-primary-foreground">
        <h2 className="text-2xl font-semibold text-primary-foreground">Mental Model</h2>
        <p className="mt-3 text-primary-foreground/85">
          Chunking splits your documents into pieces. Embedding converts those
          pieces into vectors so the RAG system can search by meaning instead of exact words.
        </p>
      </section>

      <Section title="Where chunking and embedding fit in RAG">
        <RagPipelineDiagram />
      </Section>

      <Section title="Chunking">
        <p>
          - Chunking splits a document into chunks. A good chunk keeps related information together,
          fits inside the model context window and is small enough for accurate retrieval.
        </p>
        <p>
          - The hard part is that the splitter does not always know where human meaning begins and
          ends. If it cuts in the wrong place like cutting a policy statement or a code function or an API example, LLM 
          can lose the context needed to answer correctly.
        </p>
      </Section>

      <Section title="1. Fixed-size chunking">
        <p className="my-3">
          Fixed-size chunking splits documents after a fixed number of characters or tokens. For
          example, chunk size might be 500 characters, 10 words, or page-wise chunks.
        </p>
        <div className="grid gap-4 md:grid-cols-3 my-3">
          <Callout title="Problem 1">It may cut sentences in the middle.</Callout>
          <Callout title="Problem 2">It may separate related topics.</Callout>
          <Callout title="Problem 3">It does not understand document structure.</Callout>
        </div>
        {/* <CodeBlock>{`chunk size = 8 words

chunk 1: Leave Policy: Employee gets 10 paid leaves per
chunk 2: year. No carry forward. Laptop Reimbursement Policy: Up
chunk 3: to $1000 allowed. Only MAC allowed.`}</CodeBlock> */}
      <p className="overflow-x-auto rounded-2xl bg-primary p-5 text-sm text-primary-foreground">
          Chunk size = 8 words <br/> <br />
          chunk 1: Leave Policy: Employee gets 10 paid leaves per <br />
          chunk 2: year. No carry forward. Laptop Reimbursement Policy: Up <br />
          chunk 3: to $1000 allowed. Only MAC allowed.
      </p>
      </Section>

      <Section title="2. Overlap chunking">
        <p className="my-3">
          Overlap chunking is fixed-size chunking where chunks share some text. For example, chunk
          size = 8 words and overlap = 4 words. This increases the chance that related text falls in
          one chunk.
                  {/* <CodeBlock>{`chunk size = 8 words, overlap = 4 words

chunk 1: Leave Policy: Employee gets 10 paid leaves per year. No carry forward.
chunk 2: year. No carry forward. Laptop Reimbursement Policy: Up to $1000 allowed. Only
chunk 3: to $1000 allowed. Only MAC allowed.`}</CodeBlock> */}
        </p>
          <p className="overflow-x-auto rounded-2xl bg-primary p-5 text-sm text-primary-foreground my-3">
            chunk size = 8 words, overlap = 4 words <br/><br/>
            chunk 1: Leave Policy: Employee gets 10 paid leaves per <span className="text-foreground">year. No carry forward.</span><br/>
            chunk 2: <span className="text-foreground">year. No carry forward.</span> Laptop Reimbursement Policy: Up <span className="text-foreground">to $1000 allowed. Only</span><br/>
            chunk 3: <span className="text-foreground">to $1000 allowed. Only</span> MAC allowed
        </p>
        {/* <OverlapDiagram /> */}
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Pros">Higher chance related text falls in one chunk.</Callout>
          <Callout title="Cons">
            Not guaranteed to solve all problems with fixed-size chunking. It stores duplicate text,
            which can increase embedding cost and database storage cost.
          </Callout>
        </div>
      </Section>

      <Section title="3. Sentence-based chunking">
        <p className="my-3">
          Sentence-based chunking keeps full sentences together.
        </p>
        <SentenceDiagram />
        <div className="grid gap-4 md:grid-cols-2 my-3">
          <Callout title="Pros">Better meaning because it does not cut sentences.</Callout>
          <Callout title="Cons">
            It may still not convey the context of a section or paragraph of text.
          </Callout>
        </div>
      </Section>

      <Section title="4. Paragraph-based chunking">
        <p className="my-3">
          Paragraph-based chunking splits by paragraphs.
        </p>
        <ParagraphDiagram />
        <div className="grid gap-4 md:grid-cols-2 my-3">
          <Callout title="Pros">
            Easy to understand and usually has better semantic context.
          </Callout>
          <Callout title="Cons">
            Some paragraphs are too long or too short. They may still miss section-level context.
          </Callout>
        </div>
      </Section>

      <Section title="5. Section/header-based chunking">
        <p className="my-3">
          - Section/header-based chunking splits documents using section headings.<br/>
          - Use section-based chunking for documents with fixed stucture like markdown files, technical docs, API docs, HR policies, legal docs.
          </p>
        <CodeBlock>{`# Leave Policy -> chunk 1
# Travel Policy -> chunk 2
# Laptop Refresh Policy -> chunk 3`}</CodeBlock>
        {/* <SectionDiagram /> */}
        <div className="grid gap-4 md:grid-cols-2 my-3">
          <Callout title="Pros">
            Preserves document structure and maintains semantic data in one chunk.
          </Callout>
          <Callout title="Cons">
            Long sections may still need sub-chunking. Some documents may not be organized clearly
            by sections.
          </Callout>
        </div>
      </Section>

      <Section title="6. Recursive chunking">
        <p className="my-3">
          Recursive chunking tries to split a document using the best natural separator first, then
          falls back to smaller separators.
        </p>
        <RecursiveDiagram />
        <div className="grid gap-4 md:grid-cols-2 my-3">
          <Callout title="Pros">Best general-purpose strategy for many text documents.</Callout>
          <Callout title="Cons">More complex and needs fine-tuning.</Callout>
        </div>
      </Section>

      <Section title="7. Semantic chunking">
        <p className="my-3">
          - Semantic chunking splits a document based on meaning. It tries to keep related topics
          together.<br/>
          - Works well for systems where high accuracy is needed in responses.
        </p>
        <SemanticDiagram /><br/>
        <CodeBlock>{`para 1: Leave Policy
para 2: Carry-forward Rules
para 3: Sick Leave Process
para 4: Laptop Reimbursement

chunk 1 = para 1 + 2 + 3, as all 3 are semantically similar
chunk 2 = para 4`}</CodeBlock>
        <div className="grid gap-4 md:grid-cols-2 my-3">
          <Callout title="Pros">Better semantic quality and improved retrieval accuracy.</Callout>
          <Callout title="Cons">
            More expensive and higher latency because documents go through an LLM to create embedding
            and then similarity search before chunks are created.
          </Callout>
        </div>
      </Section>

      <Section title="8. Custom / structure-aware chunking">
        <p className="my-3">
          - Chunk based on the document type or document structure.<br/>
          - It is mostly used in
          production systems where higher accuracy is needed.
        </p>
        <StructureAwareDiagram />
      </Section>

      <Section title="Metadata">
        <p className="my-3">
          - Chunks should also store metadata.<br/>
          - Metadata helps with citation, filtering, debugging, and source tracking.
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

      <Section title="Embedding">
        <p className="my-3">
          Embedding converts text to vectors.
        </p>
        <EmbeddingDiagram />
        <h2 className="text-xl text-foreground mt-5">Which model to choose?</h2>
        <ul className="py-3">
          <li>- No single model is best. Choose one that fits your document types and use case.</li>
          <li>- Test embedding models with your documents and retrieval results.</li>
          <li>
            - The <a href="https://huggingface.co/spaces/mteb/leaderboard" target="_blank" className="text-ring">MTEB leaderboard on Hugging Face</a> compares embedding models.</li>
          <li>
            - Trade-offs to consider: latency, dimensions and quality. Dimensions such as 256,
            768, or 1024 mean the text is converted into that many vector numbers.
          </li>
          <li>- Always use the same model to embed chunks and the user query.</li>
          <li>- If your document has legal jargon, choose a model trained for legal language. If your
          document has images, choose a model that can embed images and compare their vectors.</li>
        </ul>
        <p>
          
        </p>
      </Section>

      <Section title="Parser">
        <p className="my-3">
          - For documents with code or complex structure, you need a parser before chunking. A parser
          understands the document shape so chunks are not created from broken pieces.<br/>
          - For PDFs, you might use a PDF parser. For codebases, an AST parser creates an abstract
          syntax tree representation so the chunker can split by class, module, function, or
          component.
        </p>
        <ParserDiagram />
      </Section>

      <section className="mt-12 rounded-3xl bg-accent p-8 text-primary-foreground">
        <h2 className="text-xl font-semibold text-primary-foreground">Takeaways</h2>
        <ul>
          <li>- Chunk quality controls retrieval quality.</li>
          <li>
            - Section, recursive, semantic and custom chunking usually beat naive fixed-size chunks.
          </li>
          <li>- Metadata makes RAG answers easier to cite, filter, debug and trace.</li>
          <li>- Use the same model to embed chunks and user queries.</li>
        </ul>
      </section>
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

function FlowBox({ children, accent = false, centered = true }: { children: ReactNode; accent?: boolean, centered?: boolean }) {
  return (
    <div
      className={
        accent
          ? `rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 ${centered ? "text-center" : ""} font-semibold text-primary`
          : `rounded-xl border border-border bg-background px-4 py-3 ${centered ? "text-center" : ""} font-semibold text-foreground`
      }
    >
      {children}
    </div>
  );
}

function Arrow() {
  return <ArrowRight className="mx-auto h-5 w-5 text-accent" />;
}

function Down() {
  return <ArrowDown className="mx-auto h-5 w-5 text-accent" />;
}

function DiagramShell({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose rounded-3xl border border-border bg-secondary/40 p-6">{children}</div>
  );
}

function RagPipelineDiagram() {
  return (
    <DiagramShell>
      <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>Ingest Docs</FlowBox>
        <Arrow />
        <FlowBox accent>Chunking</FlowBox>
        <Arrow />
        <FlowBox>Embedding</FlowBox>
        <Arrow />
        <FlowBox>Store in Vector DB</FlowBox>
        <Arrow />
        <FlowBox>Retreive</FlowBox>
      </div>
    </DiagramShell>
  );
}

function OverlapDiagram() {
  return (
    <DiagramShell>
      <div className="space-y-3 font-mono text-sm">
        <FlowBox>chunk 1: Leave Policy · 10 paid leaves · per year · No carry forward</FlowBox>
        <FlowBox accent>overlap: per year · No carry forward</FlowBox>
        <FlowBox>chunk 2: No carry forward · Laptop Reimbursement · Up to $1000 allowed</FlowBox>
        <FlowBox>chunk 3: Up to $1000 allowed · Only MAC allowed</FlowBox>
      </div>
    </DiagramShell>
  );
}

function SentenceDiagram() {
  return (
    <DiagramShell>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="space-y-2">
          <FlowBox>Sentence 1</FlowBox>
          <FlowBox>Sentence 2</FlowBox>
          <FlowBox>Sentence 3</FlowBox>
          <FlowBox>Sentence 4</FlowBox>
          <FlowBox>Sentence 5</FlowBox>
        </div>
        <Arrow />
        <div className="space-y-3">
          <FlowBox accent>Sentence 1 + 2 + 3 → chunk 1</FlowBox>
          <FlowBox accent>Sentence 4 + 5 → chunk 2</FlowBox>
        </div>
      </div>
    </DiagramShell>
  );
}

function ParagraphDiagram() {
  return (
    <DiagramShell>
      <div className="grid gap-3 md:grid-cols-3">
        <FlowBox>Para 1 → chunk 1</FlowBox>
        <FlowBox>Para 2 → chunk 2</FlowBox>
        <FlowBox>Para 3 → chunk 3</FlowBox>
      </div>
    </DiagramShell>
  );
}

function SectionDiagram() {
  return (
    <DiagramShell>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="space-y-2">
          <FlowBox># Leave Policy</FlowBox>
          <FlowBox># Travel Policy</FlowBox>
          <FlowBox># Laptop Refresh Policy</FlowBox>
        </div>
        <Arrow />
        <div className="space-y-2">
          <FlowBox accent>chunk 1</FlowBox>
          <FlowBox accent>chunk 2</FlowBox>
          <FlowBox accent>chunk 3</FlowBox>
        </div>
      </div>
    </DiagramShell>
  );
}

function RecursiveDiagram() {
  return (
    <DiagramShell>
      <div className="space-y-3">
        <FlowBox accent>1st: split by section headings</FlowBox>
        <Down />
        <FlowBox>2nd: if still too large, split by paragraph</FlowBox>
        <Down />
        <FlowBox>3rd: if still too large, split by sentence</FlowBox>
        <Down />
        <FlowBox>4th: if still too large, split by tokens / characters</FlowBox>
      </div>
    </DiagramShell>
  );
}

function SemanticDiagram() {
  return (
    <DiagramShell>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>Docs</FlowBox>
        <Arrow />
        <FlowBox>LLM creates embeddings</FlowBox>
        <Arrow />
        <FlowBox accent>Group related data in 1 chunk using vector similarity</FlowBox>
      </div>
    </DiagramShell>
  );
}

function StructureAwareDiagram() {
  return (
    <DiagramShell>
      <div className="grid gap-5 md:grid-cols-3">
        <FlowBox centered={false}>Resume: Chunk By <br/>- Summary<br/> - Skills<br/> - Experience per company<br/> - Education</FlowBox>
        <FlowBox centered={false}>API doc: Chunk By <br/> - Endpoint<br/> - Parameters<br/> - Request example <br/> - Response example <br/> - Errors</FlowBox>
        <FlowBox centered={false}>Codebase: Chunk By <br/> - File <br/> - Module <br/> - Class <br/> - Function</FlowBox>
      </div>
    </DiagramShell>
  );
}

function EmbeddingDiagram() {
  return (
    <DiagramShell>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>Text</FlowBox>
        <Arrow />
        <FlowBox accent>Embedding model</FlowBox>
        <Arrow />
        <FlowBox>Vector [0.12, -0.44, 0.90, ...]</FlowBox>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Database className="h-5 w-5 text-accent" /> Similar meaning tokens → nearby vectors → high cosine
        similarity
      </div>
    </DiagramShell>
  );
}

function ParserDiagram() {
  return (
    <DiagramShell>
      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          <FlowBox>Codebase</FlowBox>
          <Arrow />
          <FlowBox accent>AST parser</FlowBox>
          <Arrow />
          <FlowBox>Create chunks by class / module / function / component</FlowBox>
        </div>
        <CodeBlock>
{`Function Declaration
    |-- name: sum
    |-- params:
    |     |-- a
    |     |-- b
    |-- body
    |     |-- Return Statement
    |     |       |-- Binary Expression
    |     |       |       | -- left: a
    |     |       |       | -- operator: +
    |     |       |       | -- right: a
            `}
          </CodeBlock>
      </div>
    </DiagramShell>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-primary p-5 text-sm text-primary-foreground">
      <code>{children}</code>
    </pre>
  );
}
