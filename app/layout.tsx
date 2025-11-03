import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://marsala.dev"),
  title: {
    default: "Marsala OS | Marsala.dev",
    template: "%s | Marsala.dev",
  },
  description:
    "Marsala OS is the intelligent growth studio for modular brand, web, AI and automation systems that grow with your business.",
  keywords: [
    "Marsala OS",
    "Next.js studio",
    "growth automation",
    "AI copilots",
    "digital operating system",
    "modular marketing stack",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marsala.dev",
    siteName: "Marsala.dev",
    title: "Marsala OS | Intelligent Growth Studio",
    description:
      "Design, build, and automate your digital ecosystem with modular intelligence across brand, web, CRM, AI, ads, and data.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marsala OS | Intelligent Growth Studio",
    description:
      "Design, build, and automate your digital ecosystem with modular intelligence across brand, web, CRM, AI, ads, and data.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
