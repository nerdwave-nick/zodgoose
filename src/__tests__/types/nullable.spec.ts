import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const defaultDate = () => new Date()
const zodUnionLiteralString = zMongoose(z.union([z.literal('Dog'), z.literal('Cat')]).nullable(), { index: true }) // supported
const zObject = zMongoose(
  z.object({
    name: z.object({ firstName: z.string(), lastName: z.string() }),
    dateOfBirth: z
      .date()
      .min(new Date(1900, 1, 1))
      .default(defaultDate)
      .nullable(),
    socialSecurityNumber: zMongoose(z.number().int().gte(10).lte(99), { index: true, unique: true }),
  }),
  {
    index: true,
  }
).nullable()
const zodUnionMixed = z.union([z.string(), z.number()]).nullable() // not supported
const zodEnum = z.enum(['Dog', 'Cat']).nullable()

const mongooseEnum = { type: String, enum: ['Dog', 'Cat', null], required: false, default: null }
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
      required: false,
      min: new Date(1900, 1, 1),
      default: defaultDate,
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
  required: false,
  default: null,
  index: true,
}
const mongooseUnionLiteralString = {
  type: String,
  enum: ['Dog', 'Cat', null],
  required: false,
  index: true,
  default: null,
}

describe('zod nullable', () => {
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
