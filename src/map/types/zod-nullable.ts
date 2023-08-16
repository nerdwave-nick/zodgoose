import type { ZodNullable, ZodTypeAny } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodNullable = <T extends ZodNullable<ZodTypeAny>>(
  zodNullable: T,
  errorOnNotSupportedType: boolean
): any => {
  const inner = mapTypeInSchema(zodNullable._def.innerType, errorOnNotSupportedType)
  if (inner.enum) {
    inner.enum = [...inner.enum, null]
  }
  return {
    default: null,
    ...inner,
    required: false,
    ...zodNullable._def.mongoose,
  }
}
