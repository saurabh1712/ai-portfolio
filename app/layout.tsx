import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // THIS LINE IS MANDATORY FOR STYLES TO WORK

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saurabh Gujar | AI/ML Engineer & Data Scientist",
  description: "Portfolio of Saurabh Gujar - MS Applied ML Student @ UMD. Specializing in Deep Learning, Computer Vision, and RAG Systems.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics /> {/* ADD THIS LINE HERE */}
      </body>
    </html>
  );
}