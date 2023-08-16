import type { ZodEffects, ZodTypeAny } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodEffects = <T extends ZodEffects<ZodTypeAny>>(
  zodEffects: T,
  errorOnNotSupportedType: boolean
): any => {
  return {
    ...mapTypeInSchema(zodEffects._def.schema, errorOnNotSupportedType),
    ...zodEffects._def.mongoose,
  }
}
