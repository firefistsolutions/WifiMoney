'use client'

import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React, { useState } from 'react'
import { Mail } from 'lucide-react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & EmailField & {
    placeholder?: string
    defaultValue?: string
  }
> = ({ name, errors, label, register, required: requiredFromProps, width, placeholder, defaultValue }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState(defaultValue || '')
  const hasValue = value.length > 0
  const shouldFloatLabel = isFocused || hasValue
  const hasError = requiredFromProps && errors[name]

  return (
    <Width width={width}>
      <div className="relative mb-6">
        <div className="relative">
          <input
            id={name}
            type="email"
            className={`w-full px-4 pt-6 pb-2 bg-white/5 border rounded-xl backdrop-blur-xl transition-all duration-300 text-white placeholder-transparent focus:outline-none ${
              hasError
                ? 'border-red-500/50 focus:border-red-500'
                : isFocused || hasValue
                ? 'border-[#C9A646] focus:border-[#F4D03F] focus:shadow-[0_0_20px_rgba(201,166,70,0.3)]'
                : 'border-white/10 focus:border-[#C9A646]'
            }`}
            placeholder={placeholder || label || 'Email'}
            {...register(name, { 
              pattern: /^\S[^\s@]*@\S+$/,
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

          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
            <Mail size={20} />
          </div>
        </div>
        {hasError && (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {errors[name]?.type === 'pattern' ? 'Please enter a valid email address' : 'This field is required'}
          </p>
        )}
      </div>
    </Width>
  )
}
