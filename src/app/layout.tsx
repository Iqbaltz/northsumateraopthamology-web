import type { Metadata, Viewport } from "next";
import { Besley, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jonson.org";

export const viewport: Viewport = {
  themeColor: "#07868f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "JONSON · Journal of North Sumatera Ophthalmology Nexus",
    template: "%s · JONSON",
  },
  description:
    "A peer-reviewed, open-access journal in ophthalmology and vision science published by Rumah Sakit Khusus Mata Mencirim 77 Medan.",
  keywords: [
    "Ophthalmology",
    "Journal of North Sumatera Ophthalmology",
    "JONSON",
    "Vision Science",
    "Eye Research",
    "Retina",
    "Glaucoma",
    "Cataract",
    "Kesehatan Mata",
    "Jurnal Dokter Mata",
    "Rumah Sakit Mata Mencirim 77",
    "Open Access Journal",
    "Peer Reviewed",
    "Medan",
    "Sumatera Utara",
  ],
  authors: [{ name: "Rumah Sakit Khusus Mata Mencirim 77", url: baseUrl }],
  creator: "Rumah Sakit Khusus Mata Mencirim 77",
  publisher: "Rumah Sakit Khusus Mata Mencirim 77",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "JONSON Journal",
    title: "JONSON · Journal of North Sumatera Ophthalmology Nexus",
    description:
      "Peer-reviewed, open-access journal publishing high-impact research across ophthalmology and vision science.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JONSON - Journal of North Sumatera Ophthalmology Nexus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JONSON · Journal of North Sumatera Ophthalmology Nexus",
    description:
      "Peer-reviewed, open-access journal publishing high-impact research across ophthalmology and vision science.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${besley.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
