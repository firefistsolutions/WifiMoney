import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import VideoBackground from "@/components/shared/VideoBackground";
import RevealAnimation from "@/components/shared/RevealAnimation";
import GlassCard from "@/components/shared/GlassCard";
import IconBox from "@/components/shared/IconBox";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import placeholder from "@/utils/placeholders";
import CourseBreakdown from "@/components/home/CourseBreakdown";
import Testimonials from "@/components/home/Testimonials";
import JoinMovement from "@/components/home/JoinMovement";
import GlobalCommunity from "@/components/home/GlobalCommunity";

export default function Home() {
  return (
    <>
      {/* Hero - Full Width */}
      <div className="relative -mx-4 w-[calc(100%+2rem)] md:left-1/2 md:-translate-x-1/2 md:w-screen">
        <VideoBackground className="bg-black bg-opacity-50" src="/media/hero_bg.mp4" poster={placeholder("hero")}> 
        <div className="flex h-full items-center max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <RevealAnimation>
              <div className="mb-3 text-sm tracking-wide text-[#C9A646]">🌟 Trusted by 10,000+ Global Traders</div>
            </RevealAnimation>
            <RevealAnimation delay={0.08}>
              <h1 className="text-4xl md:text-6xl font-extrabold">Learn. Trade. Earn. — The WiFi Way.</h1>
            </RevealAnimation>
            <RevealAnimation delay={0.16}>
              <p className="mt-4 text-white/80 text-lg">Join the world&apos;s most trusted Forex education ecosystem where knowledge transforms into wealth.</p>
            </RevealAnimation>
            <RevealAnimation delay={0.24}>
              <div className="mt-6 flex items-center gap-4">
                <Button>Start Learning Now →</Button>
                <Button variant="glass">Watch Success Stories ▶</Button>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </VideoBackground>
      </div>

      {/* Rest of Content */}
      <div className="space-y-16">
      {/* Who We Are */}
      <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <RevealAnimation>
          <SectionHeading
            overline="About WiFi Money"
            title="What is WiFi Money?"
            subtitle="WiFi Money isn't just a forex academy — it's a global movement of traders mastering financial freedom."
            align="left"
          />
        </RevealAnimation>
        <RevealAnimation delay={0.1}>
          <GlassCard className="aspect-4/3 p-0 overflow-hidden">
            <img
              src={placeholder("founder", 0, "auto=format&fit=crop&w=1200&q=80")}
              alt="Founder portrait"
              className="h-full w-full object-cover"
            />
          </GlassCard>
        </RevealAnimation>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RevealAnimation>
          <GlassCard className="p-8">
            <div className="flex items-start gap-4">
              <IconBox>🎯</IconBox>
              <div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="mt-2 text-white/70">To simplify Forex trading and make financial freedom accessible to everyone.</p>
              </div>
            </div>
          </GlassCard>
        </RevealAnimation>
        <RevealAnimation delay={0.1}>
          <GlassCard className="p-8">
            <div className="flex items-start gap-4">
              <IconBox>🌍</IconBox>
              <div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="mt-2 text-white/70">To build the world&apos;s most trusted trading education ecosystem.</p>
              </div>
            </div>
          </GlassCard>
        </RevealAnimation>
      </section>

      {/* Pre-Why CTA */}
      <RevealAnimation>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to start your journey?</h3>
          <p className="text-white/70 max-w-2xl">Learn from industry experts, join live sessions, and become a consistent trader with WiFi Money.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button>Join WiFi Money Now →</Button>
            <Button variant="glass">Explore Courses</Button>
          </div>
        </div>
      </RevealAnimation>

      {/* Why WiFi Money */}
      <section className="space-y-8">
        <SectionHeading
          title="Why Traders Choose WiFi Money"
          subtitle="The competitive edge that sets us apart"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {[
            { icon: "💡", title: "Industry Experts", desc: "Learn from real traders, not theorists" },
            { icon: "📈", title: "Real-Time Mentorship", desc: "Trade live with professionals" },
            { icon: "💬", title: "24/7 Support", desc: "Get answers when it matters most" },
            { icon: "🔒", title: "Lifetime Access", desc: "Once you join, you're family" },
            { icon: "🎯", title: "Proven Results", desc: "70%+ students achieve profit consistency" },
          ].map((f) => (
            <RevealAnimation key={f.title}>
              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <IconBox>{f.icon}</IconBox>
                  <div>
                    <h4 className="text-lg font-semibold">{f.title}</h4>
                    <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </RevealAnimation>
          ))}
        </div>
        <div className="text-center">
          <AnimatedCounter target={70} suffix="%" className="text-5xl font-black gradient-text-gold" />
          <p className="mt-2 text-sm text-white/60">Students achieve profit consistency</p>
        </div>
      </section>

      {/* Course Breakdown */}
      <CourseBreakdown />

      {/* Testimonials */}
      <Testimonials />

      {/* Join the Movement */}
      <JoinMovement />

      {/* Global Community */}
      <GlobalCommunity />

      </div>
    </>
  );
}
