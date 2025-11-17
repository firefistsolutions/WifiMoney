"use client";

import React from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";
import MapSection from "@/components/contact/MapSection";

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <ContactHero />

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Side - Contact Form (40%) */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Right Side - Social Links & Map (60%) */}
        <div className="lg:col-span-3 space-y-8">
          <SocialLinks />
          <MapSection />
        </div>
      </div>
    </div>
  );
}

