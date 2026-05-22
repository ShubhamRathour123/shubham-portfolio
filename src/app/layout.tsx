import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/site-chrome";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Shubham Rathour | Next.js Developer",
  description: "Professional Next.js Developer Portfolio",
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
