"use client";

import React from "react";
import RevealAnimation from "@/components/shared/RevealAnimation";
import GlassCard from "@/components/shared/GlassCard";
import Button from "@/components/shared/Button";
import SectionHeading from "@/components/shared/SectionHeading";
import { Check, Shield, Clock, Award, Users, Zap } from "lucide-react";
import { useEnrollModal } from "@/components/shared/EnrollModalProvider";

export default function EnrollPage() {
  const { openModal } = useEnrollModal();

  const features = [
    { icon: Check, text: "Access to ALL 5 Courses" },
    { icon: Check, text: "Lifetime Learning Access" },
    { icon: Check, text: "Live Weekly Trading Classes" },
    { icon: Check, text: "Private Telegram Community" },
    { icon: Check, text: "Real-Time Trading Signals" },
    { icon: Check, text: "Personal Mentor Support" },
    { icon: Check, text: "Lifetime Content Updates" },
    { icon: Check, text: "Certificate of Completion" },
    { icon: Check, text: "Risk Management Tools" },
    { icon: Check, text: "Trading Journal Templates" },
  ];

  const trustBadges = [
    { icon: Users, label: "10,000+ Active Students", desc: "Join a thriving community" },
    { icon: Award, label: "4.9/5 Average Rating", desc: "Based on 2,500+ reviews" },
    { icon: Shield, label: "7-Day Money-Back", desc: "100% satisfaction guarantee" },
  ];

  const faqs = [
    {
      question: "What's included in the enrollment?",
      answer: "You get lifetime access to all 5 courses, weekly live sessions, private community access, trading signals, and personal mentor support.",
    },
    {
      question: "Is this suitable for complete beginners?",
      answer: "Absolutely! Our curriculum starts from the basics and progresses to advanced strategies. Perfect for beginners and experienced traders alike.",
    },
    {
      question: "What's the refund policy?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied, we'll refund your payment in full.",
    },
    {
      question: "How long does the course take?",
      answer: "You can go at your own pace. Most students complete the core curriculum in 8-12 weeks, but you have lifetime access to review anytime.",
    },
    {
      question: "Do I need prior trading experience?",
      answer: "No experience needed. We start from the fundamentals and guide you through every step of your trading journey.",
    },
  ];

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-8 md:p-12 lg:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0072FF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 text-center space-y-4">
          <RevealAnimation>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold gradient-text-gold">
              Your Journey to Financial Freedom Starts Today.
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Join 10,000+ traders taking control of their financial destiny.
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* Main Package Card */}
      <section className="max-w-4xl mx-auto">
        <RevealAnimation>
          <GlassCard className="p-6 md:p-8 lg:p-10 relative overflow-hidden">
            {/* Gold accent border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A646] via-[#F4D03F] to-[#C9A646]" />
            
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-[#C9A646]/20 text-[#C9A646] text-sm font-semibold mb-2">
                  MOST POPULAR
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold gradient-text-gold">
                  💎 WiFi Money Academy
                </h2>
              </div>

              {/* Pricing */}
              <div className="text-center space-y-2">
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-5xl md:text-6xl font-extrabold gradient-text-gold">$300</span>
                  <span className="text-xl md:text-2xl text-white/50 line-through">$500</span>
                </div>
                <p className="text-sm text-white/60">Limited time offer • 40% OFF</p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#C9A646] flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-white/90 text-sm md:text-base">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  onClick={() => openModal("Enroll in WiFi Money Academy")}
                  className="w-full text-lg py-6"
                >
                  Enroll Now & Start Learning →
                </Button>
              </div>

              {/* Payment Security */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-white/10 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  <span>SSL encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💳</span>
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </RevealAnimation>
      </section>

      {/* Trust Section */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustBadges.map((badge, index) => (
            <RevealAnimation key={index} delay={index * 0.1}>
              <GlassCard className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center">
                  <badge.icon className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{badge.label}</h3>
                <p className="text-white/70 text-sm">{badge.desc}</p>
              </GlassCard>
            </RevealAnimation>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before enrolling"
        />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <RevealAnimation key={index} delay={index * 0.05}>
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm md:text-base">{faq.answer}</p>
              </GlassCard>
            </RevealAnimation>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-8 md:p-12 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold">Still Have Questions?</h2>
          <p className="text-white/80 text-lg">
            Our team is here to help you make the right decision for your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => openModal("Enroll Now")} className="text-lg px-8 py-4">
              Enroll Now
            </Button>
            <Button variant="glass" onClick={() => openModal("Schedule a Call")} className="text-lg px-8 py-4">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

