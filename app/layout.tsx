import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "C Commerce - Bangladesh's Smart Ecommerce SaaS Platform",
  description: "Create your own online store in minutes. Bangladesh's most powerful ecommerce SaaS platform for modern businesses.",
  keywords: "ecommerce, Bangladesh, online store, SaaS, bKash, Nagad, COD",
  icons: {
    icon: "/brand/c-commerce-icon.png",
    shortcut: "/brand/c-commerce-icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
