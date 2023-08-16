import mongoose from 'mongoose'
import type { ZodAny } from 'zod'

export const mapZodAny = (zodAny: ZodAny, _errorOnNotSupportedType: boolean): any => {
  const rv = { type: mongoose.Schema.Types.Mixed, required: true } as any
  // no checks on zod any
  const mongooseOptions = zodAny._def.mongoose ?? {}
  return { ...rv, ...mongooseOptions }
}
