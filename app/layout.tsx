import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Fira_Code,
  Patrick_Hand,
  Kalam,
  Caveat
} from "next/font/google";
import "./styles/globals.css";
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/providers/theme-provider";
import siteConfig from "@/lib/site";
import { PORTFOLIO_URL, X_USERNAME } from "@/lib/constants";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HotkeyProvider } from "@/components/providers/hotkey-provider";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"]
});

export const handwriting = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-handwriting"
});

export const bodyHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tip"
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700", "500", "600"],
  variable: "--font-note"
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url
    }
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `/images/og.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${PORTFOLIO_URL}/images/og.png`],
    creator: `@${X_USERNAME}`
  },
  icons: {
    icon: [
      {
        url: "/images/profile2.png",
        sizes: "32x32"
      },
      {
        url: "/images/profile4.png",
        sizes: "any",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)"
      },
      {
        url: "/images/profile3.png",
        sizes: "any",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)"
      }
    ],
    apple: {
      url: "/images/profile2.png",
      type: "image/png",
      sizes: "180x180"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${firaCode.variable} ${handwriting.variable} ${bodyHand.variable} ${caveat.variable} ${caveat.variable} selection:bg-muted bg-background selection:text-accent-foreground selection:blur-out-3xl selection:blur-in-2xl scroll-mt-20 font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <HotkeyProvider>
            <ToastProvider position="top-center">
              <AnchoredToastProvider>
                <TooltipProvider>
                  {children}
                  <Analytics />
                </TooltipProvider>
              </AnchoredToastProvider>
            </ToastProvider>
          </HotkeyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
