import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VdsThemeProvider } from "@/features/platform/design-system/theme/ThemeProvider";
import { ThemeBootstrap } from "@/features/platform/design-system/theme/ThemeBootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://vayon.app"),
  title: { default: "Vayon OS", template: "%s | Vayon" },
  description: "The AI operating system for modern businesses. Unite AI employees, CRM, messaging, knowledge, automation, analytics, and enterprise governance.",
  alternates: { canonical: "/" },
  applicationName: "Vayon OS",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/assets/brand/favicon.ico", sizes: "256x256" },
      { url: "/assets/brand/favicon.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/assets/brand/favicon.ico",
    apple: "/assets/brand/apple-touch-icon.png",
  },
  openGraph: { title: "Vayon — The AI Operating System for Modern Businesses", description: "Unify your AI workforce, customer data, communications, knowledge, automation, and governance.", url: "/", type: "website", siteName: "Vayon", images: [{ url: "/assets/brand/opengraph-image.png", width: 1200, height: 630, alt: "VAYON" }] },
  twitter: { card: "summary_large_image", title: "Vayon — The AI Operating System for Modern Businesses", description: "One operating system for AI-powered business.", images: ["/assets/brand/twitter-image.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head><ThemeBootstrap /></head><body className="min-h-full flex flex-col"><VdsThemeProvider>{children}</VdsThemeProvider></body>
    </html>
  );
}
