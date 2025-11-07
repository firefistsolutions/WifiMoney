import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Button from "@/components/shared/Button";
import placeholder from "@/utils/placeholders";

const COURSES = [
  { title: "Beginner to Pro Forex Mastery", desc: "Build your foundation and learn how the markets move.", badge: "12 modules", icon: "🧠" },
  { title: "Technical Analysis & Chart Patterns", desc: "Master patterns and indicators used by professionals.", badge: "10 modules", icon: "💹" },
  { title: "Risk Management & Psychology", desc: "Protect capital and master the trader mindset.", badge: "8 modules", icon: "🛡️" },
  { title: "Advanced Trading Strategies", desc: "Unlock advanced techniques for consistency.", badge: "15 modules", icon: "⚡" },
  { title: "Live Trading Sessions", desc: "Watch real-time trades and live analysis.", badge: "Weekly", icon: "🎥" },
];

export default function CourseBreakdown() {
  return (
    <section className="space-y-8">
      <SectionHeading
        title="Master Forex from Beginner to Pro"
        subtitle="Structured curriculum. Practical lessons. Real profits."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => (
          <GlassCard key={c.title} className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-2xl">{c.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-semibold">{c.title}</h4>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">{c.badge}</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{c.desc}</p>
                <button className="mt-4 text-sm text-[#C9A646] hover:text-[#F4D03F]">View Curriculum →</button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
        <h3 className="text-2xl font-bold">Ready to start your journey?</h3>
        <p className="mx-auto mt-2 max-w-2xl text-white/70">Enroll once. Learn forever. All courses, live sessions, and private community included.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button>Explore All Courses</Button>
          <Button variant="glass">Join the Academy</Button>
        </div>
      </div>
    </section>
  );
}



