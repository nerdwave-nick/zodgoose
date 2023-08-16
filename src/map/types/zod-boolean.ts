import type { ZodBoolean } from 'zod'

export const mapZodBoolean = (zodBoolean: ZodBoolean, _errorOnNotSupportedType: boolean): any => {
  const rv = { type: Boolean, required: true } as any
  // no checks on boolean
  const mongooseOptions = zodBoolean._def.mongoose ?? {}
  return { ...rv, ...mongooseOptions }
}
