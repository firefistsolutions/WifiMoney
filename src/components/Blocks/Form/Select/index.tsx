'use client'

import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { MessageSquare } from 'lucide-react'

import { Error } from '../Error'
import { Width } from '../Width'

const getSelectStyles = (hasValue: boolean, isFocused: boolean) => ({
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: state.isFocused 
      ? '#C9A646' 
      : (state.getValue && state.getValue().length > 0)
      ? '#C9A646' 
      : 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: hasValue || isFocused ? '20px 40px 8px 16px' : '8px 40px 8px 16px',
    minHeight: hasValue || isFocused ? '64px' : '56px',
    boxShadow: state.isFocused ? '0 0 20px rgba(201, 166, 70, 0.3)' : 'none',
    borderWidth: '1px',
    '&:hover': {
      borderColor: '#C9A646',
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: hasValue || isFocused ? '4px' : '0',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#ffffff',
    marginTop: hasValue || isFocused ? '4px' : '0',
  }),
  input: (base: any) => ({
    ...base,
    color: '#ffffff',
    marginTop: hasValue || isFocused ? '4px' : '0',
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingTop: hasValue || isFocused ? '4px' : '0',
    paddingBottom: '0',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused 
      ? 'rgba(201, 166, 70, 0.2)' 
      : state.isSelected 
      ? 'rgba(201, 166, 70, 0.3)' 
      : 'transparent',
    color: '#ffffff',
    padding: '12px 16px',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'rgba(201, 166, 70, 0.3)',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.4)',
    '&:hover': {
      color: '#C9A646',
    },
  }),
})

export const Select: React.FC<
  {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  } & SelectField
> = ({ name, control, errors, label, options, required, width, placeholder, defaultValue }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const hasError = required && errors[name]

  return (
    <Width width={width}>
      <div className="relative mb-6">
        <div className="relative">
          <Controller
            control={control}
            defaultValue={defaultValue || ''}
            name={name}
            render={({ field: { onChange, value } }) => {
              const currentValue = options?.find((s) => s.value === value)
              const valueExists = !!currentValue
              if (valueExists && !hasValue) setHasValue(true)
              if (!valueExists && hasValue) setHasValue(false)
              
              return (
                <div onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
                  <ReactSelect
                    className="react-select-container"
                    classNamePrefix="rs"
                    inputId={name}
                    instanceId={name}
                    onChange={(val) => {
                      onChange(val ? val.value : '')
                      setHasValue(!!val)
                      setIsFocused(false)
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    options={options}
                    value={currentValue || null}
                    placeholder={!valueExists && !isFocused ? (placeholder || label) : ''}
                    styles={getSelectStyles(valueExists, isFocused)}
                    isSearchable={false}
                  />
                </div>
              )
            }}
            rules={{ required }}
          />
          
          <label
            htmlFor={name}
            className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
              isFocused || hasValue
                ? 'top-2 text-xs text-[#C9A646]'
                : 'top-4 text-base text-white/60'
            }`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <div className="absolute right-12 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
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
