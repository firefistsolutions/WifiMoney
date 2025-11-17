import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingChat from "@/components/layout/FloatingChat";
import { EnrollModalProvider } from "@/components/shared/EnrollModalProvider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wifi Money",
  description: "Wifi Money is a platform for learning and trading.",
  icons: {
    icon: "/media/wifi-money-white-logo.png",
    shortcut: "/media/wifi-money-white-logo.png",
    apple: "/media/wifi-money-white-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}>
        <EnrollModalProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-black text-white px-3 py-2 rounded">Skip to main content</a>
          <ScrollProgress />
          <ConditionalLayout>
            <main id="main" className="mx-auto max-w-6xl px-4 ">
              {children}
            </main>
          </ConditionalLayout>
          <FloatingChat />
        </EnrollModalProvider>
      </body>
    </html>
  );
}
