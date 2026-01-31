"use client";

import React from "react";
import GlassCard from "@/components/shared/GlassCard";
import Button from "@/components/shared/Button";
import { Send, QrCode, Clock } from "lucide-react";
import Image from "next/image";

export default function SocialLinks() {
  const telegramLink = "https://t.me/wifimoneyai";

  return (
    <div className="space-y-6">
      {/* QR Code Card */}
      <GlassCard className="p-6 text-center">
        <QrCode className="w-20 h-20 text-[#C9A646] mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Scan to Join Telegram</h3>
        <p className="text-sm text-white/60 mb-4">Join our community instantly</p>
        <div className="w-48 h-48 mx-auto bg-white rounded-lg border-2 border-[#C9A646]/30 overflow-hidden">
          <Image
            src="/media/Telegram_qr.png"
            alt="Telegram QR Code"
            width={300}
            height={300}
            className="w-full h-full object-contain rounded"
          />
        </div>
      </GlassCard>

      {/* Quick Connect - Telegram */}
      <div className="space-y-3">
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            variant="glass"
            className="w-full justify-start gap-3 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border-[#0088cc]/30"
          >
            <Send size={20} />
            <span>Join the community</span>
          </Button>
        </a>
      </div>

      {/* Response Time Card */}
      <GlassCard className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center">
              <Clock className="w-6 h-6 text-black" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Response Time</h3>
            <p className="text-white/70 text-sm mb-1">
              <span className="text-[#C9A646]">⏱️</span> Average response: 2 hours
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

