import type { ZodDefault, ZodTypeAny } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodDefault = <T extends ZodDefault<ZodTypeAny>>(
  zodDefault: T,
  errorOnNotSupportedType: boolean
): any => {
  return {
    ...mapTypeInSchema(zodDefault._def.innerType, errorOnNotSupportedType),
    default: zodDefault._def.defaultValue,
    ...zodDefault._def.mongoose,
  }
}
