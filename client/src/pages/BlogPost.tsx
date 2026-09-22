import React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Clock, Calendar, User, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { getArticleSchema, getBreadcrumbSchema } from '@/seo/structuredData';
import { getBlogPostBySlug, blogPosts } from '@/lib/blogData';
import NotFound from '@/pages/NotFound';

export default function BlogPost() {
  const { slug } = useParams({ from: '/blog/$slug' });
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` }
  ];

  const structuredData = [
    getBreadcrumbSchema(breadcrumbs),
    getArticleSchema({
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      datePublished: `${post.publishedDate}T00:00:00+05:30`,
      authorName: post.author
    })
  ];

  // Suggest other posts excluding this one
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Seo
        title={`${post.title} | AstroNest Blog`}
        description={post.excerpt}
        canonical={`https://astronest.in/blog/${post.slug}`}
        ogType="article"
        structuredData={structuredData}
      />

      <div className="pt-28 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs text-purple-400 font-semibold mb-4">
              <span className="bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 font-normal">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-gray-400 font-normal">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedDate}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/10">
              <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold">
                {post.author[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{post.author}</p>
                <p className="text-xs text-gray-400">{post.authorRole}</p>
              </div>
            </div>
          </header>

          {/* Key Takeaways Box */}
          <div className="p-6 md:p-8 rounded-3xl bg-purple-900/15 border border-purple-500/30 mb-10">
            <h2 className="text-base font-bold text-purple-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              Key Astrological Takeaways
            </h2>
            <ul className="space-y-2.5">
              {post.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body Content */}
          <article className="prose prose-invert max-w-none space-y-6 text-gray-300 text-sm md:text-base leading-relaxed mb-12">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </article>

          {/* Related Tool CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-black to-pink-900/40 border border-white/15 text-center mb-16 shadow-glow">
            <h3 className="text-xl md:text-2xl font-bold text-white font-display mb-2">
              Apply This Wisdom to Your Personal Chart
            </h3>
            <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto mb-6">
              Calculate your personal planetary placements, dasha cycles, and marriage compatibility in seconds.
            </p>
            <Link
              to={post.relatedTool.to}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/30 hover:scale-105 transition-all"
            >
              {post.relatedTool.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Articles */}
          <div>
            <h3 className="text-xl font-bold text-white font-display mb-6">
              Related Articles
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPosts.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="p-5 rounded-2xl glass border border-white/10 hover:border-purple-500/40 transition-all group"
                >
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block mb-2">
                    {r.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-2">
                    {r.title}
                  </h4>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    {r.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
