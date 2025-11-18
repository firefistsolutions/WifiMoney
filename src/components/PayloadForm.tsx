'use client'

import React, { useEffect, useState } from 'react'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { FormBlock } from './Blocks/Form'
import GlassCard from './shared/GlassCard'

interface PayloadFormProps {
  formId: number | string
  enableIntro?: boolean
  introContent?: any
  className?: string
}

/**
 * Component to fetch and display a Payload CMS form by ID
 * Usage: <PayloadForm formId={1} />
 */
export default function PayloadForm({ 
  formId, 
  enableIntro = false, 
  introContent,
  className 
}: PayloadFormProps) {
  const [form, setForm] = useState<FormType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/forms/${formId}?depth=2&draft=false&locale=undefined&trash=false`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch form: ${response.statusText}`)
        }

        const data = await response.json()
        setForm(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching form:', err)
        setError(err instanceof Error ? err.message : 'Failed to load form')
      } finally {
        setLoading(false)
      }
    }

    if (formId) {
      fetchForm()
    }
  }, [formId])

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className || ''}`}>
        <div className="text-white/60">Loading form...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-500/10 border border-red-500/50 rounded-lg ${className || ''}`}>
        <p className="text-red-400">Error: {error}</p>
        <p className="text-sm text-white/60 mt-2">
          Make sure the form ID is correct and the form exists in Payload CMS.
        </p>
      </div>
    )
  }

  if (!form) {
    return (
      <div className={`p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg ${className || ''}`}>
        <p className="text-yellow-400">Form not found</p>
      </div>
    )
  }

  return (
    <GlassCard className={`p-8 ${className || ''}`}>
      <FormBlock
        form={form}
        enableIntro={enableIntro}
        introContent={introContent}
        blockType="formBlock"
      />
    </GlassCard>
  )
}

