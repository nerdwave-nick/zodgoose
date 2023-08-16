import type { ZodTuple, ZodTypeAny } from 'zod'
import mongoose from 'mongoose'
import { ZodToMongooseTypeNotSupportedError } from '../errors'

export const mapZodAnyArr = <T extends ZodTuple<[ZodTypeAny, ...ZodTypeAny[]]>>(
  zodTuple: T,
  errorOnNotSupportedType: boolean
): any => {
  if (errorOnNotSupportedType) throw new ZodToMongooseTypeNotSupportedError(zodTuple._def.typeName)
  return { type: [mongoose.Schema.Types.Mixed], required: true, ...zodTuple._def.mongoose }
}
