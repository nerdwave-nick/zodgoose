import { z } from 'zod'
import { mapSchema, mapTypeInSchema, zMongoose } from '../..'

const zObject = zMongoose(
  z.object({
    name: z.object({ firstName: z.string(), lastName: z.string() }),
    dateOfBirth: z.date().min(new Date(1900, 1, 1)),
    socialSecurityNumber: zMongoose(z.number().int().gte(10).lte(99), { index: true, unique: true }),
  }),
  {
    index: true,
  }
)
const mongooseObjectMapSchema = {
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
}

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
}

describe('zod object', () => {
  it('object map schema', () => {
    expect(mapSchema(zObject)).toEqual(mongooseObjectMapSchema)
  })
  it('object map type', () => {
    expect(mapTypeInSchema(zObject)).toEqual(mongooseObjectMapType)
  })
})
