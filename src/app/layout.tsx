import type { Metadata } from "next";
import { Dancing_Script, Hanken_Grotesk } from "next/font/google";
import { brand } from "@/data/brand";
import "./globals.css";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-dancing",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} · Detalles y regalos a domicilio en ${brand.city}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  keywords: [...brand.keywords],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // ponytail: OG image reuses the logo; swap for a 1200×630 art when there is one.
  icons: { icon: "/logo-concarino.png" },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: brand.siteUrl,
    siteName: brand.name,
    title: `${brand.name} · Detalles y regalos en ${brand.city}`,
    description: brand.description,
    images: ["/logo-concarino.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} · Detalles en ${brand.city}`,
    description: brand.description,
    images: ["/logo-concarino.png"],
  },
};

import { Suspense } from "react";
import { GlobalLoadingOverlay } from "@/components/organisms/GlobalLoadingOverlay";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-EC" className={`${dancing.variable} ${hanken.variable}`}>
      <body>
        <Suspense fallback={null}>
          <GlobalLoadingOverlay />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
