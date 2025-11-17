"use client";

import React from "react";
import RevealAnimation from "@/components/shared/RevealAnimation";
import GlassCard from "@/components/shared/GlassCard";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="space-y-12 md:space-y-16 py-8 md:py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-12 md:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0072FF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 text-center space-y-4">
          <RevealAnimation>
            <div className="flex items-center justify-center mb-4">
              <Shield className="text-[#C9A646]" size={48} />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold gradient-text-gold">
              Privacy Policy
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="p-8 md:p-12">
          <div className="prose prose-invert max-w-none space-y-8">
            <div className="text-sm text-white/60 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <RevealAnimation>
              <div className="space-y-6">
                <p className="text-white/90 leading-relaxed">
                  This Privacy Policy explains how WiFi-Money ("we", "us", or "our") collects, uses, shares, and protects your information when you access WiFi-Money — including our website, mobile applications, trading programs, webinars, mentorship, and all other services (collectively, the "Platform").
                </p>
                <p className="text-white/90 leading-relaxed">
                  By using our Platform, you agree to the practices described in this policy.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">1. Information We Collect</h2>
                <p className="text-white/90 leading-relaxed">We may collect the following types of data:</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">a) Personal Information</h3>
                    <ul className="list-disc list-inside space-y-1 text-white/80 ml-4">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Address (if required for billing/shipping)</li>
                      <li>Date of birth (for age validation)</li>
                      <li>PAN or other ID (only when required for financial services compliance)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">b) Usage Data</h3>
                    <ul className="list-disc list-inside space-y-1 text-white/80 ml-4">
                      <li>Pages visited</li>
                      <li>Time spent on Platform</li>
                      <li>Clicks, scrolls, and interaction behavior</li>
                      <li>IP address and device info</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">c) Communication Data</h3>
                    <p className="text-white/80">Your messages or interactions with us via WhatsApp, email, Discord, and other supported platforms</p>
                  </div>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="text-white/90 leading-relaxed">We use your data to:</p>
                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                  <li>Deliver our services (courses, webinars, community access, etc.)</li>
                  <li>Respond to queries and provide support</li>
                  <li>Send communications (updates, alerts, offers) via Email, SMS, WhatsApp, and push notifications</li>
                  <li>Improve our content, tools, and platform usability</li>
                  <li>Comply with legal obligations (e.g., KYC for financial services)</li>
                </ul>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">3. Communication Consent</h2>
                <p className="text-white/90 leading-relaxed">
                  By registering with us, you agree to receive communications through:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                  <li>Email</li>
                  <li>SMS</li>
                  <li>WhatsApp</li>
                  <li>Phone calls</li>
                  <li>In-app & push notifications</li>
                </ul>
                <p className="text-white/90 leading-relaxed">
                  These may include transaction confirmations, educational content, service updates, marketing offers, and more. You can opt out of promotional messages anytime using the unsubscribe link or by messaging us directly.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.4}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">4. Data Sharing</h2>
                <p className="text-white/90 leading-relaxed">
                  We do not sell your personal data. We may share it with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                  <li>Trusted third-party service providers (email tools, payment processors, analytics tools)</li>
                  <li>Legal authorities if required by law</li>
                  <li>Financial product partners (only with your explicit consent)</li>
                </ul>
                <p className="text-white/90 leading-relaxed">
                  All third-party tools are vetted for compliance and data protection standards.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.5}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">5. Data Security</h2>
                <p className="text-white/90 leading-relaxed">
                  We implement security measures to protect your information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                  <li>SSL encryption</li>
                  <li>Access restrictions</li>
                  <li>Regular audits</li>
                </ul>
                <p className="text-white/90 leading-relaxed">
                  However, no system is 100% secure. You acknowledge and accept this risk when using the Platform.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.6}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">6. Cookies & Tracking</h2>
                <p className="text-white/90 leading-relaxed">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                  <li>Analyze website usage</li>
                  <li>Personalize content and ads</li>
                  <li>Remember your preferences</li>
                </ul>
                <p className="text-white/90 leading-relaxed">
                  You can disable cookies in your browser, but it may impact some features.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.7}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">7. Data Retention</h2>
                <p className="text-white/90 leading-relaxed">
                  We retain your data for as long as your account is active or as needed to comply with our legal, regulatory, and operational obligations.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.8}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">8. Your Rights</h2>
                <p className="text-white/90 leading-relaxed">You may:</p>
                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                  <li>Request access to your data</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Lodge a complaint with a data protection authority</li>
                </ul>
                <p className="text-white/90 leading-relaxed">
                  For any of the above, contact us at <a href="mailto:support@wifi-money.com" className="text-[#C9A646] hover:underline">support@wifi-money.com</a>
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.9}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">9. Children's Privacy</h2>
                <p className="text-white/90 leading-relaxed">
                  Our Platform is not intended for children under the age of 18. We do not knowingly collect data from minors.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1.0}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">10. Changes to This Policy</h2>
                <p className="text-white/90 leading-relaxed">
                  We may update this Privacy Policy at any time. Continued use of the Platform after updates implies acceptance.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1.1}>
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-[#C9A646] mb-4">Contact Us</h3>
                <p className="text-white/90 leading-relaxed">
                  If you have any questions about this Privacy Policy, please reach out to us at{" "}
                  <a href="mailto:support@wifi-money.com" className="text-[#C9A646] hover:underline">support@wifi-money.com</a>
                </p>
              </div>
            </RevealAnimation>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

