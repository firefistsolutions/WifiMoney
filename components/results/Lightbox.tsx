"use client";

import React, { useEffect } from "react";
import { X, Play, Image as ImageIcon } from "lucide-react";
import { ProofCardData } from "./ProofCard";

type LightboxProps = {
  proof: ProofCardData | null;
  onClose: () => void;
};

export default function Lightbox({ proof, onClose }: LightboxProps) {
  useEffect(() => {
    if (proof) {
      // Lock body scroll when lightbox is open
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [proof]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && proof) {
        onClose();
      }
    };

    if (proof) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [proof, onClose]);

  if (!proof) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl max-h-[90vh] w-full mx-2 md:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 md:-top-12 right-0 md:right-0 text-white hover:text-[#C9A646] transition-colors z-10 bg-black/50 rounded-full p-2"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="relative bg-black/50 rounded-lg overflow-hidden">
          {proof.type === "video" ? (
            <div className="relative aspect-video">
              <iframe
                src={proof.src}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={proof.title || "Video"}
              />
            </div>
          ) : (
            <div className="relative max-h-[90vh] min-h-[400px] flex items-center justify-center bg-gradient-to-br from-[#C9A646]/20 via-[#0072FF]/10 to-black">
              <div className="text-center">
                <ImageIcon className="w-24 h-24 text-[#C9A646]/50 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Image Preview</p>
                {proof.title && (
                  <p className="text-white/40 text-sm mt-2">{proof.title}</p>
                )}
              </div>
            </div>
          )}

          {(proof.title || proof.profit || proof.traderName) && (
            <div className="p-6 bg-black/80">
              {proof.title && (
                <h3 className="text-2xl font-bold text-white mb-2">
                  {proof.title}
                </h3>
              )}
              {proof.profit && (
                <p className="text-[#C9A646] text-xl font-semibold mb-2">
                  {proof.profit}
                </p>
              )}
              {proof.traderName && (
                <p className="text-white/70">by {proof.traderName}</p>
              )}
              {proof.date && (
                <p className="text-white/50 text-sm mt-2">{proof.date}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

