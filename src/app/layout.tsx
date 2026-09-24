import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { profile } from "@/content/site";
import "./globals.css";
import "./cinematic.css";
import "./story.css";
import "./machine.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saumilagarwal.dev"),
  title: { default: "Saumil Agarwal | Systems & Agentic AI", template: "%s | Saumil Agarwal" },
  description: "Systems engineer building production distributed infrastructure, network security, and applied-AI products in Bengaluru.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "Saumil Agarwal | Systems & Agentic AI", description: profile.tagline, url: "/", siteName: "Saumil Agarwal", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "Saumil Agarwal | Systems & Agentic AI", description: profile.tagline },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('saumil-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}}())" }} />
      </head>
      <body className="min-h-full flex flex-col"><JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: profile.name, email: profile.email, url: "https://saumilagarwal.dev", homeLocation: { "@type": "Place", name: profile.location }, jobTitle: "Member of Technical Staff", knowsAbout: ["Distributed systems", "Network security", "Agentic AI", "Go", "Python"], sameAs: Object.values(profile.links) }} />{children}</body>
    </html>
  );
}
