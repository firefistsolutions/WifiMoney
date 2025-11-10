"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare } from "lucide-react";

type FormFieldProps = {
  type?: "text" | "email" | "tel" | "textarea" | "select";
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options?: { value: string; label: string }[];
};

const iconMap = {
  text: User,
  email: Mail,
  tel: Phone,
  textarea: MessageSquare,
  select: MessageSquare,
};

export default function FormField({
  type = "text",
  name,
  label,
  placeholder,
  required = false,
  value,
  onChange,
  error,
  options,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const Icon = iconMap[type] || User;
  const hasValue = value.length > 0;
  // For select fields, always show label floated since there's always a visible option
  const shouldFloatLabel = type === "select" ? true : isFocused || hasValue;

  return (
    <div className="relative">
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            rows={4}
            className={`w-full px-4 pt-6 pb-2 bg-white/5 border rounded-xl backdrop-blur-xl transition-all duration-300 resize-none ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : isFocused || hasValue
                ? "border-[#C9A646] focus:border-[#F4D03F] focus:shadow-[0_0_20px_rgba(201,166,70,0.3)]"
                : "border-white/10 focus:border-[#C9A646]"
            } text-white placeholder-transparent focus:outline-none`}
          />
        ) : type === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className={`w-full px-4 pt-6 pb-2 bg-white/5 border rounded-xl backdrop-blur-xl transition-all duration-300 appearance-none ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : isFocused || hasValue
                ? "border-[#C9A646] focus:border-[#F4D03F] focus:shadow-[0_0_20px_rgba(201,166,70,0.3)]"
                : "border-white/10 focus:border-[#C9A646]"
            } text-white focus:outline-none ${!hasValue ? "text-white/40" : ""}`}
          >
            <option value="" disabled className="bg-black text-white">
              {placeholder}
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value} className="bg-black text-white">
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            className={`w-full px-4 pt-6 pb-2 bg-white/5 border rounded-xl backdrop-blur-xl transition-all duration-300 ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : isFocused || hasValue
                ? "border-[#C9A646] focus:border-[#F4D03F] focus:shadow-[0_0_20px_rgba(201,166,70,0.3)]"
                : "border-white/10 focus:border-[#C9A646]"
            } text-white placeholder-transparent focus:outline-none`}
          />
        )}

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            shouldFloatLabel
              ? "top-2 text-xs text-[#C9A646]"
              : "top-4 text-base text-white/60"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
          <Icon size={20} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

