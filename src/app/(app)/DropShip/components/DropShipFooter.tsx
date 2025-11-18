import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send, Instagram, Youtube } from "lucide-react";

export default function DropShipFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/70">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <div className="inline-block mb-2">
            <div className="relative h-16 w-48">
              <Image
                src="/media/wifi-money-white-logo.png"
                alt="WiFi Money"
                fill
                className="object-contain object-left"
                sizes="192px"
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-white/70">Start. Scale. Succeed.</p>
        </div>

        <div>
          <div className="font-semibold mb-3">About</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Dropshipping Program</li>
            <li>E-commerce Education</li>
            <li>Store Building</li>
            <li>Product Research</li>
            <li>Business Growth</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Resources</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Beginner Guide</li>
            <li>Store Setup Tools</li>
            <li>Product Ideas</li>
            <li>Marketing Tips</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Connect</div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="WhatsApp" className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition">
              <MessageCircle className="text-white" size={20} strokeWidth={1.8} />
            </a>
            <a href="https://t.me/wifimoneyai" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition">
              <Send className="text-white" size={20} strokeWidth={1.8} />
            </a>
            <a href="#" aria-label="Instagram" className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition">
              <Instagram className="text-white" size={20} strokeWidth={1.8} />
            </a>
            <a href="#" aria-label="YouTube" className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition">
              <Youtube className="text-white" size={20} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
          <div className="text-xs text-white/60 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} WiFi Money. All rights reserved.</span>
            <span className="space-x-3">
              <Link href="/privacy" className="hover:text-[#C9A646] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#C9A646] transition-colors">Terms</Link>
              <span>Disclaimer</span>
            </span>
            <span>Made in Dubai</span>
          </div>
          <div className="text-xs text-white/50 text-center max-w-4xl mx-auto leading-relaxed">
            E-commerce involves financial risk and may not be suitable for all. WiFi Money provides education, not business advice. Past results do not guarantee future performance.
          </div>
        </div>
      </div>
    </footer>
  );
}

