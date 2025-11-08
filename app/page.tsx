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
import { Calendar, FileText, BarChart3, Video as VideoIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero - Full Width */}
      <div className="relative -mx-4 w-[calc(100%+2rem)] md:left-1/2 md:-translate-x-1/2 md:w-screen">
        <VideoBackground className="bg-black bg-opacity-50" src="/media/hero_bg.mp4" poster={placeholder("hero")}> 
        <div className="flex h-full items-center max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <RevealAnimation delay={0.08}>
              <h1 className="text-4xl md:text-6xl font-extrabold">Learn. Trade. Earn.  The Smart Way to Build a Trading Career</h1>
            </RevealAnimation>
            <RevealAnimation delay={0.16}>
              <p className="mt-4 text-white/80 text-lg">Get access to live sessions, expert mentorship, and real trading results — all in one community.</p>
            </RevealAnimation>
            <RevealAnimation delay={0.24}>
              <div className="mt-6 flex items-center gap-4">
                <Button>Join Free Batch →</Button>
                <Button variant="glass">Watch How It Works →</Button>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.32}>
              <div className="mt-6 space-y-2 text-sm text-white/70">
                <div>Trusted by 5,000+ learners across 20+ countries 🌍</div>
                <div>Average student ROI: 8–12% monthly (educational purpose only)</div>
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

      {/* Rewards / IB Program Section */}
      <section className="relative">
        <RevealAnimation>
          <div className="relative overflow-hidden rounded-3xl border border-[#C9A646]/30 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-block text-5xl mb-2">💰</div>
              <h2 className="text-3xl md:text-5xl font-extrabold gradient-text-gold">Earn While You Learn</h2>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Join our IB program and earn rewards like <span className="text-[#C9A646] font-semibold">iPads, gadgets, or Dubai tours</span> based on your trading activity and referrals.
              </p>
              <div className="pt-2">
                <Button className="text-lg px-8 py-4">Apply Now →</Button>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </section>

      {/* Upcoming Live Sessions */}
      <section className="space-y-8">
        <SectionHeading
          title="Upcoming Live Sessions"
          subtitle="Join our weekly live trading sessions and learn from experts"
        />
        <RevealAnimation>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] p-8 md:p-10 backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9A646] via-[#F4D03F] to-[#C9A646]" />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#C9A646]/20 text-[#C9A646] text-sm font-semibold mb-3">
                    Next Session
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">Liquidity & Smart Money</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A646]/20 flex items-center justify-center">
                      <Calendar size={20} className="text-[#C9A646]" />
                    </div>
                    <div>
                      <div className="text-xs text-white/60">Date & Time</div>
                      <div className="font-semibold">9th Nov, 7:00 PM (IST)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A646]/20 flex items-center justify-center">
                      <VideoIcon size={20} className="text-[#C9A646]" />
                    </div>
                    <div>
                      <div className="text-xs text-white/60">Platform</div>
                      <div className="font-semibold">Zoom</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:ml-6">
                <Button className="text-lg px-8 py-4">Register Free →</Button>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </section>

      {/* Free Resources Section */}
      <section className="space-y-8">
        <SectionHeading
          title="Free Resources"
          subtitle="Get started with our free educational materials"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RevealAnimation>
            <GlassCard className="p-6 group hover:border-[#C9A646]/40 hover:shadow-[0_0_30px_rgba(201,166,70,0.2)] transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="text-black" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">Free Forex PDF Guide</h3>
                    <p className="text-xs text-white/60">Beginner to Advanced</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-6 flex-1">
                  Comprehensive guide covering everything from basics to advanced trading strategies.
                </p>
                <Button variant="outline" className="w-full mt-auto group-hover:bg-[#C9A646] group-hover:text-black group-hover:border-[#C9A646] transition-all">
                  Download PDF →
                </Button>
              </div>
            </GlassCard>
          </RevealAnimation>

          <RevealAnimation delay={0.1}>
            <GlassCard className="p-6 group hover:border-[#C9A646]/40 hover:shadow-[0_0_30px_rgba(201,166,70,0.2)] transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <BarChart3 className="text-black" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">Daily Market Analysis</h3>
                    <p className="text-xs text-white/60">On Telegram</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-6 flex-1">
                  Get daily insights, trade setups, and market analysis delivered directly to your Telegram.
                </p>
                <Button variant="outline" className="w-full mt-auto group-hover:bg-[#C9A646] group-hover:text-black group-hover:border-[#C9A646] transition-all">
                  Join Telegram →
                </Button>
              </div>
            </GlassCard>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <GlassCard className="p-6 group hover:border-[#C9A646]/40 hover:shadow-[0_0_30px_rgba(201,166,70,0.2)] transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <VideoIcon className="text-black" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">MT5 Setup Tutorial</h3>
                    <p className="text-xs text-white/60">Step-by-step guide</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-6 flex-1">
                  Learn how to set up MetaTrader 5 platform with our detailed video tutorial.
                </p>
                <Button variant="outline" className="w-full mt-auto group-hover:bg-[#C9A646] group-hover:text-black group-hover:border-[#C9A646] transition-all">
                  Watch Tutorial →
                </Button>
              </div>
            </GlassCard>
          </RevealAnimation>
        </div>
      </section>

      </div>
    </>
  );
}
