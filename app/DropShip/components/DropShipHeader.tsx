"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "@/components/shared/Button";
import { useEnrollModal } from "@/components/shared/EnrollModalProvider";

export default function DropShipHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useEnrollModal();

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
        <div className="flex items-center h-full">
          <div className="relative h-10 w-32">
            <Image
              src="/media/wifi-money-white-logo.png"
              alt="WiFi Money"
              fill
              className="object-contain object-left"
              priority
              sizes="128px"
            />
          </div>
        </div>

        <div className="hidden md:block">
          <Button onClick={() => openModal("Join Dropshipping Program")}>Join Now</Button>
        </div>
      </div>
    </header>
  );
}

