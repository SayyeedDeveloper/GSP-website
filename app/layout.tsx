import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Woven polypropylene bags wholesale in Uzbekistan | Great Soatobod Production",
  description:
    "Great Soatobod Production makes certified woven polypropylene bags and onion mesh bags for grain, flour, sugar, salt and vegetables. Wholesale volumes, delivery across Uzbekistan and neighbouring countries.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Great Soatobod Production",
    title: "Woven polypropylene bags for food, farm and industry",
    description: "Certified polypropylene and mesh bags, wholesale. Delivery across Uzbekistan by our own fleet.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#FFFFFF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
