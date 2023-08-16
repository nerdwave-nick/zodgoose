import type { ZodCatch, ZodTypeAny } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodCatch = <T extends ZodCatch<ZodTypeAny>>(zodCatch: T, errorOnNotSupportedType: boolean): any => {
  return {
    ...mapTypeInSchema(zodCatch._def.innerType, errorOnNotSupportedType),
    ...zodCatch._def.mongoose,
  }
}
