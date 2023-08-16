import type { ArrayCardinality, ZodArray, ZodTypeAny } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodArray = <T extends ZodArray<ZodTypeAny, ArrayCardinality>>(
  zodArray: T,
  errorOnNotSupportedType: boolean
): any => {
  const inner = zodArray._def.type
  const parsedInner = mapTypeInSchema(inner, errorOnNotSupportedType).type
  const rv = { type: [parsedInner], required: true } as any
  // mongoose doesn't support min/max
  return { ...rv, ...zodArray._def.mongoose }
}
