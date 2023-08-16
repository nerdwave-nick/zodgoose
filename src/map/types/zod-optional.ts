import type { ZodOptional, ZodTypeAny } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodOptional = <T extends ZodOptional<ZodTypeAny>>(
  zodOptional: T,
  errorOnNotSupportedType: boolean
): any => {
  return {
    ...mapTypeInSchema(zodOptional._def.innerType, errorOnNotSupportedType),
    required: false,
    ...zodOptional._def.mongoose,
  }
}
