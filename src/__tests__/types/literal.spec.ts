import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'
import mongoose from 'mongoose'

const zodLiteralDog = z.literal('Dog')
const zodLiteral42 = zMongoose(z.literal(42), { index: true })
const zodLiteralFalse = zMongoose(z.literal(false), { index: true })
const zodLiteralBigint = zMongoose(z.literal(BigInt(100)), { index: true })
const zodLiteralSymbol = zMongoose(z.literal(Symbol('asdf')), { index: true })
const zodLiteralNull = zMongoose(z.literal(null), { index: true })
const zodLiteralUndefined = zMongoose(z.literal(undefined), { index: true })

const mongooseLiteralDog = { type: String, enum: ['Dog'], required: true }
const mongooseLiteral42 = { type: Number, enum: [42], required: true, index: true }
const mongooseLiteralFalse = { type: Boolean, required: true, index: true }
const mongooseLiteralBigint = { type: BigInt, required: true, index: true }
const mongooseLiteralAny = { type: mongoose.Schema.Types.Mixed, required: true, index: true }
describe('zod literals', () => {
  it('string literal', () => {
    expect(mapTypeInSchema(zodLiteralDog)).toEqual(mongooseLiteralDog)
  })
  it('number literal', () => {
    expect(mapTypeInSchema(zodLiteral42)).toEqual(mongooseLiteral42)
  })
  it('false literal', () => {
    expect(mapTypeInSchema(zodLiteralFalse)).toEqual(mongooseLiteralFalse)
  })
  it('bigint literal', () => {
    expect(mapTypeInSchema(zodLiteralBigint)).toEqual(mongooseLiteralBigint)
  })
  describe('symbol literal', () => {
    it('throws if error on unsupported type enabled', () => {
      expect(() => mapTypeInSchema(zodLiteralSymbol)).toThrow(
        'Type not supported: ZodLiteral - primitive of type symbol'
      )
    })
    it('does not throw if error on unsupported type disabled', () => {
      expect(mapTypeInSchema(zodLiteralSymbol, false)).toEqual(mongooseLiteralAny)
    })
  })
  describe('null literal', () => {
    it('throws if error on unsupported type enabled', () => {
      expect(() => mapTypeInSchema(zodLiteralNull)).toThrow(
        'Type not supported: ZodLiteral - primitive of type object (null?)'
      )
    })
    it('does not throw if error on unsupported type disabled', () => {
      expect(mapTypeInSchema(zodLiteralNull, false)).toEqual(mongooseLiteralAny)
    })
  })
  describe('undefined literal', () => {
    it('throws if error on unsupported type enabled', () => {
      expect(() => mapTypeInSchema(zodLiteralUndefined)).toThrow(
        'Type not supported: ZodLiteral - primitive of type undefined'
      )
    })
    it('does not throw if error on unsupported type disabled', () => {
      expect(mapTypeInSchema(zodLiteralUndefined, false)).toEqual(mongooseLiteralAny)
    })
  })
})
