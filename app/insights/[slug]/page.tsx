import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { LedgerLabel } from "@/components/Ledger";
import { CtaBand } from "@/components/CtaBand";
import { getArticleBySlug, getArticleSlugs } from "@/lib/insights";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const articles = getArticleSlugs();
  if (!articles.includes(params.slug)) return {};

  const { frontmatter } = getArticleBySlug(params.slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/insights/${params.slug}` },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.date,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const slugs = getArticleSlugs();
  if (!slugs.includes(params.slug)) notFound();

  const { frontmatter, content } = getArticleBySlug(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: { "@type": "Person", name: "Brian" },
    publisher: { "@type": "Organization", name: "AESURUS Limited" },
    mainEntityOfPage: `${siteConfig.siteUrl}/insights/${params.slug}`,
  };

  return (
    <article className="mx-auto max-w-measure px-6 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LedgerLabel>Insights</LedgerLabel>
      <h1 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">{frontmatter.title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
        <span>Brian, Founder, AESURUS</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={frontmatter.date}>
          {new Date(frontmatter.date).toLocaleDateString("en-JM", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      <p className="mt-4 border-y border-line py-3 text-sm italic text-ink-muted">
        This article is general information, not legal advice. For guidance specific to your
        firm, book an exposure check.
      </p>

      <div className="prose prose-lg mt-10 max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:text-ink prose-p:text-ink-muted prose-li:text-ink-muted prose-a:text-brand prose-strong:text-ink">
        <MDXRemote source={content} />
      </div>

      <div className="mt-16">
        <CtaBand />
      </div>
    </article>
  );
}
