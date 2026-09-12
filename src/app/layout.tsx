import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import SiteChrome from "@/components/site-chrome";
import CustomCursor from "@/components/CustomCursor";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SiteChrome>{children}</SiteChrome>
          <CustomCursor />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
