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
          "A beginner-friendly guide to RAG vector databases, storage, similarity search, indexing, HNSW, IVF, product quantization, metadata filtering, and retrieval trade-offs.",
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
            <Clock className="h-4 w-4" /> 18 min read
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

      <Section title="IVF: Inverted File Index">
        <p>
          Inverted File Index (IVF) groups similar vectors into buckets, or clusters, and then
          searches only the clusters that are closest to the user query vector.
        </p>
        <p>IVF commonly uses the K-Means clustering algorithm.</p>
        <IvfClusterDiagram />
        <p>
          Suppose you have these document chunks: paid leave, sick leave, hardware request, laptop
          reimbursement, and travel reimbursement.
        </p>
        <p>If you ask to group them into K = 3 clusters:</p>
        <ol>
          <li>Cluster 1: paid leave, sick leave</li>
          <li>Cluster 2: laptop reimbursement, travel reimbursement</li>
          <li>Cluster 3: hardware request</li>
        </ol>
        <p>
          Each cluster has a centroid. A centroid is the average of a group of vectors. For example,
          if A = [1, 2] and B = [2, 2], then centroid = [(1 + 2) / 2, (2 + 2) / 2] = [1.5, 2].
        </p>
        <Callout title="nlist">The nlist parameter determines how many clusters to create.</Callout>
      </Section>

      <Section title="How IVF clusters are created">
        <ol>
          <li>Randomly select K vectors as centroids.</li>
          <li>
            Assign each remaining vector to the cluster whose centroid is closest to this vector.
          </li>
          <li>Recalculate each centroid as the average of vectors in the cluster.</li>
          <li>Reassign vectors to the nearest centroids.</li>
          <li>Repeat until clusters stabilize.</li>
        </ol>
        <p>
          A centroid is an average number. It does not necessarily represent an actual chunk vector.
        </p>
        <CodeBlock>{`Example
1) Pick centroids: C1 = [1, 1], C2 = [8, 8]
2) Assign vectors:
   Cluster 1: A = [1, 1], B = [1, 2], C = [2, 1]
   Cluster 2: D = [8, 8], E = [6, 9], F = [7, 8]
3) Recalculate centroids:
   C1 = [(1 + 1 + 2) / 3, (1 + 2 + 1) / 3] = [1.33, 1.33]
   C2 = [(8 + 6 + 7) / 3, (8 + 9 + 8) / 3] = [7, 8.33]
4) Re-check if any chunks need to move to another cluster.
5) If no chunks move, clusters are stabilized.`}</CodeBlock>
      </Section>

      <Section title="How vectors are stored inside IVF">
        <p>Vectors are stored under the centroid, or cluster, they belong to.</p>
        <IvfStorageDiagram />
        <p>
          During search, take the user query vector, find the nearest centroid, and then search
          vectors within the cluster of the nearest centroid.
        </p>
        <CodeBlock>{`Step 1: user query vector vs C1 = 0.91 similarity
        user query vector vs C2 = 0.35
        user query vector vs C3 = 0.62

Step 2: search closest clusters C1 and C3
Inside Cluster 1:
  user query vector vs chunk 1 = 0.94
  user query vector vs chunk 2 = 0.72
Inside Cluster 3:
  user query vector vs chunk 3 = 0.88

Response K = Top 2 = chunk 1 and chunk 3`}</CodeBlock>
        <Callout title="nprobe">
          nprobe determines how many closest clusters IVF will search in. Higher nprobe means higher
          accuracy, but slower search.
        </Callout>
      </Section>

      <Section title="IVF risk: the right answer may be in another cluster">
        <p>
          If a user query is not properly formed, or if the query vector is closer to C1 but the
          answer is in cluster C2, searching only C1 can miss the right chunk.
        </p>
        <p>
          Example user query: &quot;Engg dept needs 15 Apple MacBook Air with 15 GB RAM, 10 Apple
          keyboards, 10 Apple mice. Will it fit budget of Q4?&quot;
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Cluster 1">
            Chunk A: MacBook Air specs
            <br />
            Chunk B: Apple laptop config
            <br />
            Chunk C: Apple accessories
            <br />
            Centroid: C1
          </Callout>
          <Callout title="Cluster 2">
            Chunk E: Engg quarterly budget
            <br />
            Chunk F: Procurement process
            <br />
            Chunk G: Financial approval process
            <br />
            Centroid: C2
          </Callout>
        </div>
        <p>
          Since the user query has a lot of Apple text, the query vector is closer to C1 than C2. If
          you search only cluster 1 with nprobe = 1, you will not find the right answer chunk E of
          cluster 2.
        </p>
      </Section>

      <Section title="Product Quantization">
        <p>Product Quantization (PQ) is a vector compression technique.</p>
        <p>
          PQ compresses large vectors into smaller codes, so vector search becomes cheaper and
          faster.
        </p>
        <p>
          A common production stack is IVF + PQ. IVF narrows where you search, and PQ shrinks the
          vectors.
        </p>
        <PqDiagram />
        <p>
          Floating point quantization converts floating point values into smaller integer values.
        </p>
        <CodeBlock>{`Vector = [0.12, -0.44, 2.37, 10.8, ..., 1.8, 0.19]
Compressed vector = [0, 0, 2, 10, ..., 1, 0]`}</CodeBlock>
        <p>Code quantization splits a vector into parts and replaces each part with a code.</p>
        <CodeBlock>{`Vector = [0.12, -0.44, 0.87, 0.10, 0.55, -0.20]
Split:
  Part 1 = [0.12, -0.44] -> code 7
  Part 2 = [0.87, 0.10]  -> code 2
  Part 3 = [0.55, -0.20] -> code 13
Compressed representation = [7, 2, 13]

Codebook:
  Id 7  = [0.12, -0.44]
  Id 2  = [0.87, 0.10]
  Id 13 = [0.55, -0.20]`}</CodeBlock>
        <p>
          Why use it? To save memory. For example, an original vector with 1536 dimensions has 1536
          floating point numbers. If each float is 4 bytes, that is 1536 × 4 = 6144 bytes. With PQ,
          m = 96 sub-vectors can reduce it to about 96 bytes.
        </p>
        <Callout title="Trade-off">
          Memory goes down and search is faster, but accuracy can go down. PQ can be used with IVF
          and HNSW.
        </Callout>
      </Section>

      <Section title="Which vector DB to use?">
        <p>It depends on the use case.</p>
        <ul>
          <li>
            pgvector: when you already run Postgres and want SQL metadata filters plus vector
            search.
          </li>
          <li>Qdrant: metadata filtering, low latency, and cost.</li>
          <li>Weaviate: built-in vectorization and GraphRAG-style retrieval.</li>
          <li>Milvus: disaggregated compute/storage and scalability.</li>
        </ul>
        <p>Things to consider when selecting a vector DB:</p>
        <ol>
          <li>
            Filtering support: filter by metadata to increase accuracy of retrieval of chunks. Each
            chunk should store metadata, for example doc name, page number, and section header. When
            the LLM gives a response, this helps us figure out which chunks were picked and helps us
            check accuracy.
          </li>
          <li>Hybrid search support.</li>
          <li>Support your existing stack, such as Postgres or SQL apps using pgvector.</li>
          <li>Benchmark on your own data: how do you evaluate your RAG system?</li>
        </ol>
      </Section>

      <Section title="Metadata filtering + search">
        <p>Example user query: &quot;Can employee 001 take 10 days paid leave?&quot;</p>
        <p>Employee data is in SQL DB. HR leave policy is in documents we ingest inside RAG.</p>
        <MetadataSearchDiagram />
        <p>Online step: run a SQL query to get employee data.</p>
        <CodeBlock>{`select employee_id, country, employment_type, status, available_leave_balance
from emp_leave_table
where emp_id = '001';

Result JSON:
{
  "emp_id": "001",
  "country": "India",
  "emp_type": "contract",
  "status": "active",
  "avail_leave_bal": "10 days"
}`}</CodeBlock>
        <p>Offline step: store employee metadata along with each chunk in the vector DB.</p>
        <CodeBlock>{`{
  "id": "chunk-01",
  "text": "Contract employees in India get 20 paid leaves per year",
  "embedding": [0.12, -0.44, 0.91, 0.75, 0.53],
  "metadata": {
    "doc_type": "policy",
    "policy_type": "leave",
    "country": "India",
    "emp_type": "contract"
  }
}`}</CodeBlock>
        <p>
          Search process: use employee data as filters on chunk metadata, tell the vector DB to
          search only chunks where metadata matches the employee data, then send the SQL data,
          retrieved chunks, and user query to the LLM.
        </p>
        <CodeBlock>{`Search only chunks where:
policy_type = "leave"
country = "India"
emp_type = "contract"

Faster search because fewer chunks are searched.`}</CodeBlock>
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

function IvfClusterDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-secondary/40 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Callout title="Cluster 1">
          Paid leave
          <br />
          Sick leave
          <br />
          Centroid C1
        </Callout>
        <Callout title="Cluster 2">
          Laptop reimbursement
          <br />
          Travel reimbursement
          <br />
          Centroid C2
        </Callout>
        <Callout title="Cluster 3">
          Hardware request
          <br />
          Centroid C3
        </Callout>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        IVF first chooses the nearest centroid, then searches inside nearby clusters.
      </p>
    </div>
  );
}

function IvfStorageDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-card p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <FlowBox accent>
          Centroid 1<br />
          Vector A<br />
          Vector B
        </FlowBox>
        <FlowBox accent>
          Centroid 2<br />
          Vector C<br />
          Vector D
        </FlowBox>
        <FlowBox accent>
          Centroid 3<br />
          Vector E
        </FlowBox>
      </div>
    </div>
  );
}

function PqDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-secondary/40 p-6">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>Large vector</FlowBox>
        <Arrow />
        <FlowBox>Split into sub-vectors</FlowBox>
        <Arrow />
        <FlowBox accent>Store small codes</FlowBox>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        PQ saves memory by replacing vector parts with compact codebook IDs.
      </p>
    </div>
  );
}

function MetadataSearchDiagram() {
  return (
    <div className="not-prose rounded-3xl border border-border bg-card p-6">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowBox>SQL employee data</FlowBox>
        <Arrow />
        <FlowBox>Metadata filters</FlowBox>
        <Arrow />
        <FlowBox accent>Search fewer policy chunks</FlowBox>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <FlowBox>Retrieved chunks + SQL facts + user query</FlowBox>
        <Arrow />
        <FlowBox accent>LLM answer</FlowBox>
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
