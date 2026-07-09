import type { Metadata } from "next";
import { Fraunces, Open_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsentManager } from "@/components/ConsentManager";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteConfig } from "@/config/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "AESURUS | Data Protection Act Compliance, Jamaica",
    template: "%s | AESURUS",
  },
  description: siteConfig.description,
  keywords: [
    "Data Protection Act Jamaica compliance",
    "DPA 2020 Jamaica",
    "data protection officer Jamaica",
    "OIC registration Jamaica",
    "managed IT security Jamaica",
    "managed security services Jamaica",
    "cloud services Jamaica",
    "Azure cloud Jamaica",
    "free DPA assessment Jamaica",
  ],
  openGraph: {
    type: "website",
    locale: "en_JM",
    url: siteConfig.siteUrl,
    siteName: "AESURUS",
    title: "AESURUS | Data Protection Act Compliance, Jamaica",
    description: siteConfig.description,
    images: [{ url: "/logo-blue.png", width: 500, height: 110, alt: "AESURUS" }],
  },
  twitter: {
    card: "summary",
    title: "AESURUS | Data Protection Act Compliance, Jamaica",
    description: siteConfig.description,
    images: ["/logo-blue.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { plausibleDomain, vercelAnalytics } = siteConfig.analytics;

  return (
    <html lang="en-JM" className={`${fraunces.variable} ${openSans.variable} ${plexMono.variable}`}>
      <body>
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
        <ConsentManager />

        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        {vercelAnalytics && <Analytics />}
      </body>
    </html>
  );
}
