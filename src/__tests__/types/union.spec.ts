import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'
import mongoose from 'mongoose'

const zodUnionLiteralString = z.union([z.literal('Dog'), z.literal('Cat')]) // supported
const zodUnionLiteralNumber = zMongoose(z.union([z.literal(42), z.literal(43)]), { index: true }) // supported
const zodUnionLiteralBool = zMongoose(z.union([z.literal(true), z.literal(false)]), { index: true }) // supported
const zodUnionLiteralMixed = z.union([z.literal(42), z.literal('Cat')]) // not supported
const zodUnionObjects = z.union([z.object({ a: z.string() }), z.object({ b: z.number() })]) // not supported
const zodUnionMixed = z.union([z.string(), z.number()]) // not supported

const mongooseUnionLiteralString = { type: String, enum: ['Dog', 'Cat'], required: true }
const mongooseUnionLiteralNumber = { type: Number, enum: [42, 43], required: true, index: true }
const mongooseUnionLiteralBool = { type: Boolean, required: true, index: true }
const mongooseUnionLiteralMixed = { type: mongoose.Schema.Types.Mixed, required: true }
const mongooseUnionObjects = { type: mongoose.Schema.Types.Mixed, required: true }
const mongooseUnionMixed = { type: mongoose.Schema.Types.Mixed, required: true }

describe('zod unions', () => {
  it('string literal union', () => {
    expect(mapTypeInSchema(zodUnionLiteralString)).toEqual(mongooseUnionLiteralString)
  })
  it('number literal union', () => {
    expect(mapTypeInSchema(zodUnionLiteralNumber)).toEqual(mongooseUnionLiteralNumber)
  })
  it('number literal bool', () => {
    expect(mapTypeInSchema(zodUnionLiteralBool)).toEqual(mongooseUnionLiteralBool)
  })
  describe('mixed literal union', () => {
    it('throws if error on unsupported type enabled', () => {
      expect(() => mapTypeInSchema(zodUnionLiteralMixed)).toThrow(
        'Type ZodUnion not supported with given subtypes: all literals must have the same type'
      )
    })
    it('does not throw if error on unsupported type disabled', () => {
      expect(mapTypeInSchema(zodUnionLiteralMixed, false)).toEqual(mongooseUnionLiteralMixed)
    })
  })
  describe('object union', () => {
    it('throws if error on unsupported type enabled', () => {
      expect(() => mapTypeInSchema(zodUnionObjects)).toThrow(
        'Type ZodUnion not supported with given subtypes: only literal types are supported'
      )
    })
    it('does not throw if error on unsupported type disabled', () => {
      expect(mapTypeInSchema(zodUnionObjects, false)).toEqual(mongooseUnionObjects)
    })
  })
  describe('mixed union', () => {
    it('throws if error on unsupported type enabled', () => {
      expect(() => mapTypeInSchema(zodUnionMixed)).toThrow(
        'Type ZodUnion not supported with given subtypes: only literal types are supported'
      )
    })
    it('does not throw if error on unsupported type disabled', () => {
      expect(mapTypeInSchema(zodUnionMixed, false)).toEqual(mongooseUnionMixed)
    })
  })
})
