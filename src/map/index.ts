import type { SchemaDefinition, SchemaType, SchemaTypeOptions } from 'mongoose'
import { ZodFirstPartyTypeKind, AnyZodObject, ZodTypeAny } from 'zod'
import * as types from './types'
import { ZodToMongooseTypeNotSupportedError } from './errors'

export * as types from './types'

/** maps a zod schema to a mongoose schema.
 * Ignores top level mongoose options, since schema wide options
 * don't make sense
 * @param zodInput the zod schema to map
 * @param errorOnNotSupportedType whether to throw an error if an included type is not supported
 * @returns a mongoose schema
 */
export const mapSchema = <T extends AnyZodObject>(
  zodInput: T,
  errorOnNotSupportedType = true
): SchemaDefinition<SchemaType<T['_output']>> => {
  const output: any = {}
  const zodInputShape = zodInput.shape
  for (const key in zodInputShape) {
    const zodSchemaShapeKey = zodInputShape[key]
    output[key] = mapTypeInSchema(zodSchemaShapeKey, errorOnNotSupportedType)
  }
  return output
}

/**
 * Maps a zod type to it's mongoose schema type
 * @param zodInput the zod type to map
 * @param errorOnNotSupportedType whether to throw an error if the type is not supported
 * @returns a property definition for use within a mongoose schema
 */
export const mapTypeInSchema = <T extends ZodTypeAny>(zodInput: T, errorOnNotSupportedType = true): any => {
  const type = zodInput?._def?.typeName
  switch (type as ZodFirstPartyTypeKind) {
    case ZodFirstPartyTypeKind.ZodNumber:
      return types.mapZodNumber(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodString:
      return types.mapZodString(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodBigInt:
      return types.mapZodBigInt(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodBoolean:
      return types.mapZodBoolean(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodObject:
      return types.mapZodObject(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodDate:
      return types.mapZodDate(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodAny:
      return types.mapZodAny(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return types.mapZodDiscriminatedUnion(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodIntersection:
      return types.mapZodIntersection(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodArray:
      return types.mapZodArray(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodRecord:
      return types.mapZodRecord(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodMap:
      return types.mapZodMap(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodLiteral:
      return types.mapZodLiteral(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodUnion:
      return types.mapZodUnion(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodEnum:
      return types.mapZodEnum(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return types.mapZodNativeEnum(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodOptional:
      return types.mapZodOptional(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodNullable:
      return types.mapZodNullable(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodDefault:
      return types.mapZodDefault(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodEffects:
      return types.mapZodEffects(zodInput as any, errorOnNotSupportedType) // passthrough
    case ZodFirstPartyTypeKind.ZodBranded:
      return types.mapZodBranded(zodInput as any, errorOnNotSupportedType) // passthrough
    case ZodFirstPartyTypeKind.ZodCatch:
      return types.mapZodCatch(zodInput as any, errorOnNotSupportedType) // passthrough
    case ZodFirstPartyTypeKind.ZodSet:
      return types.mapZodSet(zodInput as any, errorOnNotSupportedType) // just array
    // The following one's aren't supported by mongoose
    case ZodFirstPartyTypeKind.ZodTuple:
      return types.mapZodAnyArr(zodInput as any, errorOnNotSupportedType)
    case ZodFirstPartyTypeKind.ZodLazy:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
    case ZodFirstPartyTypeKind.ZodUnknown:
    case ZodFirstPartyTypeKind.ZodNull:
    case ZodFirstPartyTypeKind.ZodUndefined:
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodPipeline:
    case ZodFirstPartyTypeKind.ZodPromise: {
      if (errorOnNotSupportedType) {
        throw new ZodToMongooseTypeNotSupportedError(type)
      }
      return types.mapZodAny(zodInput as any, errorOnNotSupportedType)
    }
    default:
      throw new ZodToMongooseTypeNotSupportedError(type, 'type unknown')
  }
}
