import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Deep dives, playbooks, and frameworks on modular growth systems, automation, and AI from the Marsala team.",
};

export default function BlogPage() {
  redirect("/research");
}
