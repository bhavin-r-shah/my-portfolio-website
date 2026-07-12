import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, BrainCircuit, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/learnings/embedding-training")({
  component: EmbeddingTrainingBlog,
  head: () => ({
    meta: [
      { title: "Embedding & Training — Bhavin Shah" },
      {
        name: "description",
        content:
          "Beginner-friendly AI engineering notes on vectors, embeddings, cosine similarity, pre-training, fine-tuning, preference tuning, safety tuning, and parameters.",
      },
      { property: "og:title", content: "Embedding & Training" },
      {
        property: "og:description",
        content:
          "A practical learning blog from handwritten notes explaining how text becomes vectors and how LLMs are trained.",
      },
      { property: "og:url", content: "/learnings/embedding-training" },
    ],
    links: [{ rel: "canonical", href: "/learnings/embedding-training" }],
  }),
});

const vectorRows = [
  { text: "Car", vector: "[0.95, 0.05]", note: "very vehicle-like, not fruit-like" },
  { text: "Automobile", vector: "[0.96, 0.04]", note: "very vehicle-like, not fruit-like" },
  { text: "Banana", vector: "[0.08, 0.96]", note: "not vehicle-like, very fruit-like" },
  {
    text: "Yellow vehicle",
    vector: "[0.81, 0.45]",
    note: "part vehicle-like, part yellow-like",
  },
];

const cosineExamples = [
  {
    pair: "The car won't start ↔ My automobile broke down",
    score: "0.45",
    label: "similar meaning",
  },
  {
    pair: "My automobile broke down ↔ I love chocolate shake",
    score: "0.07",
    label: "mostly different",
  },
  {
    pair: "The car won't start ↔ I love chocolate shake",
    score: "0.02",
    label: "different meaning",
  },
];

function EmbeddingTrainingBlog() {
  return (
    <article className="container-page my-10 sm:my-14">
      <Link to="/learnings" className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to learnings
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow">AI Engineering / Embedding & Training</p>
        <h1 className="display-serif mt-3 text-4xl text-primary sm:text-5xl">
          Embedding & Training
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">
            Updated Jul 2026
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> 11 min read
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Built from handwritten notes
          </span>
        </div>
      </header>

      <section className="mt-12 rounded-3xl bg-primary p-6 text-primary-foreground">
        <h2 className="text-xl font-semibold text-primary-foreground">Mental Model</h2>
        <p className="mt-3 text-primary-foreground/85">
          An LLM does not directly compare English words the way humans do. It turns text into
          numbers, learns patterns in those numbers during training and then uses those learned
          patterns to predict useful answers.
        </p>
      </section>

      <Section title="Vector">
        <ul>
          <li>In Math, a vector has a magnitude and a direction.</li>
          <li>Magnitude means a list of numbers.</li>
        </ul>
        <p>
          If two pieces of text mean similar things, their vectors should point in a similar direction.
        </p>
      </Section>

      <Section title="Embedding">
        <ul>
          <li>In LLM, each token is represented by a vector.</li>
          {/* <li>
            In RAG, a data chunk like a sentence or a document may be represented by a vector.
          </li> */}
          <li>
            Each LLM gives its own vector to a token. Claude, Gemini, and other LLMs can give
            different vectors for the same token.
          </li>
          <li>Embedding is a vector that represents LLM's meaning of the text.</li>
        </ul>
        <div className="overflow-hidden mt-7">
          <h2 className="text-l font-semibold text-foreground">Example embedding table</h2>
          <p className="mt-3">
            A 2-dimensional vector can use Dimension 1 for text with vehicle-like meaning and Dimension
            2 text with for fruit-like / yellow color like meaning.
          </p>
          <table className="w-full text-left text-sm mt-5">
            <thead className="bg-secondary text-foreground">
              <tr>
                <th className="px-4 py-3">Text</th>
                <th className="px-4 py-3">Vector</th>
                <th className="px-4 py-3">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {vectorRows.map((row) => (
                <tr key={row.text} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{row.text}</td>
                  <td className="px-4 py-3 font-mono">{row.vector}</td>
                  <td className="px-4 py-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <EmbeddingSpaceDiagram />
        <p>
          Direction of car and automobile is similar. Banana is a different direction. <span className="text-primary">Similar
          meaning means close vectors and similar direction. Different meaning means far vectors and
          different direction.</span>
        </p>
        <div className="mt-5">
          <h2 className="text-l font-semibold text-foreground">How does LLM know car is vehicle-like but banana is not?</h2>
          <p className="mt-3">
            During training you teach LLM that “car” and “automobile” are related and are vehicle-like. Hence during embedding
            you give close vectors to them.
          </p>
        <TrainingEmbeddingDiagram />
        </div>
      </Section>

      <Section title="Cosine similarity">
        Cosine similarity asks: how close two vectors are? Ideally if 2 vecors are in:
        <ul>
          <li>Identical Direction → cosine similarity = 1</li>
          <li>Opposite Direction → cosine similarity = -1</li>
          <li>Unrelated → cosine similarity = 0</li>
        </ul>
        <div className="mt-5">
          <h2 className="text-l font-semibold text-foreground mb-3">Why is it needed?</h2>
          Let's take 3 sentences:
          <ol className="list-decimal mx-5">
            <li>The car won't start</li>
            <li>My automobile broke down</li>
            <li>I love chocolate shake</li>
          </ol>
          <p className="mt-3">
            If we only compare English words <span className="text-destructive">without meaning</span>, sentences “The car won't start” and “My automobile
            broke down” do not repeat any words, so plain word comparison will say they are not
            similar. This is why embedding is needed: <span className="text-primary">embedding tells the LLM that both sentences are
            similar meaning and should have close vectors and high cosine similarity.</span>
        </p>
        </div>
        {/* <CosineSimilarityDiagram /> */}
      </Section>

      <Section title="Text → Vector">
        <p>Each time LLM sees a text, LLM understands vectors, not English words.</p>
        <TextToVectorDiagram />
      </Section>

      <Section title="1. Pre-training">
        <ul>
          <li>Gives the Base Model.</li>
          <li>
            In pre-training, you give huge datasets to LLM, e.g. whole internet, whole English
            library.
          </li>
          <li>Then LLM is asked: given this text, what is the likely next token?</li>
          <li>If prediction is right, move on. If wrong, LLM re-trains itself.</li>
          <li>
            Here it learns associations, reasoning patterns, code patterns, style patterns,
            language, grammar, and facts.
          </li>
        </ul>
        <PreTrainingDiagram />
        <p>
          Example: LLM sees multiple texts referring to France as capital of Paris. So when we ask
          “The capital of France is ?” it predicts next token = Paris.
        </p>
      </Section>

      <Section title="How does it learn relationships?">
        <p>
          Example: take vector of car and vector of bus. LLM sees multiple texts where car and bus
          have been used in similar context or both have similar patterns. It has seen this hundreds
          / millions of times.
        </p>
        <RelationshipLearningDiagram />
        <p>
          The model modifies Vcar and Vbus to bring them closer. Base model knows relations and
          patterns, but it cannot yet reliably chat in Q/A format. Base model is like a person who
          knows entire internet but does not know how to talk or assist. It is not trained in
          customer support or teaching style yet.
        </p>
      </Section>

      <Section title="2. Post-training">
        <p>Post-training turns a knowledgeable base model into a more helpful assistant.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Definition title="2.1 Supervised Fine Tuning (SFT)">
            Humans show the model tons of high quality Q/A pairs and instruct model to answer in a
            particular fashion.
          </Definition>
          <Definition title="2.2 Reinforcement Learning / Preference Tuning">
            Give three answer variations. Each user may choose A or B or C to be most useful. This
            is stored as user metadata. Next time AI answers it will choose answer based on your
            preference.
          </Definition>
        </div>
      </Section>

      <Section title="Supervised Fine Tuning (SFT)">
        <p>
          After pre-training, we want LLM to follow instructions. For example, user prompt: “Explain
          cosine similarity simply for AI”. A base model can have lots of different ways to answer
          this question and lots of data can be given. SFT provides ideal Q/A pairs that instruct
          LLM to answer in a particular way.
        </p>
        <SftDiagram />
        <p>
          In SFT, you instruct: Question: Explain cosine similarity simply in AI. Ideal Answer:
          Cosine similarity checks whether two vectors point in the same direction. Question: What
          is Arkanoid? Ideal answer: I don't know. This helps so that LLM does not hallucinate;
          without this, LLM will give random answer.
        </p>
      </Section>

      <Section title="3. Safety Tuning">
        <ul>
          <li>Teach LLM what not to do.</li>
          <li>Do not leak data.</li>
          <li>Do not give harmful instructions.</li>
          <li>Do not give malware.</li>
          <li>Do not give misleading advice.</li>
          <li>Teach LLM to say “I can't help with this”.</li>
        </ul>
      </Section>

      <Section title="4. Domain specific fine tuning">
        <ul>
          <li>Optional.</li>
          <li>Teach LLM legal contracts, C++ coding, financial research.</li>
          <li>
            Teach ideal format, e.g. answer as ticket id - 1234, category - HW issue, resolution -
            restart laptop.
          </li>
        </ul>
      </Section>

      <Section title="Parameter">
        <ul>
          <li>What patterns models have learnt during training are connected to parameters.</li>
          <li>Example: model Llama 70B means Llama model has been trained with 70B parameters.</li>
          <li>Parameters are like connections or weights.</li>
          <li>
            Parameter helps model decide: given this text, what token is likely next? What concepts
            are related? How should grammar work? What does this sentence mean?
          </li>
        </ul>
        <p>
          A model parameter is a learned internal number that helps the AI decide what output is
          most useful / likely for a given input.
        </p>
      </Section>

      <section className="mt-12 rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Takeaway</h2>
        </div>
        <p className="mt-3 text-muted-foreground">
          Embeddings are how text becomes meaning-shaped numbers. Training is how the model learns
          where those numbers should live, what patterns connect them, and how to answer safely and
          usefully.
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

function Definition({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
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

function EmbeddingSpaceDiagram() {
  return (
    <DiagramCard title="2D Vector Space">
      <svg
        viewBox="00 0 640 320"
        role="img"
        aria-label="Embedding space diagram"
        className="mt-4 w-full"
      >
        <defs>
          <marker id="axisArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-primary" />
          </marker>
        </defs>
        <path
          d="M80 260 L470 260"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#axisArrow)"
        />
        <path
          d="M80 260 L80 45"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#axisArrow)"
        />
        <text x="350" y="292" className="fill-muted-foreground text-[14px]">
          vehicle-like →
        </text>
        <text x="0" y="80" className="fill-muted-foreground text-[14px]">
          fruit-like ↑
        </text>
        {[
          { x: 450, y: 235, label: "Car", color: "fill-primary" },
          { x: 325, y: 232, label: "Automobile", color: "fill-primary" },
          { x: 120, y: 65, label: "Banana", color: "fill-accent" },
          { x: 300, y: 150, label: "Yellow vehicle", color: "fill-accent" },
        ].map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="7" className={point.color} />
            <rect
              x={point.x + 10}
              y={point.y - 20}
              width={point.label.length * 8 + 18}
              height="28"
              rx="7"
              className="fill-secondary stroke-border"
            />
            <text x={point.x + 20} y={point.y - 2} className="fill-foreground text-[13px]">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </DiagramCard>
  );
}

function TrainingEmbeddingDiagram() {
  return (
    <DiagramCard title="Training relationship → embedding closeness">
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label="Training creates close vectors"
        className="mt-4 w-full"
      >
        <defs>
          <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-primary" />
          </marker>
        </defs>
        <Box x={0} y={40} w={220} text="Training: car = automobile ≠ banana" />
        <Box x={275} y={20} w={135} text="Vector A: car" />
        <Box x={275} y={93} w={170} text="Vector B: automobile" />
        <Box x={275} y={166} w={155} text="Vector C: banana" />
        <Box x={530} y={56} w={145} text="A & B close" />
        <Box x={530} y={150} w={145} text="C far away" />
        <path
          d="M220 61 L275 42"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#flowArrow)"
        />
        <path
          d="M220 74 L275 114"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#flowArrow)"
        />
        <path
          d="M140 82 L275 187"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#flowArrow)"
        />
        <path
          d="M445 114 C490 110 488 78 530 78"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#flowArrow)"
        />
        <path
          d="M430 187 L530 172"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#flowArrow)"
        />
      </svg>
    </DiagramCard>
  );
}

function CosineSimilarityDiagram() {
  return (
    <DiagramCard title="Cosine similarity examples">
      <div className="mt-4 grid gap-3">
        {cosineExamples.map((example) => (
          <div key={example.pair} className="rounded-2xl border border-border bg-secondary/50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium text-foreground">{example.pair}</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary">
                {example.score}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{example.label}</p>
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

function TextToVectorDiagram() {
  return (
    <DiagramCard title="Text becomes vector">
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Pipeline text="Text ‘car’" vector="Vcar" />
        <Pipeline text="Text ‘bus’" vector="Vbus" />
      </div>
    </DiagramCard>
  );
}

function Pipeline({ text, vector }: { text: string; vector: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-4 text-sm">
      <p className="font-medium text-foreground">{text}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-muted-foreground">
        <span>Tokens</span>
        <ArrowRight className="h-4 w-4" />
        <span>Token IDs</span>
        <ArrowRight className="h-4 w-4" />
        <span>Embedding vector</span>
        <ArrowRight className="h-4 w-4" />
        <span className="font-mono text-primary">{vector}</span>
      </div>
    </div>
  );
}

function PreTrainingDiagram() {
  return (
    <DiagramCard title="Pre-training loop">
      <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
        {["Huge datasets", "Predict next token", "Compare prediction", "Update parameters"].map(
          (step, index) => (
            <div key={step} className="rounded-2xl border border-border bg-secondary/50 p-4">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <p className="mt-2 font-medium text-foreground">{step}</p>
            </div>
          ),
        )}
      </div>
    </DiagramCard>
  );
}

function RelationshipLearningDiagram() {
  return (
    <DiagramCard title="Car and bus become semantically close">
      <svg
        viewBox="0 0 720 300"
        role="img"
        aria-label="Relationship learning diagram"
        className="mt-4 w-full"
      >
        <defs>
          <marker id="relArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-primary" />
          </marker>
        </defs>
        <Box x={90} y={35} w={110} text="Vcar" />
        <Box x={520} y={35} w={110} text="Vbus" />
        <Box
          x={170}
          y={115}
          w={380}
          text="Both car & bus have similar pattern and are used in similar context"
        />
        <Box x={210} y={205} w={300} text="Modify Vcar & Vbus to bring them closer" />
        <path
          d="M145 77 L275 115"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#relArrow)"
        />
        <path
          d="M575 77 L445 115"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#relArrow)"
        />
        <path
          d="M360 157 L360 205"
          className="fill-none stroke-primary stroke-2"
          markerEnd="url(#relArrow)"
        />
      </svg>
    </DiagramCard>
  );
}

function SftDiagram() {
  return (
    <DiagramCard title="SFT teaches answer style">
      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <Definition title="User prompt">Explain cosine similarity simply in AI.</Definition>
        <ArrowRight className="mx-auto hidden h-5 w-5 text-primary md:block" />
        <Definition title="Ideal answer">
          Cosine similarity checks whether two vectors point in the same direction.
        </Definition>
      </div>
    </DiagramCard>
  );
}

function Box({ x, y, w, text }: { x: number; y: number; w: number; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="42" rx="8" className="fill-secondary stroke-primary/40" />
      <text
        x={x + w / 2}
        y={y + 26}
        textAnchor="middle"
        className="fill-foreground text-[12px] font-medium"
      >
        {text}
      </text>
    </g>
  );
}
