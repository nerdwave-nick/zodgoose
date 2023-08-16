import type { ZodMap, ZodString, ZodTypeAny } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodMap = (zodRecord: ZodMap<ZodString, ZodTypeAny>, _errorOnNotSupportedType: boolean): any => {
  return {
    type: Map,
    of: mapTypeInSchema(zodRecord._def.valueType, _errorOnNotSupportedType),
    required: true,
    ...zodRecord._def.mongoose,
  }
}
