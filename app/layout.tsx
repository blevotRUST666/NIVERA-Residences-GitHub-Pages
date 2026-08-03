import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = siteUrl
  ? "media/og-nivera.jpg"
  : `${assetBase}/media/og-nivera.jpg`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  ...(siteUrl
    ? { metadataBase: new URL(`${siteUrl.replace(/\/$/, "")}/`) }
    : {}),
  title: {
    default: "NIVERA Residences — Private Residential Concept",
    template: "%s — NIVERA Residences",
  },
  description:
    "A fictional luxury real-estate experience by NEIVUM WEB, designed around architectural storytelling, trust and a clear enquiry journey.",
  applicationName: "NIVERA Residences",
  keywords: [
    "real estate web design",
    "luxury property concept",
    "NEIVUM WEB",
    "interactive portfolio",
  ],
  authors: [{ name: "NEIVUM WEB", url: "https://t.me/neivumweb" }],
  creator: "NEIVUM WEB",
  openGraph: {
    title: "NIVERA Residences — A quieter kind of extraordinary",
    description:
      "A fictional premium real-estate experience created by NEIVUM WEB for portfolio demonstration.",
    type: "website",
    siteName: "NIVERA Residences",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "NIVERA Residences architectural concept",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIVERA Residences",
    description:
      "A fictional premium real-estate experience created by NEIVUM WEB.",
    images: [socialImage],
  },
  robots: { index: true, follow: true },
  other: {
    "codex-preview": "development",
    "concept-disclosure":
      "Fictional portfolio concept by NEIVUM WEB. No properties are offered for sale.",
  },
  icons: {
    icon: `${assetBase}/favicon.svg`,
    shortcut: `${assetBase}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
