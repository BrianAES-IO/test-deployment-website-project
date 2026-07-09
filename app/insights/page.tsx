import type { Metadata } from "next";
import Link from "next/link";
import { LedgerLabel } from "@/components/Ledger";
import { Reveal } from "@/components/motion/Reveal";
import { getAllArticles } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Plain-language guidance on the Data Protection Act, OIC registration, and compliance for Jamaican firms.",
  alternates: { canonical: "/insights" },
};

export default function InsightsIndexPage() {
  const articles = getAllArticles();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <LedgerLabel>Insights</LedgerLabel>
      <h1 className="mt-3 text-4xl font-medium text-ink">Plain-language guidance.</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        General information on the Data Protection Act and compliance in Jamaica, written the
        way we&apos;d explain it to a client, not the way a statute reads.
      </p>

      <div className="mt-12 border-b border-line">
        {articles.map((article, i) => (
          <Reveal key={article.slug} index={i} as="div">
            <Link
              href={`/insights/${article.slug}`}
              className="group block border-t border-line py-8 first:border-t-0"
            >
              <time className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                {new Date(article.frontmatter.date).toLocaleDateString("en-JM", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 font-display text-2xl font-medium text-ink transition-colors duration-200 ease-brand group-hover:text-brand">
                {article.frontmatter.title}
              </h2>
              <p className="mt-2 max-w-xl text-base text-ink-muted">{article.frontmatter.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Read
                <span className="transition-transform duration-200 ease-brand group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
