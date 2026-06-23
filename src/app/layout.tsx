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
  title: `${brand.name} · ${brand.tagline}`,
  description: brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${dancing.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
