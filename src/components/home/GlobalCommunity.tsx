"use client";

import React from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import RevealAnimation from '@/components/shared/RevealAnimation';
import GlassCard from '@/components/shared/GlassCard';
import Button from '@/components/shared/Button';
import { MapPin, Users, DollarSign, GraduationCap, Video, Wrench, MessageCircle } from 'lucide-react';
import { useEnrollModal } from '@/components/shared/EnrollModalProvider';

const stats = [
  { icon: MapPin, value: '20+', label: 'Countries' },
  { icon: Users, value: '10,000+', label: 'Traders' },
  { icon: DollarSign, value: '$5M+', label: 'Profits Generated' },
  { icon: GraduationCap, value: '70%', label: 'Success Rate' },
];

const communityFeatures = [
  {
    icon: Video,
    title: 'Live Mentorship',
    description: 'Join weekly Zooms & Telegram Q&A',
  },
  {
    icon: Wrench,
    title: 'Trading Tools Access',
    description: 'Smart indicators & resources',
  },
  {
    icon: MessageCircle,
    title: 'Private Discussion Rooms',
    description: 'Get feedback on your setups',
  },
];

export default function GlobalCommunity() {
  const { openModal } = useEnrollModal();
  
  return (
    <>
      {/* Community & Mentorship Section */}
      <section className="space-y-8 py-12">
        <SectionHeading
          title="Not Just a Course — A Family of Traders"
          subtitle="Join a supportive community of traders learning and growing together"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityFeatures.map((feature, index) => (
            <RevealAnimation key={feature.title} delay={index * 0.1}>
              <GlassCard className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center">
                  <feature.icon className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </GlassCard>
            </RevealAnimation>
          ))}
        </div>

        <div className="text-center pt-4">
          <Button onClick={() => openModal("Join Our Telegram Community")}>Join Our Telegram Community →</Button>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="space-y-8 py-12">
        <SectionHeading
          title="Global Presence. Local Impact."
          subtitle="WiFi Money has trained traders across 20+ countries — connecting thousands of ambitious learners through mentorship, technology, and results."
        />

        {/* Map */}
        <RevealAnimation>
          <div className="relative max-w-4xl mx-auto mb-8 rounded-3xl overflow-hidden">
            <img
              src="/media/gloabal_dots.png"
              alt="Global Community Map with Dots showing WiFi Money presence across 20+ countries including India, Dubai, Kenya, and more"
              className="w-full h-auto object-cover"
            />
          </div>
        </RevealAnimation>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-white/80 text-lg leading-relaxed">
            WiFi Money is empowering traders across Asia, the Middle East, and Africa through practical education and transparent mentorship.
          </p>

          <Button onClick={() => openModal("Join Our Global Network")}>Become Part of Our Global Network →</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto pt-8">
          {stats.map((stat, index) => (
            <RevealAnimation key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center">
                  <stat.icon className="text-black" size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold gradient-text-gold mb-2">
                  {stat.value}
                </div>
                <p className="text-white/70 font-semibold">{stat.label}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </section>
    </>
  );
}
