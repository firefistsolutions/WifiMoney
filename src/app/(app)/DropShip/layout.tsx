import type { Metadata } from "next";
import DropShipHeader from "./components/DropShipHeader";
import DropShipFooter from "./components/DropShipFooter";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingChat from "@/components/layout/FloatingChat";
import { EnrollModalProvider } from "@/components/shared/EnrollModalProvider";

export const metadata: Metadata = {
  title: "Dropshipping Program - WiFi Money",
  description: "Start your dropshipping journey with WiFi Money",
};

export default function DropShipLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EnrollModalProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-black text-white px-3 py-2 rounded">Skip to main content</a>
      <ScrollProgress />
      <DropShipHeader />
      <main id="main" className="mx-auto max-w-6xl px-4">
        {children}
      </main>
      <DropShipFooter />
      <FloatingChat />
    </EnrollModalProvider>
  );
}

