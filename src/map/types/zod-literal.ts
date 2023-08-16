import type { ZodLiteral } from 'zod'
import mongoose from 'mongoose'
import { ZodToMongooseTypeNotSupportedError } from '../errors'

export const mapZodLiteral = <T extends ZodLiteral<any>>(zodLiteral: T, errorOnNotSupportedType: boolean): any => {
  switch (typeof zodLiteral._def.value) {
    case 'string':
      return { type: String, required: true, enum: [zodLiteral._def.value], ...zodLiteral._def.mongoose }
    case 'number':
      return {
        type: Number,
        required: true,
        enum: [zodLiteral._def.value],
        ...zodLiteral._def.mongoose,
      }
    case 'boolean':
      return { type: Boolean, required: true, ...zodLiteral._def.mongoose }
    case 'bigint':
      return { type: BigInt, required: true, ...zodLiteral._def.mongoose }

    default:
      if (errorOnNotSupportedType)
        throw new ZodToMongooseTypeNotSupportedError(
          zodLiteral._def.typeName,
          ('primitive of type ' + typeof zodLiteral._def.value).replace('object', 'object (null?)')
        )
      return { type: mongoose.Schema.Types.Mixed, required: true, ...zodLiteral._def.mongoose }
  }
}
