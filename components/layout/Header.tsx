"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "@/components/shared/Button";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl transition-all",
        isScrolled ? "bg-black/70 shadow-lg" : "bg-black/40"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-extrabold tracking-wide gradient-text-gold">
          WiFi Money
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button>Join Now</Button>
        </div>

        <button
          aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
          className="md:hidden"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="inline-block h-6 w-6">
            <span className={clsx("block h-0.5 w-6 bg-white transition-transform", isOpen && "translate-y-2 rotate-45")} />
            <span className={clsx("mt-1.5 block h-0.5 w-6 bg-white transition-opacity", isOpen && "opacity-0")} />
            <span className={clsx("mt-1.5 block h-0.5 w-6 bg-white transition-transform", isOpen && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "md:hidden transition-[max-height] duration-300 overflow-hidden border-t border-white/10",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-4 py-3 space-y-2 bg-black/70">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="block py-2 text-white/90">
              {item.label}
            </Link>
          ))}
          <Button className="w-full">Join Now</Button>
        </div>
      </div>
    </header>
  );
}



