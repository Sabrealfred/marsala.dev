"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

// Types importados localmente para evitar dependencias de servidor
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
  icon: string;
};

function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getCategoryIcon(tags: string[] = []): string {
  const tagsLower = tags.map(t => t.toLowerCase());

  if (tagsLower.some(t => t.includes("ai") || t.includes("automation"))) return "🤖";
  if (tagsLower.some(t => t.includes("growth") || t.includes("marketing"))) return "📈";
  if (tagsLower.some(t => t.includes("data") || t.includes("analytics"))) return "📊";
  if (tagsLower.some(t => t.includes("crm") || t.includes("sales"))) return "💼";
  if (tagsLower.some(t => t.includes("architecture") || t.includes("stack"))) return "⚙️";

  return "📚";
}

type BlogCarouselProps = {
  posts: BlogPost[];
};

export function BlogCarousel({ posts }: BlogCarouselProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const featuredPosts = posts.slice(0, 10); // Show top 10 posts for more variety

  useEffect(() => {
    if (!isAutoPlaying || featuredPosts.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredPosts.length]);

  // Re-enable auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (isAutoPlaying) return;

    const timeout = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isAutoPlaying, currentIndex]);

  if (featuredPosts.length === 0) return null;

  const currentPost = featuredPosts[currentIndex];
  const categoryIcon = getCategoryIcon(currentPost.tags);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
    setIsAutoPlaying(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="group relative overflow-hidden rounded-sm border-2 border-slate-200 bg-white p-8 shadow-card transition-all duration-500 hover:border-slate-300 hover:shadow-lg lg:p-12 dark:border-slate-700 dark:bg-navy-950 dark:hover:border-slate-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-br from-slate-300 to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-gradient-to-tl from-slate-300 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#051c2c] text-lg shadow-sm dark:bg-slate-700">
              📚
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#051c2c] dark:text-white">
                Latest Insights
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">From Marsala Research</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 bg-white text-[#051c2c] transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:border-slate-500 dark:hover:bg-slate-700"
              aria-label="Previous post"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 bg-white text-[#051c2c] transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:border-slate-500 dark:hover:bg-slate-700"
              aria-label="Next post"
            >
              →
            </button>
          </div>
        </div>

        {/* Post Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Link
              href={`/blog/${currentPost.slug}`}
              className="block space-y-4"
            >
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-sm bg-[#051c2c] px-3 py-1 text-white shadow-sm dark:bg-slate-700">
                  {categoryIcon} {currentPost.type || "Insight"}
                </span>
                <span className="text-slate-600 dark:text-slate-400">·</span>
                <span className="text-slate-600 dark:text-slate-400">{formatBlogDate(currentPost.date)}</span>
                {currentPost.readingTime && (
                  <>
                    <span className="text-slate-600 dark:text-slate-400">·</span>
                    <span className="text-slate-600 dark:text-slate-400">{currentPost.readingTime}</span>
                  </>
                )}
              </div>

              {/* Title & Summary */}
              <div>
                <h4 className="text-2xl font-bold text-[#051c2c] transition-colors group-hover:text-slate-700 lg:text-3xl dark:text-white dark:group-hover:text-slate-200">
                  {currentPost.title}
                </h4>
                <p className="mt-3 line-clamp-2 text-base text-slate-700 lg:text-lg dark:text-slate-300">
                  {currentPost.summary}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentPost.tags?.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-slate-200 bg-white/60 px-3 py-1 text-xs font-semibold text-[#051c2c] backdrop-blur-sm dark:border-slate-600 dark:bg-slate-800/60 dark:text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-semibold text-[#051c2c] transition-all duration-300 group-hover:translate-x-1 dark:text-white">
                <span>{t("common.readMore")}</span>
                <span>→</span>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {featuredPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-sm transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-[#051c2c] shadow-sm dark:bg-slate-200"
                  : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-[#051c2c] dark:bg-slate-200"
            style={{
              animation: "progress 5s linear infinite",
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
