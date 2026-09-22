import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, User, ArrowRight, Sparkles, Search } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema } from '@/seo/structuredData';
import { blogPosts } from '@/lib/blogData';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Kundli Basics', 'Guides', 'Matrimonial Astrology', 'Houses & Bhavas', 'Astrology Foundations'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }
  ];

  const structuredData = [
    getBreadcrumbSchema(breadcrumbs)
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.blog.title}
        description={pageSeoConfig.blog.description}
        canonical={pageSeoConfig.blog.canonical}
        structuredData={structuredData}
      />

      <div className="pt-28 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Vedic Wisdom & Insights
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">
              AstroNest Astrology Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Explore authentic Vedic astrology articles, Kundli tutorials, horoscope predictions, and compatibility guides written by experienced Vedic scholars.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="glass rounded-3xl border border-white/10 p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-purple-400 mb-3 font-semibold">
                    <span className="bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 font-normal">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-purple-300 transition-colors line-clamp-2">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-semibold text-white">{post.author}</p>
                    <p className="text-[10px] text-gray-400">{post.publishedDate}</p>
                  </div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center gap-1.5 text-xs text-purple-400 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                  >
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
