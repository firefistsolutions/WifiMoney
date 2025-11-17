import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Send, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/70">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <Link href="/" className="inline-block mb-2">
            <div className="relative h-16 w-48">
              <Image
                src="/media/wifi-money-white-logo.png"
                alt="WiFi Money"
                fill
                className="object-contain object-left"
                sizes="192px"
              />
            </div>
          </Link>
          <p className="mt-2 text-sm text-white/70">Learn. Trade. Earn.</p>
        </div>

        <div>
          <div className="font-semibold mb-3">Quick Links</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/results">Results</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Resources</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="#">Beginner Guide</a></li>
            <li><a href="#">Trading Tools</a></li>
            <li><a href="#">Blog</a></li>
            <li><Link href="/faq">FAQs</Link></li>
            <li><a href="#">Support</a></li>
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
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="#">Disclaimer</Link>
            </span>
            <span>Made in Dubai</span>
          </div>
          <div className="text-xs text-white/50 text-center max-w-4xl mx-auto leading-relaxed">
            Trading involves financial risk and may not be suitable for all. WiFi Money provides education, not investment advice. Past results do not guarantee future performance.
          </div>
        </div>
      </div>
    </footer>
  );
}


