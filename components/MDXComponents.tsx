import type { AnchorHTMLAttributes } from "react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

export const mdxComponents: MDXRemoteProps["components"] = {
  h1: (props) => (
    <h1
      {...props}
      className="text-4xl font-semibold leading-tight text-moss-950 md:text-5xl"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mt-10 text-3xl font-semibold text-moss-900"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-8 text-2xl font-semibold text-moss-900"
    />
  ),
  p: (props) => (
    <p
      {...props}
      className="mt-6 text-lg leading-relaxed text-sage-800"
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="mt-6 list-disc space-y-3 pl-6 text-lg text-sage-800"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="mt-6 list-decimal space-y-3 pl-6 text-lg text-sage-800"
    />
  ),
  li: (props) => (
    <li
      {...props}
      className="leading-relaxed"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-6 border-l-4 border-moss-400 bg-moss-50/60 px-6 py-4 text-lg italic text-moss-900"
    />
  ),
  code: ({ className, ...props }) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code
          {...props}
          className="rounded-sm bg-moss-900/90 px-2 py-1 text-sm text-white"
        />
      );
    }

    return (
      <code
        {...props}
        className={className}
      />
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="mt-6 overflow-x-auto rounded-sm bg-moss-950/95 p-6 text-sm text-white shadow-inner"
    >
      {children}
    </pre>
  ),
  hr: (props) => (
    <hr
      {...props}
      className="my-12 border-t border-moss-200"
    />
  ),
  a: ({ href = "#", className, target, rel, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      target={target ?? (href?.startsWith("http") ? "_blank" : undefined)}
      rel={rel ?? (href?.startsWith("http") ? "noreferrer noopener" : undefined)}
      {...props}
      className={cn(
        "font-semibold text-moss-700 underline decoration-moss-300 decoration-2 underline-offset-4 transition-colors hover:text-moss-900",
        className
      )}
    />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto rounded-sm border border-moss-100">
      <table
        {...props}
        className="w-full text-left text-sm text-sage-800"
      />
    </div>
  ),
  th: (props) => (
    <th
      {...props}
      className="bg-moss-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-moss-700"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="px-4 py-3"
    />
  ),
};
