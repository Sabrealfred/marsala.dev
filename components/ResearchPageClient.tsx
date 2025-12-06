"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CpuChipIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

// Types locales para evitar dependencias de servidor
type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  type?: string;
  content: string;
};

type BlogCategory = {
  id: string;
  name: string;
  iconName: string;
  description?: string;
  color?: string;
};

// Icon mapping
const ICON_MAP: Record<string, React.ElementType> = {
  ArrowTrendingUpIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  CpuChipIcon,
  BriefcaseIcon,
  BookOpenIcon,
};

function getIconComponent(iconName: string): React.ElementType {
  return ICON_MAP[iconName] || BookOpenIcon;
}

function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getCategoryIcon(tags: string[] = []): React.ElementType {
  const tagsLower = tags.map(t => t.toLowerCase());

  if (tagsLower.some(t => t.includes("ai") || t.includes("automation"))) return CpuChipIcon;
  if (tagsLower.some(t => t.includes("growth") || t.includes("marketing"))) return ArrowTrendingUpIcon;
  if (tagsLower.some(t => t.includes("data") || t.includes("analytics"))) return ChartBarIcon;
  if (tagsLower.some(t => t.includes("crm") || t.includes("sales"))) return BriefcaseIcon;
  if (tagsLower.some(t => t.includes("architecture") || t.includes("stack"))) return WrenchScrewdriverIcon;

  return BookOpenIcon;
}

function getCategoryName(tags: string[] = []): string {
  const tagsLower = tags.map(t => t.toLowerCase());

  if (tagsLower.some(t => t.includes("ai") || t.includes("automation"))) return "AI & Automation";
  if (tagsLower.some(t => t.includes("growth") || t.includes("marketing"))) return "Growth & Marketing";
  if (tagsLower.some(t => t.includes("data") || t.includes("analytics"))) return "Data & Analytics";
  if (tagsLower.some(t => t.includes("crm") || t.includes("sales"))) return "CRM & Sales";
  if (tagsLower.some(t => t.includes("architecture") || t.includes("stack"))) return "Tech & Architecture";

  return "Frameworks & Playbooks";
}

type ResearchPageClientProps = {
  allPosts: BlogPost[];
  postsByCategory: Record<string, BlogPost[]>;
  categories: BlogCategory[];
};

export function ResearchPageClient({ allPosts, postsByCategory, categories }: ResearchPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(allPosts.flatMap(post => post.tags || []))
  ).sort();

  // Filter posts based on category, search, and tag
  let displayPosts = selectedCategory
    ? postsByCategory[selectedCategory] || []
    : allPosts;

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    displayPosts = displayPosts.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply tag filter
  if (selectedTag) {
    displayPosts = displayPosts.filter(post =>
      post.tags?.map(t => t.toLowerCase()).includes(selectedTag.toLowerCase())
    );
  }

  return (
    <>
      {/* Search and Filters */}
      <section className="sticky top-0 z-20 bg-slate-50 dark:bg-slate-900 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 py-6 shadow-lg">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-[#051c2c] dark:text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, content, or tags..."
                className="w-full rounded-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#051c2c]/20 dark:focus:ring-slate-100/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 dark:text-slate-400 hover:text-[#051c2c] dark:hover:text-slate-100 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Label */}
          <div className="mb-4 flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-[#051c2c] dark:text-slate-100" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">Filter by Category</span>
          </div>

          {/* Category Buttons */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`group flex-shrink-0 rounded-sm px-6 py-3 text-sm font-bold transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-[#051c2c] dark:bg-slate-100 text-white dark:text-[#051c2c] shadow-lg scale-105"
                  : "border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-300 hover:border-[#051c2c] dark:hover:border-slate-100 hover:shadow-lg hover:scale-105"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-sm text-lg ${
                  selectedCategory === null
                    ? "bg-white/20 dark:bg-[#051c2c]/20"
                    : "bg-slate-100 dark:bg-slate-800"
                }`}>
                  <BookOpenIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs uppercase tracking-wider opacity-80">All</span>
                  <span className="text-sm font-bold">{allPosts.length} articles</span>
                </div>
              </div>
            </button>

            {categories.map((category) => {
              const count = postsByCategory[category.id]?.length || 0;
              if (count === 0) return null;

              const isActive = selectedCategory === category.id;
              const CategoryIcon = getIconComponent(category.iconName);

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group flex-shrink-0 rounded-sm px-6 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#051c2c] dark:bg-slate-100 text-white dark:text-[#051c2c] shadow-lg scale-105"
                      : "border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-300 hover:border-[#051c2c] dark:hover:border-slate-100 hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-sm text-lg transition-all ${
                      isActive
                        ? "bg-white/20 dark:bg-[#051c2c]/20"
                        : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                    }`}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`text-xs uppercase tracking-wider ${isActive ? "opacity-90" : "opacity-70"}`}>
                        {category.name.split(" ")[0]}
                      </span>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Category Description */}
          {selectedCategory && (() => {
            const activeCategory = categories.find(c => c.id === selectedCategory);
            const CategoryIcon = activeCategory ? getIconComponent(activeCategory.iconName) : null;
            return activeCategory?.description && CategoryIcon && (
              <div className="mt-4 rounded-sm border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-navy-950 px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100 text-lg shadow-lg">
                    <CategoryIcon className="h-6 w-6 text-white dark:text-[#051c2c]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                      {activeCategory.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <TagIcon className="h-4 w-4 text-[#051c2c] dark:text-slate-100" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">Filter by Tag</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`rounded-sm px-4 py-2 text-xs font-semibold transition-all ${
                    selectedTag === null
                      ? "bg-[#051c2c] dark:bg-slate-100 text-white dark:text-[#051c2c] shadow-md"
                      : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-300 hover:border-[#051c2c] dark:hover:border-slate-100"
                  }`}
                >
                  All Tags
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`rounded-sm px-4 py-2 text-xs font-semibold transition-all ${
                      selectedTag === tag
                        ? "bg-[#051c2c] dark:bg-slate-100 text-white dark:text-[#051c2c] shadow-md"
                        : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-300 hover:border-[#051c2c] dark:hover:border-slate-100"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-white dark:bg-navy-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {displayPosts.length === 0 && (
            <div className="rounded-sm border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100">
                  <BookOpenIcon className="h-8 w-8 text-white dark:text-[#051c2c]" />
                </div>
                <h3 className="text-lg font-bold text-[#051c2c] dark:text-white">No articles found</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {searchQuery || selectedTag || selectedCategory
                    ? "Try adjusting your search or filter criteria to find what you're looking for."
                    : "Check back soon for new content!"}
                </p>
                {(searchQuery || selectedTag || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTag(null);
                      setSelectedCategory(null);
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-sm border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all hover:border-[#051c2c] dark:hover:border-slate-100"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {displayPosts.map((post) => {
              const CategoryIcon = getCategoryIcon(post.tags);
              const categoryName = getCategoryName(post.tags);

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full overflow-hidden rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-500 hover:border-[#051c2c] dark:hover:border-slate-100 hover:shadow-2xl hover:-translate-y-2">
                    {/* Top Color Bar */}
                    <div className="h-1 w-full bg-[#051c2c] dark:bg-slate-100" />

                    {/* Content */}
                    <div className="relative p-8 space-y-5">
                      {/* Category Badge - Larger & Prominent */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100 text-2xl shadow-lg">
                          <CategoryIcon className="h-8 w-8 text-white dark:text-[#051c2c]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                            {categoryName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{formatBlogDate(post.date)}</p>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold leading-tight text-[#051c2c] dark:text-white transition-all duration-300 lg:text-2xl min-h-[3.5rem]">
                        {post.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 min-h-[4rem]">
                        {post.summary}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="rounded-sm bg-[#051c2c] dark:bg-slate-100 px-3 py-1.5 font-semibold text-white dark:text-[#051c2c]">
                          {post.type}
                        </span>
                        {post.readingTime && (
                          <>
                            <span className="text-slate-400 dark:text-slate-500">•</span>
                            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {post.readingTime}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More Arrow */}
                      <div className="flex items-center gap-2 pt-4 text-sm font-bold text-[#051c2c] dark:text-slate-100 transition-all duration-300 group-hover:gap-4">
                        <span>Read Article</span>
                        <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12 lg:py-16 border-t border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-[#051c2c] dark:text-slate-100 lg:text-4xl tracking-tight">
            Need help with your growth stack?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300 tracking-wide">
            Schedule a call to design your ideal modular system
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#051c2c] dark:bg-slate-100 px-8 py-3 text-base font-semibold text-white dark:text-[#051c2c] shadow-lg transition-all duration-300 hover:bg-[#062433] dark:hover:bg-slate-200"
          >
            Get in Touch
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
