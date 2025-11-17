"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

type EnrollModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function EnrollModal({ isOpen, onClose, title = "Get Started" }: EnrollModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 bg-black/50 rounded-full p-2"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6 px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold gradient-text-gold mb-2">
              {title}
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Fill out the form below and we&apos;ll get back to you soon!
            </p>
          </div>

          <ContactForm hideHeading />
        </div>
      </div>
    </div>
  );
}

