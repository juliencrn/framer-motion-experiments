import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My experiments with framer-motion",
  description: "Experiments with the framer-motion animation library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-background dark min-h-screen font-sans antialiased flex flex-col"
        )}
      >
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
