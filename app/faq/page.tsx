"use client";

import React from "react";
import RevealAnimation from "@/components/shared/RevealAnimation";
import SectionHeading from "@/components/shared/SectionHeading";
import FAQAccordion from "@/components/faq/FAQAccordion";

const FAQs = [
  {
    question: "What's included in the enrollment?",
    answer: "You get lifetime access to all courses, weekly live sessions, private community access, trading signals, and personal mentor support. Our comprehensive 3-week program covers everything from forex basics to advanced trading strategies.",
  },
  {
    question: "Is this suitable for complete beginners?",
    answer: "Absolutely! Our curriculum starts from the basics and progresses to advanced strategies. Perfect for beginners and experienced traders alike. We cover everything from forex terminology to complex trading setups.",
  },
  {
    question: "What's the refund policy?",
    answer: "We offer a 7-day money-back guarantee. If you're not satisfied with the course content, we'll refund your payment in full. No questions asked.",
  },
  {
    question: "How long does the course take?",
    answer: "The program is structured as a 3-week intensive course with daily sessions. However, you have lifetime access to review the content anytime at your own pace. Most students complete the core curriculum in 3-4 weeks.",
  },
  {
    question: "Do I need prior trading experience?",
    answer: "No experience needed. We start from the fundamentals and guide you through every step of your trading journey. Our curriculum is designed to take you from zero to confident trader.",
  },
  {
    question: "What trading platform do you use?",
    answer: "We primarily use MT5 (MetaTrader 5) for our trading operations. The course includes comprehensive MT5 setup tutorials and operations training to ensure you're comfortable with the platform.",
  },
  {
    question: "Are the live sessions recorded?",
    answer: "Yes, all live sessions are recorded and made available to enrolled students. You can access them anytime through your student dashboard for lifetime review.",
  },
  {
    question: "What support is available after enrollment?",
    answer: "You'll have access to our private Telegram community where you can ask questions, share trades, and get support from mentors and fellow traders. We also provide personal mentor support for enrolled students.",
  },
  {
    question: "Can I access the course on mobile?",
    answer: "Yes! Our platform is fully responsive and works on all devices including mobile phones and tablets. You can learn and access all course materials from anywhere.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and secure payment gateways. All transactions are encrypted and secure. We also offer payment plans for select packages.",
  },
  {
    question: "How do I join the Telegram community?",
    answer: "After enrollment, you'll receive an invitation link to join our private Telegram community. The link is also available in your student dashboard. Join us at https://t.me/wifimoneyai",
  },
  {
    question: "What makes WiFi Money different from other forex courses?",
    answer: "WiFi Money focuses on practical, real-world trading strategies with live sessions, real trading results, and a supportive community. We emphasize hands-on learning with actual market analysis and trade setups, not just theory.",
  },
];

export default function FAQPage() {
  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-12 md:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0072FF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 text-center space-y-4">
          <RevealAnimation>
            <h1 className="text-4xl md:text-6xl font-extrabold gradient-text-gold">
              Frequently Asked Questions
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Find answers to common questions about our courses, enrollment, and trading education
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto">
        <RevealAnimation>
          <SectionHeading
            overline="Got Questions?"
            title="Everything You Need to Know"
            subtitle="We've compiled answers to the most frequently asked questions to help you make an informed decision."
            align="center"
          />
        </RevealAnimation>

        <div className="mt-12">
          <FAQAccordion faqs={FAQs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto">
        <RevealAnimation>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-12 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text-gold">
                Still Have Questions?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Our team is here to help you make the right decision. Reach out to us through our contact page or join our Telegram community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C9A646] to-[#F4D03F] text-black font-semibold hover:shadow-[0_0_30px_rgba(201,166,70,0.5)] transition-all hover:scale-105"
                >
                  Contact Us →
                </a>
                <a
                  href="https://t.me/wifimoneyai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105"
                >
                  Join Telegram →
                </a>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </section>
    </div>
  );
}

