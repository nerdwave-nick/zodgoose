import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'
import mongoose from 'mongoose'

const zUnion = z.discriminatedUnion('type', [
  z.object({ type: zMongoose(z.literal('boat'), { index: true }), value: z.number() }),
  z.object({ type: zMongoose(z.literal('coffee'), { index: true }), value: z.string() }),
])

const zUnionWithFancyOptions = zMongoose(
  z.discriminatedUnion('bread', [
    z.object({ bread: z.literal('baguette'), weight: zMongoose(z.number(), { alias: 'mass' }), length: z.number() }),
    z.object({
      bread: z.literal('ciabatta'),
      weight: z.number(),
      italian: z.boolean(),
      length: zMongoose(z.number(), { immutable: true }),
    }),
    z.object({
      bread: z.literal('sourdough'),
      weight: zMongoose(z.number(), { unique: true }),
      starterAge: z.number(),
    }),
  ]),
  { excludeIndexes: true }
)

const mongooseUnion = {
  type: {
    type: {
      type: String,
      enum: ['boat', 'coffee'],
      required: true,
      index: true,
    },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  required: true,
}

const mongooseUnionWithFancyOptions = {
  type: {
    bread: {
      type: String,
      enum: ['baguette', 'ciabatta', 'sourdough'],
      required: true,
    },
    weight: { type: Number, required: true, alias: 'mass' },
    length: { type: Number, required: false },
    italian: { type: Boolean, required: false },
    starterAge: { type: Number, required: false },
  },
  excludeIndexes: true,
  required: true,
}

describe('zod union', () => {
  it('simple discriminator union', () => {
    expect(mapTypeInSchema(zUnion)).toEqual(mongooseUnion)
  })
  it('fancy discriminator union', () => {
    expect(mapTypeInSchema(zUnionWithFancyOptions)).toEqual(mongooseUnionWithFancyOptions)
  })
})
