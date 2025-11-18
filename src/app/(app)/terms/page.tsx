"use client";

import React from "react";
import RevealAnimation from "@/components/shared/RevealAnimation";
import GlassCard from "@/components/shared/GlassCard";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="space-y-12 md:space-y-16 py-8 md:py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-12 md:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0072FF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 text-center space-y-4">
          <RevealAnimation>
            <div className="flex items-center justify-center mb-4">
              <FileText className="text-[#C9A646]" size={48} />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold gradient-text-gold">
              Terms & Conditions
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Please read these terms carefully before using our platform. By using WiFi-Money, you agree to these terms.
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* Terms Content */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="p-8 md:p-12">
          <div className="prose prose-invert max-w-none space-y-8">
            <div className="text-sm text-white/60 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <RevealAnimation>
              <div className="space-y-6">
                <p className="text-white/90 leading-relaxed">
                  Welcome to WiFi-Money, a platform owned and operated by <strong>WiFi-Money</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms & Conditions (&quot;Terms&quot;) govern your access and use of our services, including our website, applications, Discord community, trading programs, mentorship sessions, and any other features provided under the WiFi-Money brand (collectively referred to as the &quot;Platform&quot;).
                </p>
                <p className="text-white/90 leading-relaxed">
                  By accessing or using any part of the Platform, you agree to be bound by these Terms. If you do not agree, please do not use our Platform.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">1. Eligibility</h2>
                <p className="text-white/90 leading-relaxed">
                  You must be at least 18 years of age or the age of majority in your jurisdiction to use our services. By using the Platform, you represent and warrant that you meet this requirement.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">2. Services Offered</h2>
                <p className="text-white/90 leading-relaxed">
                  WiFi-Money provides financial education, trading mentorship, algorithmic trading tools, community-driven discussions, and access to financial product partnerships. We do not offer investment advice or guarantee any returns.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">3. User Responsibilities</h2>
                <p className="text-white/90 leading-relaxed">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                  <li>Use the platform for any unlawful purpose</li>
                  <li>Share access credentials with others</li>
                  <li>Post harmful, misleading, or disrespectful content</li>
                  <li>Misrepresent yourself or claim false credentials</li>
                </ul>
                <p className="text-white/90 leading-relaxed">
                  Violation may lead to suspension or permanent ban from the platform.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.4}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">4. Communications Consent</h2>
                <p className="text-white/90 leading-relaxed">
                  By registering on the Platform, you consent to receive communications from WiFi-Money via multiple channels, including but not limited to SMS, email, WhatsApp, push notifications, and in-app messages. These messages may include updates, promotions, offers, account-related information, and other service-related communications.
                </p>
                <p className="text-white/90 leading-relaxed">
                  You may opt out of promotional communications at any time by following the unsubscribe instructions provided in such messages.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.5}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">5. Payments & Refunds</h2>
                <p className="text-white/90 leading-relaxed">
                  All payments made for courses, mentorships, or subscriptions are non-refundable unless explicitly mentioned. You agree to the pricing terms shared at the point of purchase.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.6}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">6. Intellectual Property</h2>
                <p className="text-white/90 leading-relaxed">
                  All content, including logos, videos, tools, and documentation, is owned by <strong>WiFi-Money</strong>. You may not reuse, distribute, or replicate any material without prior written permission.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.7}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">7. Risk Disclaimer</h2>
                <p className="text-white/90 leading-relaxed">
                  Trading and investing involve significant financial risk. All users are responsible for their own financial decisions. WiFi-Money is an educational platform and not a registered investment advisor. Please consult your financial advisor before making investment decisions.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.8}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">8. Community Conduct</h2>
                <p className="text-white/90 leading-relaxed">
                  Participation in our Discord and other community channels must follow respectful communication. No spamming, harassment, or unsolicited promotions are allowed. Violations will lead to removal without prior notice.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.9}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">9. Termination</h2>
                <p className="text-white/90 leading-relaxed">
                  We reserve the right to terminate or suspend your account at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users or the Platform.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1.0}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">10. Modifications</h2>
                <p className="text-white/90 leading-relaxed">
                  We may update these Terms at any time. Continued use of the Platform after changes implies your acceptance of the new Terms.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1.1}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">11. Limitation of Liability</h2>
                <p className="text-white/90 leading-relaxed">
                  To the maximum extent permitted by law, WiFi-Money and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                  <li>Your use or inability to use the Platform</li>
                  <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                  <li>Any bugs, viruses, or other harmful code that may be transmitted to or through our Platform</li>
                  <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Platform</li>
                </ul>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1.2}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#C9A646] mt-8 mb-4">12. Governing Law</h2>
                <p className="text-white/90 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of <strong>Dubai, UAE</strong>, without regard to its conflict of law provisions.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1.3}>
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-[#C9A646] mb-4">13. Contact Us</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  If you have any questions about these Terms & Conditions, please contact us at:
                </p>
                <div className="space-y-2 text-white/90">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:support@wifi-money.com" className="text-[#C9A646] hover:underline">support@wifi-money.com</a>
                  </p>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1.4}>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/90 leading-relaxed text-center italic">
                  By using WiFi-Money, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                </p>
              </div>
            </RevealAnimation>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

