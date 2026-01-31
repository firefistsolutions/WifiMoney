"use client";

import React from "react";
import ContactHero from "@/components/contact/ContactHero";
import PayloadForm from "@/components/PayloadForm";
import SocialLinks from "@/components/contact/SocialLinks";

export default function ContactPage() {
  // Using Payload CMS Form ID: 2
  const PAYLOAD_FORM_ID = 2;

  return (
    <div className="space-y-12">
      <ContactHero />

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Side - Contact Form (40%) */}
        <div className="lg:col-span-2">
          <PayloadForm formId={PAYLOAD_FORM_ID} enableIntro={false} />
        </div>

        {/* Right Side - Social Links (60%) */}
        <div className="lg:col-span-3 space-y-8">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

