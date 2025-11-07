import Button from "@/components/shared/Button";

export default function JoinMovement() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Earn from Your WiFi?</h2>
      <p className="mx-auto mt-3 max-w-2xl text-white/70">Start learning. Start trading. Start growing.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button>Join WiFi Money Now →</Button>
        <Button variant="glass">Watch Success Stories ▶</Button>
      </div>
      <div className="mt-6 text-xs text-white/60">🎉 Raj earned $320 • Sarah made $550 • Mike profited $890 • Priya earned $420...</div>
    </section>
  );
}



