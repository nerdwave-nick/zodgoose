import type { ZodSet } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodSet = (zodSet: ZodSet, errorOnNotSupportedType: boolean): any => {
  // min - max size ignored because mongoose doesn't do that
  const inner = zodSet._def.valueType
  const parsedInnerType = mapTypeInSchema(inner, errorOnNotSupportedType).type
  const rv = { type: [parsedInnerType], required: true } as any
  // mongoose doesn't support min/max
  return { ...rv, ...zodSet._def.mongoose }
}
