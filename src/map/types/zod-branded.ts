import type { ZodBranded, ZodTypeAny } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodBranded = <T extends ZodBranded<ZodTypeAny, any>>(
  zodBranded: T,
  errorOnNotSupportedType: boolean
): any => {
  return {
    ...mapTypeInSchema(zodBranded._def.type, errorOnNotSupportedType),
    ...zodBranded._def.mongoose,
  }
}
