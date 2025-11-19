import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const buildInitialFormState = (fields: FormFieldBlock[]) => {
  return fields.reduce((initialSchema, field) => {
    // Skip fields without a name property (like MessageField)
    if (!('name' in field) || !field.name) {
      return initialSchema
    }

    // Use string comparison to handle all block types, including 'number' which may not be in the type union
    // Cast to any first, then to string to bypass TypeScript's strict type checking
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blockType: string = String((field as any).blockType)

    if (blockType === 'checkbox') {
      return {
        ...initialSchema,
        [field.name]: false,
      }
    }
    if (blockType === 'country') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (blockType === 'email') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (blockType === 'text') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    // Handle 'number' type - it exists in the API but may not be in the TypeScript types
    if (blockType === 'number') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (blockType === 'textarea') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (blockType === 'select') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (blockType === 'state') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    
    // Default: return schema unchanged for unknown field types
    return initialSchema
  }, {})
}
