"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="group relative overflow-hidden rounded-4xl border-2 border-moss-200 bg-gradient-to-br from-white via-cream-50 to-moss-50 p-8 shadow-card transition-all duration-500 hover:border-moss-400 hover:shadow-hover lg:p-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-moss-gradient blur-3xl" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-sage-gradient blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss-gradient text-lg shadow-glow">
              📚
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-moss-700">
                Latest Insights
              </h3>
              <p className="text-xs text-sage-600">From Marsala Research</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-moss-300 bg-white text-moss-700 transition-all hover:border-moss-500 hover:bg-moss-50"
              aria-label="Previous post"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-moss-300 bg-white text-moss-700 transition-all hover:border-moss-500 hover:bg-moss-50"
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
                <span className="rounded-full bg-moss-gradient px-3 py-1 text-white shadow-sm">
                  {categoryIcon} {currentPost.type || "Insight"}
                </span>
                <span className="text-sage-600">·</span>
                <span className="text-sage-600">{formatBlogDate(currentPost.date)}</span>
                {currentPost.readingTime && (
                  <>
                    <span className="text-sage-600">·</span>
                    <span className="text-sage-600">{currentPost.readingTime}</span>
                  </>
                )}
              </div>

              {/* Title & Summary */}
              <div>
                <h4 className="text-2xl font-bold text-moss-950 transition-colors group-hover:text-moss-700 lg:text-3xl">
                  {currentPost.title}
                </h4>
                <p className="mt-3 line-clamp-2 text-base text-sage-700 lg:text-lg">
                  {currentPost.summary}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentPost.tags?.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-moss-200 bg-white/60 px-3 py-1 text-xs font-semibold text-moss-700 backdrop-blur-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-semibold text-moss-700 transition-all duration-300 group-hover:translate-x-1">
                <span>Leer artículo completo</span>
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
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-moss-gradient shadow-glow"
                  : "w-2 bg-moss-300 hover:bg-moss-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden bg-moss-100">
          <div
            className="h-full bg-moss-gradient"
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
