import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sparkles from "@/components/Sparkles";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "To My Beautiful Kuchu | A Love Story",
  description: "A digital scrapbook and love letter dedicated to the most amazing girl in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen font-sans antialiased selection:bg-romantic-pink selection:text-deep-purple",
          inter.variable,
          playfair.variable
        )}
      >
        <Sparkles />
        {children}
      </body>
    </html>
  );
}
