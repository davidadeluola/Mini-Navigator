import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/src/components/web/navbar";
import { ThemeProvider } from "@/components/web/theme-provider";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/components/web/ConvexClientProvider";
import { getToken } from "@/lib/auth-server";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "David Adeluola | MiniNavigator",
    template: "%s | MiniNavigator",
  },
  description:
    "Personal blog and digital garden of David Adeluola — Computer engineering student, product engineer, and AI enthusiast building things nobody asked for in Lagos.",
  keywords: [
    "David Adeluola",
    "Product Engineer",
    "AI Enthusiast",
    "Computer Engineering",
    "Next.js",
    "Convex",
    "Lagos",
    "Software Development",
    "Tech Blog",
  ],
  authors: [{ name: "David Adeluola", url: "https://adeluola.vercel.app" }],
  creator: "David Adeluola",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adeluola.vercel.app",
    title: "David Adeluola | MiniNavigator",
    description:
      "Personal blog and digital garden of David Adeluola — Computer engineering student, product engineer, and AI enthusiast building things nobody asked for.",
    siteName: "MiniNavigator",
    images: [
      {
        url: "https://images.unsplash.com/photo-1780328766286-23e6cb082cb9?w=1200&h=630&auto=format&fit=crop&q=80", // Standard OG image size
        width: 1200,
        height: 630,
        alt: "MiniNavigator Default Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Adeluola | MiniNavigator",
    description:
      "Personal blog and digital garden of David Adeluola.",
    creator: "@davidadeluola", // Feel free to change this!
    images: ["https://images.unsplash.com/photo-1780328766286-23e6cb082cb9?w=1200&h=630&auto=format&fit=crop&q=80"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        "font-sans",
        inter.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme={false}
          disableTransitionOnChange
        >
          <ConvexClientProvider initialToken={token}>
            {children}
       
          </ConvexClientProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
