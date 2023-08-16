import type { ZodUnion } from 'zod'
import mongoose from 'mongoose'
import { ZodToMongooseTypeCombinationNotSupportedError } from '../errors'
import { mapTypeInSchema } from '..'

export const mapZodUnion = <T extends ZodUnion<any>>(zodUnion: T, errorOnNotSupportedType: boolean): any => {
  // first check if they're all literals - anything else is a no-go
  const optionTypes = zodUnion._def.options.map((option: any) => option._def.typeName)
  if (optionTypes.some((x: any) => x !== 'ZodLiteral')) {
    if (errorOnNotSupportedType)
      throw new ZodToMongooseTypeCombinationNotSupportedError(
        zodUnion._def.typeName,
        'only literal types are supported'
      )
    return { type: mongoose.Schema.Types.Mixed, required: true, ...zodUnion._def.mongoose }
  }
  // then ensure that they're all literals of the same underlying type
  const optionValues = zodUnion._def.options.map((option: any) => mapTypeInSchema(option))
  const optionValueTypesSet = new Set(optionValues.map((option: any) => option.type))
  if (optionValueTypesSet.size > 1) {
    if (errorOnNotSupportedType)
      throw new ZodToMongooseTypeCombinationNotSupportedError(
        zodUnion._def.typeName,
        'all literals must have the same type'
      )
    return { type: mongoose.Schema.Types.Mixed, required: true, ...zodUnion._def.mongoose }
  }
  // now we're good to go
  const rv = {
    type: optionValues[0].type, // all the same, so this is fine
    required: true,
    ...zodUnion._def.mongoose,
  }
  if (optionValues[0].enum)
    rv.enum = optionValues.map((option: any) => option.enum[0] /* all literals, so single size */) // combine their enum values if possible
  return rv
}
