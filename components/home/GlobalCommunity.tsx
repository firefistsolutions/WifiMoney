import React from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import RevealAnimation from '@/components/shared/RevealAnimation';
import { MapPin, Users, DollarSign, GraduationCap } from 'lucide-react';

const stats = [
  { icon: MapPin, value: '20+', label: 'Countries' },
  { icon: Users, value: '10,000+', label: 'Traders' },
  { icon: DollarSign, value: '$5M+', label: 'Profits Generated' },
  { icon: GraduationCap, value: '70%', label: 'Success Rate' },
];

export default function GlobalCommunity() {
  return (
    <section className="space-y-8">
      <SectionHeading
        title="Global Presence. Local Impact."
        subtitle="WiFi Money has trained traders across 20+ countries — connecting thousands of ambitious learners through mentorship, technology, and results."
      />

      {/* Map */}
      <RevealAnimation>
        <div className="relative max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden">
          <img
            src="/media/gloabal_dots.png"
            alt="Global Community Map with Dots showing WiFi Money presence across 20+ countries"
            className="w-full h-auto object-cover"
          />
        </div>
      </RevealAnimation>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
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
  );
}

