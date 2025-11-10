"use client";

import React, { useState } from "react";
import FormField from "./FormField";
import Button from "@/components/shared/Button";
import GlassCard from "@/components/shared/GlassCard";
import { Lock } from "lucide-react";

type FormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  interest: string;
  message: string;
};

type FormErrors = {
  fullName?: string;
  email?: string;
  whatsapp?: string;
  interest?: string;
};

type ContactFormProps = {
  hideHeading?: boolean;
};

export default function ContactForm({ hideHeading = false }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    interest: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!validatePhone(formData.whatsapp)) {
      newErrors.whatsapp = "Please enter a valid phone number";
    }

    if (!formData.interest) {
      newErrors.interest = "Please select an option";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      validateEmail(formData.email) &&
      formData.whatsapp.trim() &&
      validatePhone(formData.whatsapp) &&
      formData.interest
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you! We'll get back to you soon.");
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        interest: "",
        message: "",
      });
    }, 1000);
  };

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <GlassCard className="p-8">
      {!hideHeading && (
        <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          type="text"
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          required
          value={formData.fullName}
          onChange={(value) => updateField("fullName", value)}
          error={errors.fullName}
        />

        <FormField
          type="email"
          name="email"
          label="Email Address"
          placeholder="your.email@example.com"
          required
          value={formData.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
        />

        <FormField
          type="tel"
          name="whatsapp"
          label="WhatsApp Number"
          placeholder="+91 12345 67890"
          required
          value={formData.whatsapp}
          onChange={(value) => updateField("whatsapp", value)}
          error={errors.whatsapp}
        />

        <FormField
          type="select"
          name="interest"
          label="I'm interested in"
          placeholder="Select an option"
          required
          value={formData.interest}
          onChange={(value) => updateField("interest", value)}
          error={errors.interest}
          options={[
            { value: "courses", label: "Courses" },
            { value: "mentorship", label: "Mentorship" },
            { value: "partnership", label: "Partnership" },
            { value: "browsing", label: "Just Browsing" },
          ]}
        />

        <FormField
          type="textarea"
          name="message"
          label="Message (Optional)"
          placeholder="Tell us more about your requirements..."
          value={formData.message}
          onChange={(value) => updateField("message", value)}
        />

        <Button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit & Join Now →"}
        </Button>

        <div className="flex items-center gap-2 text-sm text-white/60 justify-center pt-2">
          <Lock size={14} />
          <span>Your information is secure & private</span>
        </div>
      </form>
    </GlassCard>
  );
}

