'use client'

import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React, { useState } from 'react'
import { MessageSquare } from 'lucide-react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
    rows?: number
  } & TextField & {
    placeholder?: string
    defaultValue?: string
  }
> = ({ name, errors, label, register, required: requiredFromProps, rows = 4, width, placeholder, defaultValue }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState(defaultValue || '')
  const hasValue = value.length > 0
  const shouldFloatLabel = isFocused || hasValue
  const hasError = requiredFromProps && errors[name]

  return (
    <Width width={width}>
      <div className="relative mb-6">
        <div className="relative">
          <textarea
            id={name}
            rows={rows}
            className={`w-full px-4 pt-6 pb-2 bg-white/5 border rounded-xl backdrop-blur-xl transition-all duration-300 resize-none text-white placeholder-transparent focus:outline-none ${
              hasError
                ? 'border-red-500/50 focus:border-red-500 hover:border-red-500/50'
                : isFocused || hasValue
                ? 'border-[#C9A646] focus:border-[#F4D03F] focus:shadow-[0_0_20px_rgba(201,166,70,0.3)] hover:border-[#C9A646]'
                : 'border-white/10 focus:border-[#C9A646] hover:border-white/10'
            }`}
            placeholder={placeholder || label}
            {...register(name, { 
              required: requiredFromProps,
              onChange: (e) => setValue(e.target.value)
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          <label
            htmlFor={name}
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              shouldFloatLabel
                ? 'top-2 text-xs text-[#C9A646]'
                : 'top-4 text-base text-white/60'
            }`}
          >
            {label}
            {requiredFromProps && <span className="text-red-500 ml-1">*</span>}
          </label>

          <div className="absolute right-4 top-4 text-white/40">
            <MessageSquare size={20} />
          </div>
        </div>
        {hasError && (
          <p className="mt-2 text-sm text-red-400" role="alert">
            This field is required
          </p>
        )}
      </div>
    </Width>
  )
}
