"use client";

import Button from "@/components/shared/Button";
import { useEnrollModal } from "@/components/shared/EnrollModalProvider";
import Link from "next/link";

export default function JoinMovement() {
  const { openModal } = useEnrollModal();
  
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Earn from Your WiFi?</h2>
      <p className="mx-auto mt-3 max-w-2xl text-white/70">Start learning. Start trading. Start growing.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button onClick={() => openModal("Join WiFi Money")}>Join WiFi Money Now →</Button>
        <Link href="/results">
          <Button variant="glass">Watch Success Stories ▶</Button>
        </Link>
      </div>
      <div className="mt-6 text-xs text-white/60">🎉 Raj earned $320 • Sarah made $550 • Mike profited $890 • Priya earned $420...</div>
    </section>
  );
}



