import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const defaultUnionLiteralString = () => 'Cat' as const
const defaultObject = () => {
  return {
    name: { firstName: 'John', lastName: 'Doe' },
    dateOfBirth: new Date(2000, 1, 1),
    socialSecurityNumber: 42,
  } as const
}
const defaultEnum = () => 'Dog' as const
const zodUnionLiteralString = zMongoose(
  z.union([z.literal('Dog'), z.literal('Cat')]).default(defaultUnionLiteralString),
  { index: true }
) // supported
const zObject = zMongoose(
  z.object({
    name: z.object({ firstName: z.string(), lastName: z.string() }),
    dateOfBirth: z.date().min(new Date(1900, 1, 1)),
    socialSecurityNumber: zMongoose(z.number().int().gte(10).lte(99), { index: true, unique: true }),
  }),
  {
    index: true,
  }
).default(defaultObject)
const zodUnionMixed = z.union([z.string(), z.number()]).default(0) // not supported
const zodEnum = z.enum(['Dog', 'Cat']).default(defaultEnum)

const mongooseEnum = { type: String, enum: ['Dog', 'Cat'], required: true, default: defaultEnum }
const mongooseObjectMapType = {
  type: {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      min: new Date(1900, 1, 1),
    },
    socialSecurityNumber: {
      type: Number,
      required: true,
      index: true,
      unique: true,
      min: 10,
      max: 99,
    },
  },
  required: true,
  index: true,
  default: defaultObject,
}
const mongooseUnionLiteralString = {
  type: String,
  enum: ['Dog', 'Cat'],
  required: true,
  index: true,
  default: defaultUnionLiteralString,
}

describe('zod default', () => {
  it('string literal union', () => {
    expect(mapTypeInSchema(zodUnionLiteralString)).toEqual(mongooseUnionLiteralString)
  })
  it('object map type', () => {
    expect(mapTypeInSchema(zObject)).toEqual(mongooseObjectMapType)
  })
  it('throws if unsupported type', () => {
    expect(() => mapTypeInSchema(zodUnionMixed)).toThrow(
      'Type ZodUnion not supported with given subtypes: only literal types are supported'
    )
  })
  it('string enum', () => {
    expect(mapTypeInSchema(zodEnum)).toEqual(mongooseEnum)
  })
})
