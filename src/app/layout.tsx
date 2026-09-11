import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/site-chrome";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Shubham Rathour | Frontend & Full Stack Engineer",
  description: "Portfolio of Shubham Rathour - Frontend & Full Stack Engineer based in Dubai, UAE specializing in React.js, Next.js, TypeScript, and PostgreSQL.",
  openGraph: {
    title: "Shubham Rathour | Frontend & Full Stack Engineer",
    description: "Portfolio of Shubham Rathour - Frontend & Full Stack Engineer based in Dubai, UAE specializing in React.js, Next.js, TypeScript, and PostgreSQL.",
    siteName: "Shubham Rathour Portfolio",
    locale: "en_US",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
