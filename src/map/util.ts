import { ZodTypeAny } from 'zod'

export const getTypeOrInnerType = (zAny: ZodTypeAny): string => {
  if (zAny._def.typeName === 'ZodOptional') {
    return getTypeOrInnerType(zAny._def.innerType)
  }
  return zAny._def.typeName
}
export const isObj = (x: any) => typeof x === 'object'
