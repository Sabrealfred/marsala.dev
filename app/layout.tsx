import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

// Space Grotesk for headings/display
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Inter for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// IBM Plex Mono for code
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
  preload: false,
});

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
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} min-h-screen bg-white font-sans antialiased dark:bg-moss-950`}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
