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
    let isMounted = true
    let abortController: AbortController | null = null
    let retryTimeout: ReturnType<typeof setTimeout> | null = null
    let fetchTimeout: ReturnType<typeof setTimeout> | null = null

    const fetchForm = async (retryCount = 0) => {
      // Skip if component unmounted
      if (!isMounted) return

      try {
        setLoading(true)
        setError(null)
        
        // Create abort controller for this request
        abortController = new AbortController()
        
        // Always use relative URL for same-origin requests (more reliable)
        // Reduce depth to 1 to speed up the query (depth=2 might be causing slowness)
        // Remove locale=undefined as it causes 500 errors in production
        const apiUrl = `/api/forms/${formId}?depth=1&draft=false`
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Fetching form from:', apiUrl)
        }
        
        // Add timeout to prevent hanging (30 seconds)
        fetchTimeout = setTimeout(() => {
          if (abortController) {
            abortController.abort()
          }
        }, 30000)
        
        let response: Response
        try {
          response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: abortController.signal,
            // Use credentials for same-origin requests
            credentials: 'same-origin',
          })
          
          if (fetchTimeout) {
            clearTimeout(fetchTimeout)
            fetchTimeout = null
          }
        } catch (fetchError) {
          if (fetchTimeout) {
            clearTimeout(fetchTimeout)
            fetchTimeout = null
          }
          throw fetchError
        }

        // Check if component is still mounted
        if (!isMounted) return

        if (!response.ok) {
          const errorText = await response.text()
          let errorMessage = `Failed to fetch form: ${response.status} ${response.statusText}`
          let errorDetails: any = null
          
          try {
            if (errorText && errorText.trim()) {
              const errorData = JSON.parse(errorText)
              errorMessage = errorData.message || errorData.error || errorData.errors?.[0]?.message || errorMessage
              errorDetails = errorData
            }
          } catch {
            // If not JSON, use the text or default message
            if (errorText) errorMessage = errorText
          }
          
          // Log detailed error in development
          if (process.env.NODE_ENV === 'development') {
            console.error('Form fetch error:', {
              status: response.status,
              statusText: response.statusText,
              errorMessage,
              errorDetails,
              apiUrl,
              formId,
            })
          }
          
          throw new Error(errorMessage)
        }

        // Check if response has content before parsing
        const contentType = response.headers.get('content-type')
        const contentLength = response.headers.get('content-length')
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Response headers:', { contentType, contentLength })
        }

        // Get response text first to check if it's empty
        const responseText = await response.text()
        
        if (!responseText || !responseText.trim()) {
          throw new Error('Empty response from server')
        }

        let data
        try {
          data = JSON.parse(responseText)
        } catch (parseError) {
          if (process.env.NODE_ENV === 'development') {
            console.error('JSON parse error. Response text:', responseText.substring(0, 200))
          }
          throw new Error('Invalid JSON response from server')
        }
        
        // Check if component is still mounted before updating state
        if (!isMounted) return
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Form data received:', data)
        }
        
        // Validate that we got form data
        if (!data || !data.id) {
          throw new Error('Invalid form data received')
        }
        
        setForm(data)
        setError(null)
        setLoading(false)
      } catch (err) {
        // Ignore abort errors (component unmounted or cleanup)
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }

        // Skip error handling if component unmounted
        if (!isMounted) return

        // Retry up to 3 times if it's a network error
        if (err instanceof TypeError && err.message === 'Failed to fetch' && retryCount < 3) {
          const delay = (retryCount + 1) * 2000 // 2s, 4s, 6s
          if (process.env.NODE_ENV === 'development') {
            console.log(`Retrying form fetch (attempt ${retryCount + 1}/3) after ${delay}ms...`)
          }
          retryTimeout = setTimeout(() => {
            if (isMounted) {
              fetchForm(retryCount + 1)
            }
          }, delay)
          return
        }
        
        // Only set error if component is still mounted
        if (isMounted) {
          if (err instanceof TypeError && err.message === 'Failed to fetch') {
            setError('Unable to connect to the server. Please ensure the server is running and try refreshing the page.')
          } else {
            setError(err instanceof Error ? err.message : 'Failed to load form')
          }
          setLoading(false)
        }
      }
    }

    if (formId) {
      fetchForm()
    } else {
      setLoading(false)
      setError('Form ID is required')
    }

    // Cleanup function
    return () => {
      isMounted = false
      if (abortController) {
        abortController.abort()
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }
      if (fetchTimeout) {
        clearTimeout(fetchTimeout)
      }
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
    <GlassCard noHover className={`p-8 ${className || ''}`}>
      <FormBlock
        form={form}
        enableIntro={enableIntro}
        introContent={introContent}
        blockType="formBlock"
      />
    </GlassCard>
  )
}

