import type { Metadata } from "next";
import { Inter, Roboto_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

// McKinsey-style serif for headings (elegant, authoritative)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
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
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased dark:bg-navy-950">
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
