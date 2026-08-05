import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/page-transition";
import { ScrollToTop } from "@/components/landing/scroll-to-top";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0712" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DICDO – Dire Integrated Community Development Organization",
  description:
    "DICDO empowers communities in Ethiopia through peacebuilding, education, and sustainable development. Building peaceful, self-sufficient communities since 2014.",
  keywords: [
    "DICDO",
    "Dire Integrated Community Development Organization",
    "Ethiopia NGO",
    "community development Ethiopia",
    "peacebuilding Ethiopia",
    "education Ethiopia",
    "women empowerment Ethiopia",
    "sustainable development",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "DICDO – Building Peaceful Communities Together",
    description:
      "Empowering communities in Ethiopia through peacebuilding, education, and sustainable development since 2014.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
