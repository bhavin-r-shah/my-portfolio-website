import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Database,
  Gauge,
  Network,
  Search,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/learnings/rag-storage-retrieval")({
  component: RagStorageRetrievalBlog,
  head: () => ({
    meta: [
      { title: "RAG: Storage & Retrieval — Bhavin Shah" },
      {
        name: "description",
        content:
          "A beginner-friendly guide to RAG vector databases, storage, similarity search, indexing, HNSW, efSearch, and retrieval trade-offs.",
      },
      { property: "og:title", content: "RAG: Storage & Retrieval" },
      {
        property: "og:description",
        content:
          "Handwritten RAG storage and retrieval notes converted into a clear beginner blog with diagrams.",
      },
      { property: "og:url", content: "/learnings/rag-storage-retrieval" },
    ],
    links: [{ rel: "canonical", href: "/learnings/rag-storage-retrieval" }],
  }),
});

function RagStorageRetrievalBlog() {
  return (
    <article className="container-page my-10 sm:my-14">
      <Link to="/learnings" className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to learnings
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow">AI Engineering / RAG</p>
        <h1 className="display-serif mt-3 text-4xl text-primary sm:text-5xl">
          RAG: Storage &amp; Retrieval
        </h1>
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

      <section className="mt-12 rounded-3xl bg-primary p-8 text-primary-foreground">
        <h2 className="text-2xl font-semibold text-primary-foreground">Beginner mental model</h2>
        <p className="mt-3 text-primary-foreground/85">
          A vector database in RAG is both storage for embeddings and a search engine for meaning.
          It stores document chunks as vectors, then finds the chunks whose vectors are closest to
          the user query vector.
        </p>
      </section>

      <Section title="Vector DB">
        <p>Examples of vector databases include Pinecone, pgvector, and Chroma DB.</p>
        <p>
          Vector DB in RAG = store embeddings + search engine. The vector DB stores chunks as
          embeddings and then finds chunks whose vectors are closest to the user query&apos;s
          vector.
        </p>
      </Section>

      <Section title="RAG has 2 flows">
        <div className="grid gap-5 lg:grid-cols-2">
          <Callout title="Offline: ingest">
            Document → chunks → embeddings → store embedding vector + chunk + metadata in vector DB.
          </Callout>
          <Callout title="Online: when user asks query">
            User asks question → create query embeddings vector → search vector DB for similar
            chunks using cosine similarity → retrieve closest chunks → send user query vector and
            closest chunk vectors to LLM → LLM answers.
          </Callout>
        </div>
        <StorageFlowDiagram />
      </Section>

      <Section title="What a vector DB stores">
        <p>Vector DB stores: 1) vector, 2) original text chunk, and 3) metadata.</p>
        <CodeBlock>{`{
  "id": "employee-handbook-001",
  "embedding": [0.12, -0.44, 0.93, ..., 0.7, 0.19],
  "text": "Employees get 20 paid leaves per year",
  "metadata": {
    "source": "employee-handbook.pdf",
    "section": "leave-policy",
    "page": 12,
    "chunk-index": 1
  }
}`}</CodeBlock>
        <p>
          Real models can have 384, 768, 1536, or 3072 dimensions. That means each chunk becomes a
          long list of numbers, and there can be a large number of possible vectors.
        </p>
        <p>
          Your app decides the metadata. For example, if you store HR data, you may add metadata as
          policy-name: &quot;Leave&quot; and policy-type: &quot;HR&quot;.
        </p>
      </Section>

      <Section title="How does vector DB search / compare user query vector?">
        <p>
          Search closest vectors. The vector DB compares the user query vector with chunk vectors
          using similarity search, commonly cosine similarity.
        </p>
        <SimilarityDiagram />
      </Section>

      <Section title="Brute-force search">
        <p>
          For every user query, brute force compares the user query vector with each chunk vector.
          Brute-force search works well if there are few chunks, say 100 or 1,000. But in production
          you mostly will have a lot more: 10,000, 1 lakh, or millions of chunks.
        </p>
        <Callout title="Trade-off">Brute force is accurate but slow.</Callout>
      </Section>

      <Section title="Indexing">
        <p>
          Vector indexing, like a SQL index, helps avoid scanning every record or chunk in the DB. A
          vector index does nearest-neighbor search.
        </p>
        <p>Types of vector indexes:</p>
        <ol>
          <li>HNSW (Hierarchical Navigable Small World)</li>
          <li>IVF (Inverted File)</li>
          <li>Product Quantization (PQ)</li>
          <li>IVF-PQ</li>
        </ol>
        <p>
          Results after using these indexing methods may not be as accurate as brute force, but we
          accept approximate results so that we save latency and compute. This is approximate
          nearest neighbor search.
        </p>
      </Section>

      <Section title="HNSW: Hierarchical Navigable Small World">
        <p>HNSW is used in production where speed and accuracy are important.</p>
        <p>
          It is an indexing technique that finds nearest vectors quickly without comparing the user
          query vector with every stored chunk vector.
        </p>
        <p>
          HNSW creates a multi-layer graph where each vector is a node and each node is connected to
          nearby vectors, meaning semantically close vectors, using cosine similarity.
        </p>
        <HnswLayerDiagram />
      </Section>

      <Section title="How HNSW search moves through layers">
        <p>
          Search begins at a node, then moves to the neighbor of that node that is closest to the
          user query vector, then to neighbors of that neighbor, and so on.
        </p>
        <p>
          HNSW creates multiple graph layers. For example: layer 2 has few nodes, layer 1 has some
          more nodes, and layer 0 has all nodes. Search starts at the top layer and moves down to
          layer 0, coming closer and closer to nearby, similar vectors.
        </p>
        <HnswSearchDiagram />
      </Section>

      <Section title="Who goes in the top layer?">
        <p>
          Ideally the vector that is semantically the root should be on top. But with millions of
          nodes, this would be costly because each time we store a new vector, the root and its
          subtree may change. Also, it is not necessary that there is a clear winner, a vector that
          is semantically root of all other vectors.
        </p>
        <p>
          So, HNSW randomly assigns a level to each node. Every node is always in level 0. Only some
          nodes randomly get level &gt; 0.
        </p>
        <CodeBlock>{`Nodes:
A - paid leave policy              L0
B - sick leave policy              L1
C - laptop reimbursement policy    L1
D - travel reimbursement policy    L0
E - Accounting policy              L2
F - HR policy                      L2
G - Hiring process                 L1`}</CodeBlock>
      </Section>

      <Section title="Why edges connect similar nodes">
        <p>
          At layer 2, F and E may represent HR and Accounting. They are more semantically related
          departments, so an edge can connect F and E. At layer 1, F and B are semantically closer,
          so connect F and B. E and C connect, but B and E are not semantically close, so no edge.
        </p>
        <p>
          Sometimes F and E are not semantically that close, but HNSW bridges them to connect two
          distinct subgraphs, like a highway between states.
        </p>
      </Section>

      <Section title="Example search">
        <p>User query: &quot;How many leaves can I take?&quot;</p>
        <ol>
          <li>Start search at L2. The user query vector is closer to F.</li>
          <li>Go down the tree of F node to its neighbors. Compare with B and G.</li>
          <li>At L1, the user query vector is closer to B.</li>
          <li>Go down the tree of B to its neighbors.</li>
          <li>At L0, compare with A. The user query vector is closest to A.</li>
        </ol>
        <p>Top K = 3 returns nodes A, B, F.</p>
      </Section>

      <Section title="HNSW implementation notes">
        <p>To implement HNSW, data structures like skip lists or Delaunay graphs are used.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Pros">Good speed and accuracy. Faster than IVF.</Callout>
          <Callout title="Cons">Memory heavy. The entire tree is in RAM.</Callout>
        </div>
      </Section>

      <Section title="Important HNSW parameters">
        <div className="grid gap-4 lg:grid-cols-3">
          <Callout title="M">
            Max number of neighbor connections per node. Example: M = 16 means 16 edges between
            nodes. Higher M means better accuracy because there are more connections, but indexing
            is slower and memory usage is higher.
          </Callout>
          <Callout title="efConstruction">
            When inserting a new vector while making the graph, HNSW searches the graph and finds
            candidate neighbors to connect this node to. efConstruction controls how many candidates
            it searches for. Higher efConstruction means better graph quality, deeper connections,
            better accuracy, slower indexing, and higher CPU usage.
          </Callout>
          <Callout title="efSearch">
            At query time, HNSW walks the graph and keeps a candidate list of similar vector chunks.
            efSearch controls how many candidate nodes it explores before returning results. Higher
            efSearch means deeper search, better accuracy, slower response, and higher CPU usage.
          </Callout>
        </div>
      </Section>

      <Section title="Takeaways">
        <ul>
          <li>A vector DB stores embeddings, original chunks, and metadata.</li>
          <li>Retrieval compares the query vector with stored chunk vectors.</li>
          <li>Brute-force search is accurate but too slow at large scale.</li>
          <li>Vector indexes trade a little accuracy for much lower latency and compute.</li>
          <li>HNSW is popular because it balances speed and accuracy using layered graphs.</li>
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

function StorageFlowDiagram() {
  return (
    <div className="not-prose mt-6 rounded-3xl border border-border bg-secondary/40 p-6">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>Document</FlowBox>
        <Arrow />
        <FlowBox>Chunks</FlowBox>
        <Arrow />
        <FlowBox>Embeddings</FlowBox>
        <Arrow />
        <FlowBox accent>Vector DB</FlowBox>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>User query</FlowBox>
        <Arrow />
        <FlowBox>Query vector</FlowBox>
        <Arrow />
        <FlowBox accent>Closest chunks to LLM</FlowBox>
      </div>
    </div>
  );
}

function SimilarityDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-card p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <FlowBox>User query vector</FlowBox>
        <FlowBox accent>Cosine similarity</FlowBox>
        <FlowBox>Stored chunk vectors</FlowBox>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Search className="h-5 w-5 text-accent" /> Return the nearest chunks, not necessarily exact
        keyword matches.
      </div>
    </div>
  );
}

function HnswLayerDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-secondary/40 p-6">
      <div className="space-y-4">
        <GraphLayer label="L2" nodes={["F", "E"]} accent />
        <GraphLayer label="L1" nodes={["F", "B", "G", "E", "C"]} />
        <GraphLayer label="L0" nodes={["F", "A", "B", "G", "E", "C", "D"]} />
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        Top layers have fewer entry points. Lower layers contain more nodes, with L0 containing all
        nodes.
      </p>
    </div>
  );
}

function HnswSearchDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-card p-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        <FlowBox accent>
          <Network className="mx-auto mb-2 h-5 w-5" /> Start at top layer
        </FlowBox>
        <Arrow />
        <FlowBox>
          <Gauge className="mx-auto mb-2 h-5 w-5 text-accent" /> Move toward closer neighbors
        </FlowBox>
        <Arrow />
        <FlowBox accent>
          <Database className="mx-auto mb-2 h-5 w-5" /> Return top K chunks
        </FlowBox>
      </div>
      <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
        Example path: L2 chooses F → L1 chooses B → L0 reaches A → top K returns A, B, F.
      </div>
    </div>
  );
}

function GraphLayer({
  label,
  nodes,
  accent = false,
}: {
  label: string;
  nodes: string[];
  accent?: boolean;
}) {
  return (
    <div className="grid grid-cols-[3rem_1fr] items-center gap-3">
      <span className="font-mono text-sm font-semibold text-primary">{label}</span>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-background p-3">
        {nodes.map((node, index) => (
          <span key={`${label}-${node}-${index}`} className="inline-flex items-center gap-2">
            <span
              className={
                accent
                  ? "grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                  : "grid h-9 w-9 place-items-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary"
              }
            >
              {node}
            </span>
            {index < nodes.length - 1 ? <span className="text-muted-foreground">—</span> : null}
          </span>
        ))}
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
