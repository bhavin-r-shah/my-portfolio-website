import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export function BlogSection() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="container-page my-10" aria-labelledby="blog-heading">
      <div className="flex items-end justify-between gap-6">
        <div>
          {/* <p className="eyebrow">Notes &amp; ideas</p> */}
          <h2 id="blog-heading" className="display-serif mt-2 text-[1.4rem] sm:text-[1.8rem]">
            My Learnings
          </h2>
        </div>
        <Link
          to="/blog"
          className="hidden items-center gap-1 text-lg text-muted-foreground hover:text-foreground sm:inline-flex"
        >
          All blog posts <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-3">
        {latestPosts.map((post) => (
          <article key={post.slug} className="card-surface card-surface-hover flex flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                {post.category}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {post.readingTime}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-snug">
              <Link to={post.href} className="text-foreground hover:text-primary">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.summary}</p>
            <Link
              to={post.href}
              className="mt-5 inline-flex items-center gap-1 border-t border-border pt-4 text-sm font-medium text-primary"
            >
              Read article <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <Link to="/blog" className="mt-5 inline-flex items-center gap-1 text-primary sm:hidden">
        All posts <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
