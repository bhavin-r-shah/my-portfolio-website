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
        <h2 className="text-2xl font-semibold text-primary-foreground">Beginner mental model</h2>
        <p className="mt-3 text-primary-foreground/85">
          Chunking decides what pieces of your documents can be retrieved. Embedding converts those
          pieces into vectors so the RAG system can search by meaning instead of exact words.
        </p>
      </section>

      <Section title="Where chunking and embedding fit in RAG">
        <p>
          The LLM gets the user query and relevant chunks from RAG. The LLM answers using this
          additional context. Page 1 of my notes had a small version of this flow, but I am not
          including that diagram here because this blog focuses on the chunking and embedding steps.
        </p>
        <RagPipelineDiagram />
      </Section>

      <Section title="Chunking">
        <p>
          Chunking splits a document into chunks. A good chunk keeps related information together,
          fits inside the model context window, and is small enough for accurate retrieval.
        </p>
        <p>
          The hard part is that the splitter does not always know where human meaning begins and
          ends. If it cuts in the wrong place, a policy sentence, a code function, or an API example
          can lose the context needed to answer correctly.
        </p>
      </Section>

      <Section title="1. Fixed-size chunking">
        <p>
          Fixed-size chunking splits documents after a fixed number of characters or tokens. For
          example, chunk size might be 500 characters, 10 words, or page-wise chunks.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <Callout title="Problem 1">It may cut sentences in the middle.</Callout>
          <Callout title="Problem 2">It may separate related topics.</Callout>
          <Callout title="Problem 3">It does not understand document structure.</Callout>
        </div>
        <CodeBlock>{`chunk size = 8 words

chunk 1: Leave Policy: Employee gets 10 paid leaves per
chunk 2: year. No carry forward. Laptop Reimbursement Policy: Up to
chunk 3: $1000 allowed. Only MAC allowed.`}</CodeBlock>
      </Section>

      <Section title="2. Overlap chunking">
        <p>
          Overlap chunking is fixed-size chunking where chunks share some text. For example, chunk
          size = 8 words and overlap = 4 words. This increases the chance that related text falls in
          one chunk.
        </p>
        <OverlapDiagram />
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Pros">Higher chance related text falls in one chunk.</Callout>
          <Callout title="Cons">
            Not guaranteed to solve all problems with fixed-size chunking. It stores duplicate text,
            which can increase embedding cost and database storage cost.
          </Callout>
        </div>
      </Section>

      <Section title="3. Sentence-based chunking">
        <p>
          Sentence-based chunking keeps full sentences together. For example, sentences 1 + 2 + 3
          become chunk 1, and sentences 4 + 5 become chunk 2.
        </p>
        <SentenceDiagram />
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Pros">Better meaning because it does not cut sentences.</Callout>
          <Callout title="Cons">
            It may still not convey the context of a section or paragraph of text.
          </Callout>
        </div>
      </Section>

      <Section title="4. Paragraph-based chunking">
        <p>
          Paragraph-based chunking splits by paragraphs. Paragraph 1 becomes chunk 1, paragraph 2
          becomes chunk 2, and paragraph 3 becomes chunk 3.
        </p>
        <ParagraphDiagram />
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Pros">
            Easy to understand and usually has better semantic context.
          </Callout>
          <Callout title="Cons">
            Some paragraphs are too long or too short. They may still miss section-level context.
          </Callout>
        </div>
      </Section>

      <Section title="5. Section/header-based chunking">
        <p>Section/header-based chunking splits documents using section headings.</p>
        <CodeBlock>{`# Leave Policy -> chunk 1
# Travel Policy -> chunk 2
# Laptop Refresh Policy -> chunk 3`}</CodeBlock>
        <SectionDiagram />
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Pros">
            Preserves document structure and maintains semantic data in one chunk.
          </Callout>
          <Callout title="Cons">
            Long sections may still need sub-chunking. Some documents may not be organized clearly
            by sections.
          </Callout>
        </div>
        <p>
          Use section-based chunking for technical docs, API docs, HR policies, legal docs, and
          documents with a fixed structure.
        </p>
      </Section>

      <Section title="6. Recursive chunking">
        <p>
          Recursive chunking tries to split a document using the best natural separator first, then
          falls back to smaller separators.
        </p>
        <RecursiveDiagram />
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Pros">Best general-purpose strategy for many text documents.</Callout>
          <Callout title="Cons">More complex and needs fine-tuning.</Callout>
        </div>
      </Section>

      <Section title="7. Semantic chunking">
        <p>
          Semantic chunking splits a document based on meaning. It tries to keep related topics
          together.
        </p>
        <SemanticDiagram />
        <CodeBlock>{`para 1: Leave Policy
para 2: Carry-forward Rules
para 3: Sick Leave Process
para 4: Laptop Reimbursement

chunk 1 = para 1 + 2 + 3, as all 3 are semantically similar
chunk 2 = para 4`}</CodeBlock>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Pros">Better semantic quality and improved retrieval accuracy.</Callout>
          <Callout title="Cons">
            More expensive and higher latency because documents may go through an LLM, embedding,
            and similarity search before chunks are created.
          </Callout>
        </div>
        <p>Semantic chunking works well for systems where high accuracy is needed in responses.</p>
      </Section>

      <Section title="8. Custom / structure-aware chunking">
        <p>
          Custom chunking uses the document type or document structure. It is mostly used in
          production systems where higher accuracy is needed.
        </p>
        <StructureAwareDiagram />
      </Section>

      <Section title="Metadata belongs with chunks">
        <p>Chunks should also store metadata.</p>
        <CodeBlock>{`{
  "chunk_text": "Employees get 20 paid leaves per year",
  "source": "HR-Policy.pdf",
  "section": "Leave Policy",
  "page": 12,
  "chunk_id": "hr-policy-leave-policy-pg12-chunk"
}`}</CodeBlock>
        <p>Metadata helps with citation, filtering, debugging, and source tracking.</p>
      </Section>

      <Section title="Embedding">
        <p>
          Embedding converts text to vectors. Similar meaning should become nearby vectors, which
          can be compared with cosine similarity.
        </p>
        <EmbeddingDiagram />
        <ul>
          <li>No single model is best. Choose one that fits your document types and use case.</li>
          <li>Test embedding models with your documents and retrieval results.</li>
          <li>The MTEB leaderboard on Hugging Face compares embedding models.</li>
          <li>
            Trade-offs to consider include latency, dimensions, and quality. Dimensions such as 256,
            768, or 1024 mean the text is converted into that many vector numbers.
          </li>
          <li>Always use the same model to embed chunks and the user query.</li>
        </ul>
        <p>
          If your document has legal jargon, choose a model trained for legal language. If your
          document has images, choose a model that can embed images and compare their vectors.
        </p>
      </Section>

      <Section title="Parser">
        <p>
          For documents with code or complex structure, you need a parser before chunking. A parser
          understands the document shape so chunks are not created from broken pieces.
        </p>
        <ParserDiagram />
        <p>
          For PDFs, you might use a PDF parser. For codebases, an AST parser creates an abstract
          syntax tree representation so the chunker can split by class, module, function, or
          component.
        </p>
      </Section>

      <Section title="Takeaways">
        <ul>
          <li>Chunk quality controls retrieval quality.</li>
          <li>Overlap can protect context, but it duplicates text and raises storage cost.</li>
          <li>
            Section, recursive, semantic, and custom chunking usually beat naive fixed-size chunks.
          </li>
          <li>Metadata makes RAG answers easier to cite, filter, debug, and trace.</li>
          <li>Use the same embedding model for documents and user queries.</li>
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
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>Docs</FlowBox>
        <Arrow />
        <FlowBox accent>Chunks</FlowBox>
        <Arrow />
        <FlowBox>Embeddings</FlowBox>
        <Arrow />
        <FlowBox>Vector search</FlowBox>
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
        <FlowBox>LLM / embeddings</FlowBox>
        <Arrow />
        <FlowBox accent>Similarity search groups related chunks</FlowBox>
      </div>
    </DiagramShell>
  );
}

function StructureAwareDiagram() {
  return (
    <DiagramShell>
      <div className="grid gap-5 md:grid-cols-3">
        <FlowBox>Resume → summary, skills, experience per company, education</FlowBox>
        <FlowBox>API doc → endpoint, parameters, request example, response example, errors</FlowBox>
        <FlowBox>Codebase → file, module, class, function</FlowBox>
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
        <Database className="h-5 w-5 text-accent" /> Similar meaning → nearby vectors → cosine
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
        <div className="rounded-2xl border border-border bg-background p-4 font-mono text-xs text-muted-foreground">
          FunctionDeclaration → name: sum → params: a, b → body: ReturnStatement → BinaryExpression
        </div>
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
