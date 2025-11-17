"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import VideoBackground from "@/components/shared/VideoBackground";
import RevealAnimation from "@/components/shared/RevealAnimation";
import GlassCard from "@/components/shared/GlassCard";
import IconBox from "@/components/shared/IconBox";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import placeholder from "@/utils/placeholders";
import { Calendar, FileText, ShoppingCart, Package, Video as VideoIcon, TrendingUp, BarChart3 } from "lucide-react";
import { useEnrollModal } from "@/components/shared/EnrollModalProvider";
import Link from "next/link";
import Image from "next/image";

export default function DropShip() {
  const { openModal } = useEnrollModal();
  
  return (
    <>
      {/* Hero - Full Width */}
      <div className="relative -mx-4 w-[calc(100%+2rem)] md:left-1/2 md:-translate-x-1/2 md:w-screen">
        <VideoBackground className="bg-black bg-opacity-100" src="/media/dropship.mp4" poster={placeholder("hero")}> 
        <div className="flex h-full items-center max-w-6xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl w-full">
            <RevealAnimation delay={0.08}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">Start. Scale. Succeed. The Smart Way to Build a Dropshipping Business</h1>
            </RevealAnimation>
            <RevealAnimation delay={0.16}>
              <p className="mt-4 sm:mt-6 text-white/80 text-base sm:text-lg leading-relaxed">Get access to live sessions, expert mentorship, and proven dropshipping strategies — all in one community.</p>
            </RevealAnimation>
            <RevealAnimation delay={0.24}>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Button onClick={() => openModal("Join Free Batch")} className="w-full sm:w-auto text-base sm:text-lg px-6 py-3 sm:py-4">Join Free Batch →</Button>
                <Link href="/results" className="w-full sm:w-auto block">
                  <Button variant="glass" className="w-full sm:w-auto text-base sm:text-lg px-6 py-3 sm:py-4">Watch How It Works →</Button>
                </Link>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.32}>
              <div className="mt-6 sm:mt-8 space-y-2 text-xs sm:text-sm text-white/70">
                <div>Trusted by 5,000+ entrepreneurs across 20+ countries 🌍</div>
                <div>Join thousands of dropshippers building successful online stores</div>
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
            overline="About Dropshipping"
            title="What is Dropshipping?"
            subtitle="Dropshipping isn't just a business model — it's a global movement of entrepreneurs building profitable online stores without inventory."
            align="left"
          />
        </RevealAnimation>
        <RevealAnimation delay={0.1}>
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
            <Image
              src="/media/Home_about_img.jpg"
              alt="Dropshipping - About"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
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
                <p className="mt-2 text-white/70">To simplify e-commerce and make online business success accessible to everyone.</p>
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
                <p className="mt-2 text-white/70">To build the world&apos;s most trusted dropshipping education ecosystem.</p>
              </div>
            </div>
          </GlassCard>
        </RevealAnimation>
      </section>

      {/* Pre-Why CTA */}
      <RevealAnimation>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to start your dropshipping journey?</h3>
          <p className="text-white/70 max-w-2xl">Learn from industry experts, join live sessions, and build a successful online store with our proven strategies.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => openModal("Join Dropshipping Program")}>Start Your Store Now →</Button>
            <Link href="/courses">
              <Button variant="glass">Explore Programs</Button>
            </Link>
          </div>
        </div>
      </RevealAnimation>

      {/* Why WiFi Money */}
      <section className="space-y-8">
        <SectionHeading
          title="Why Entrepreneurs Choose Our Program"
          subtitle="The competitive edge that sets us apart"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {[
            { icon: "💡", title: "Industry Experts", desc: "Learn from successful dropshippers, not theorists" },
            { icon: "📦", title: "Product Research", desc: "Find winning products that actually sell" },
            { icon: "💬", title: "24/7 Support", desc: "Get answers when it matters most" },
            { icon: "🔒", title: "Lifetime Access", desc: "Once you join, you're family" },
            { icon: "🎯", title: "Proven Results", desc: "70%+ students build profitable stores" },
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
          <p className="mt-2 text-sm text-white/60">Students build profitable stores</p>
        </div>
      </section>


      {/* Rewards / IB Program Section */}
      <section className="relative">
        <RevealAnimation>
          <div className="relative overflow-hidden rounded-3xl border border-[#C9A646]/30 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-block text-5xl mb-2">💰</div>
              <h2 className="text-3xl md:text-5xl font-extrabold gradient-text-gold">Earn While You Learn</h2>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Join our affiliate program and earn rewards like <span className="text-[#C9A646] font-semibold">iPads, gadgets, or Dubai tours</span> based on your store success and referrals.
              </p>
              <div className="pt-2">
                <Button className="text-lg px-8 py-4" onClick={() => openModal("Apply for Affiliate Program")}>Apply Now →</Button>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </section>

      {/* Upcoming Live Sessions */}
      <section className="space-y-8">
        <SectionHeading
          title="Upcoming Live Sessions"
          subtitle="Join our weekly live dropshipping sessions and learn from experts"
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
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">Product Research & Store Setup</h3>
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
                <Button className="text-lg px-8 py-4" onClick={() => openModal("Register for Live Session")}>Register Free →</Button>
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
                    <h3 className="text-lg font-bold mb-1">Free Dropshipping PDF Guide</h3>
                    <p className="text-xs text-white/60">Beginner to Advanced</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-6 flex-1">
                  Comprehensive guide covering everything from store setup to scaling your dropshipping business.
                </p>
                <Link href="/contact" className="block">
                  <Button variant="outline" className="w-full mt-auto group-hover:bg-[#C9A646] group-hover:text-black group-hover:border-[#C9A646] transition-all">
                    Download PDF →
                  </Button>
                </Link>
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
                    <h3 className="text-lg font-bold mb-1">Daily Product Ideas</h3>
                    <p className="text-xs text-white/60">On Telegram</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-6 flex-1">
                  Get daily product recommendations, winning niches, and store optimization tips delivered directly to your Telegram.
                </p>
                <a href="https://t.me/wifimoneyai" target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full mt-auto group-hover:bg-[#C9A646] group-hover:text-black group-hover:border-[#C9A646] transition-all">
                    Join Telegram →
                  </Button>
                </a>
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
                    <h3 className="text-lg font-bold mb-1">Shopify Store Setup</h3>
                    <p className="text-xs text-white/60">Step-by-step guide</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-6 flex-1">
                  Learn how to set up your Shopify store from scratch with our detailed video tutorial.
                </p>
                <Link href="/courses" className="block">
                  <Button variant="outline" className="w-full mt-auto group-hover:bg-[#C9A646] group-hover:text-black group-hover:border-[#C9A646] transition-all">
                    Watch Tutorial →
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </RevealAnimation>
        </div>
      </section>

      </div>
    </>
  );
}

