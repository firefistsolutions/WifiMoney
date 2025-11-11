"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  faqs: FAQItem[];
};

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <GlassCard
          key={index}
          className="overflow-hidden hover:border-[#C9A646]/40 transition-all duration-300"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between gap-4 p-6 text-left"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold text-white pr-8">{faq.question}</h3>
            <ChevronDown
              className={`flex-shrink-0 text-[#C9A646] transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              size={24}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-6">
              <p className="text-white/70 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

