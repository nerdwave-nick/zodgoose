import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'
import mongoose from 'mongoose'

const zodIntersection = z.intersection(
  zMongoose(
    z.object({
      a: zMongoose(z.string(), { index: true, immutable: true }).optional(),
      b: z.string(),
      d: zMongoose(z.string(), { index: true, immutable: true }).catch('bap'),
    }),
    { ref: 'test' }
  ),
  zMongoose(
    z.object({
      a: zMongoose(z.string(), { immutable: true }),
      c: z.string(),
      d: zMongoose(z.number(), { immutable: false }),
    }),
    { index: true }
  )
)
const zodSimpleIntersection = z.intersection(z.string(), z.number().optional())
const zodMatchingIntersection = z.intersection(z.string(), z.string())
const zodMixedIntersection = zMongoose(z.intersection(z.string(), z.object({ a: z.string() })), { index: true })

const mongooseIntersection = {
  type: {
    a: {
      type: String,
      required: false,
      immutable: true,
    },
    d: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      immutable: false,
    },
  },
  required: true,
}

const mongooseSimpleIntersection = {
  type: mongoose.Schema.Types.Mixed,
  required: true,
}
const mongooseMatchingIntersection = {
  type: String,
  required: true,
}

const mongooseMixedIntersection = {
  type: mongoose.Schema.Types.Mixed,
  required: true,
  index: true,
}
describe('zod intersection', () => {
  it('object intersection', () => {
    expect(mapTypeInSchema(zodIntersection)).toEqual(mongooseIntersection)
  })
  it('simple intersection', () => {
    expect(mapTypeInSchema(zodSimpleIntersection)).toEqual(mongooseSimpleIntersection)
  })
  it('matching intersection', () => {
    expect(mapTypeInSchema(zodMatchingIntersection)).toEqual(mongooseMatchingIntersection)
  })
  it('mixed intersection', () => {
    expect(mapTypeInSchema(zodMixedIntersection)).toEqual(mongooseMixedIntersection)
  })
})
