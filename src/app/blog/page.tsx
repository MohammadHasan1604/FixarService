import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/db";
import { BookOpen, Clock, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Appliance Repair Guides & Maintenance Blog | Fixar Service UAE",
  description:
    "Expert tips on AC maintenance for the UAE summer, refrigerator troubleshooting, washing machine drainage, and home appliance energy saving.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
            <span>Appliance Care & Insights</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Fixar Knowledge Base & Care Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Expert diagnostic guides, preventive maintenance tips for the Middle East summer, and appliance care routines written by certified engineers.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 start-3 px-3 py-1 rounded-lg bg-brand-navy/90 backdrop-blur-sm text-white text-[11px] font-bold">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.titleEn}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerptEn}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs pt-4">
                <span className="text-slate-400">{post.publishedDate}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
