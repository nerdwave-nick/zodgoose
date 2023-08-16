import type { ZodRecord } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodRecord = (zodRecord: ZodRecord, _errorOnNotSupportedType: boolean): any => {
  return {
    type: Map,
    of: mapTypeInSchema(zodRecord._def.valueType, _errorOnNotSupportedType),
    required: true,
    ...zodRecord._def.mongoose,
  }
}
