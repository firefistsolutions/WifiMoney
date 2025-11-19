'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../Button'
import { Gutter } from '../../Gutter'
import RichText from '../../RichText'
import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import classes from './index.module.scss'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[] | Value
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: {
    [k: string]: unknown
  }[]
}

export const FormBlock: React.FC<
  FormBlockType & {
    id?: string
  }
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  // Build initial form state with error handling
  let initialFormState = {}
  try {
    initialFormState = buildInitialFormState(formFromProps.fields || [])
  } catch (error) {
    console.error('Error building initial form state:', error)
  }

  const formMethods = useForm({
    defaultValues: initialFormState,
  })
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          // Use relative URL for same-origin requests (more reliable in production)
          const req = await fetch('/api/form-submissions', {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          // Send to Google Sheets if enabled (async, don't wait)
          if (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENABLED === 'true') {
            const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL
            if (webhookUrl) {
              // Transform submission data
              const flattenedData: Record<string, any> = {
                id: res.id || res.doc?.id,
                formId: formID,
                submittedAt: new Date().toISOString(),
              }
              
              // Flatten the submission data
              dataToSend.forEach((item: { field: string; value: any }) => {
                flattenedData[item.field] = item.value
              })

              // Send to Google Sheets (fire and forget)
              fetch(webhookUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(flattenedData),
              }).catch((err) => {
                console.error('Error sending to Google Sheets:', err)
              })
            } else {
              // Use internal API route
              const apiUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/google-sheets/sync`
              const flattenedData: Record<string, any> = {
                id: res.id || res.doc?.id,
                formId: formID,
                submittedAt: new Date().toISOString(),
              }
              
              dataToSend.forEach((item: { field: string; value: any }) => {
                flattenedData[item.field] = item.value
              })

              fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(flattenedData),
              }).catch((err) => {
                console.error('Error sending to Google Sheets:', err)
              })
            }
          }

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="w-full overflow-hidden">
      <div
        className={`flex flex-col ${hasSubmitted ? 'items-center justify-center min-h-[400px]' : ''}`}
      >
        {enableIntro && introContent && !hasSubmitted && (
          <div className="mb-6 prose prose-invert max-w-none">
            <RichText content={introContent} />
          </div>
        )}
        {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <div className="text-center max-w-2xl mx-auto p-8 rounded-3xl border border-[#C9A646]/20 bg-gradient-to-br from-[#C9A646]/10 via-black to-black">
            <RichText content={confirmationMessage} />
          </div>
        )}
        {isLoading && !hasSubmitted && (
          <div className="flex items-center justify-center p-8">
            <div className="text-white/60">Loading, please wait...</div>
          </div>
        )}
        {error && (
          <div className="p-4 mb-6 bg-red-500/10 border border-red-500/50 rounded-xl">
            <p className="text-red-400">
              {error.status || '500'}: {error.message || 'An error occurred'}
            </p>
          </div>
        )}
        {!hasSubmitted && (
          <form id={formID} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-2">
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType]
                  if (Field) {
                    // Debug: Log field info in development
                    if (process.env.NODE_ENV === 'development') {
                      console.log(`Rendering field ${index + 1}:`, {
                        name: 'name' in field ? field.name : undefined,
                        label: 'label' in field ? field.label : undefined,
                        blockType: field.blockType,
                        width: 'width' in field ? field.width : undefined,
                        options: field.blockType === 'select' && 'options' in field ? field.options : undefined,
                      })
                    }
                    return (
                      <React.Fragment key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </React.Fragment>
                    )
                  } else {
                    // Debug: Log if field type is not found
                    if (process.env.NODE_ENV === 'development') {
                      const fieldName = 'name' in field ? field.name : 'label' in field ? field.label : 'unknown'
                      console.warn(`Field type "${field.blockType}" not found for field:`, fieldName)
                    }
                  }
                  return null
                })}
            </div>
            <button
              type="submit"
              form={formID}
              className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A646] to-[#F4D03F] text-black font-semibold hover:shadow-[0_0_30px_rgba(201,166,70,0.5)] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitButtonLabel || 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
