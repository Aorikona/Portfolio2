import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/core/providers";
import { SeoStructuredData } from "@/components/core/seo-structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "DevPortfolio — Expériences immersives & performances front";
const description =
  "DevPortfolio conçoit des interfaces 3D/2D ultra performantes avec Next.js, Spline et framer-motion. Portfolio bureau interactif, vidéos immersives et storytelling créatif.";

export const metadata: Metadata = {
  metadataBase: new URL("https://devportfolio.studio"), // This should be a string
  title: {
    default: title,
    template: "%s | DevPortfolio",
  },
  description,
  keywords: [
    "Next.js",
    "Spline",
    "Creative developer",
    "Portfolio 3D",
    "Framer Motion",
    "TypeScript",
    "DevPortfolio",
  ],
  openGraph: {
    title,
    description,
    url: "https://devportfolio.studio",
    siteName: "DevPortfolio",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DevPortfolio — bureau immersif",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@devportfolio",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 antialiased`}
      >
        <SeoStructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
