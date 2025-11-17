"use client";

import React, { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  // Replace with your actual WhatsApp and Telegram links
  const whatsappLink = "https://wa.me/1234567890"; // Replace with your WhatsApp number
  const telegramLink = "https://t.me/wifimoneyai";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Options Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-fade-in-up">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={20} />
            <span className="font-medium">WhatsApp</span>
          </a>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#0088cc] hover:bg-[#0077B5] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            aria-label="Chat on Telegram"
          >
            <Send size={20} />
            <span className="font-medium">Telegram</span>
          </a>
        </div>
      )}

      {/* Main Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A646] to-[#F4D03F] text-black shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        aria-label={isOpen ? "Close chat options" : "Open chat options"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}

