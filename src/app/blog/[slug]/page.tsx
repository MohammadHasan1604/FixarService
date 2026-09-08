import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/db";
import { Calendar, Clock, User, ChevronRight, ArrowLeft, ArrowRight, Share2, BookOpen } from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Article Not Found | Fixar Service" };
  }

  return {
    title: `${post.titleEn} | Fixar Service UAE Blog`,
    description: post.excerptEn,
    openGraph: {
      title: post.titleEn,
      description: post.excerptEn,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-14 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-brand-blue">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-navy font-bold truncate max-w-xs">{post.titleEn}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold uppercase">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-tight">
            {post.titleEn}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap border-y border-slate-200 py-3">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <User className="w-3.5 h-3.5 text-brand-blue" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-slate-200 aspect-[16/9] bg-slate-900">
          <img
            src={post.image}
            alt={post.titleEn}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 text-sm font-medium text-brand-navy leading-relaxed">
          {post.excerptEn}
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
          {post.contentEn}
        </div>

        {/* Bottom CTA for Appliance Booking */}
        <div className="p-8 rounded-3xl bg-brand-navy text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="text-lg font-bold">Experiencing Appliance Trouble at Home?</h3>
            <p className="text-xs text-slate-300">Our certified technicians are available 24/7 across Sharjah, Dubai, and Ajman.</p>
          </div>
          <Link
            href="/book-service"
            className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-md transition-colors shrink-0"
          >
            Book Doorstep Service
          </Link>
        </div>
      </div>
    </article>
  );
}
