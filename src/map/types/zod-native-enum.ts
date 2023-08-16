import { ZodFirstPartyTypeKind, type ZodNativeEnum } from 'zod'
import mongoose from 'mongoose'
import { ZodToMongooseTypeCombinationNotSupportedError } from '../errors'

const isStringEnum = (enumToCheck: any): boolean => {
  for (const k of Object.keys(enumToCheck)) {
    if (typeof enumToCheck[k] !== 'string') {
      return false
    }
  }
  return true
}

const isNumberEnum = (enumToCheck: any): boolean => {
  for (const k of Object.keys(enumToCheck)) {
    if (
      !(
        (typeof enumToCheck[k] === 'string' || typeof enumToCheck[k] === 'number') &&
        `${enumToCheck[enumToCheck[k]]}` === `${k}`
      )
    ) {
      return false
    }
  }
  return true
}

export const mapZodNativeEnum = <T extends ZodNativeEnum<any>>(
  zodNativeEnum: T,
  errorOnNotSupportedType: boolean
): any => {
  if (isStringEnum(zodNativeEnum._def.values)) {
    return {
      type: String,
      enum: Object.values(zodNativeEnum._def.values),
      required: true,
      ...zodNativeEnum._def.mongoose,
    }
  } else if (isNumberEnum(zodNativeEnum._def.values)) {
    return {
      type: Number,
      enum: Object.values(zodNativeEnum._def.values).filter((v) => typeof v === 'number'),
      required: true,
      ...zodNativeEnum._def.mongoose,
    }
  }
  if (errorOnNotSupportedType) {
    throw new ZodToMongooseTypeCombinationNotSupportedError(
      ZodFirstPartyTypeKind.ZodNativeEnum,
      'mixed enum not supported'
    )
  } else return { type: mongoose.Schema.Types.Mixed, required: true, ...zodNativeEnum._def.mongoose }
}
