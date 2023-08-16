import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'
import mongoose from 'mongoose'

const mongooseAny = { type: mongoose.Schema.Types.Mixed, required: true }
describe('unsupported types', () => {
  describe('tuples', () => {
    const zodTuple = zMongoose(z.tuple([z.object({ a: z.string() }), z.number()]), { index: true })
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodTuple)).toThrow('Type not supported: ZodTuple')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodTuple, false)).toEqual({ type: [mongooseAny.type], required: true, index: true })
    })
  })
  describe('Lazy', () => {
    const zodLazy = z.lazy(() => z.string())
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodLazy)).toThrow('Type not supported: ZodLazy')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodLazy, false)).toEqual(mongooseAny)
    })
  })
  describe('ZodNaN', () => {
    const zodNaN = z.nan()
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodNaN)).toThrow('Type not supported: ZodNaN')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodNaN, false)).toEqual(mongooseAny)
    })
  })
  describe('ZodNever', () => {
    const zodNever = z.never()
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodNever)).toThrow('Type not supported: ZodNever')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodNever, false)).toEqual(mongooseAny)
    })
  })
  describe('ZodUnknown', () => {
    const zodUnknown = z.unknown()
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodUnknown)).toThrow('Type not supported: ZodUnknown')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodUnknown, false)).toEqual(mongooseAny)
    })
  })
  describe('ZodNull', () => {
    const zodNull = z.null()
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodNull)).toThrow('Type not supported: ZodNull')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodNull, false)).toEqual(mongooseAny)
    })
  })
  describe('ZodUndefined', () => {
    const zodUndefined = z.undefined()
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodUndefined)).toThrow('Type not supported: ZodUndefined')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodUndefined, false)).toEqual(mongooseAny)
    })
  })
  describe('ZodFunction', () => {
    const zodFunction = z.function()
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodFunction)).toThrow('Type not supported: ZodFunction')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodFunction, false)).toEqual(mongooseAny)
    })
  })
  describe('ZodPipeline', () => {
    const zodPipeline = z.pipeline(z.string(), z.number())
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodPipeline)).toThrow('Type not supported: ZodPipeline')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodPipeline, false)).toEqual(mongooseAny)
    })
  })
  describe('ZodPromise', () => {
    const zodPromise = z.promise(z.string())
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodPromise)).toThrow('Type not supported: ZodPromise')
    })
    it('otherwise defaults to any', () => {
      expect(mapTypeInSchema(zodPromise, false)).toEqual(mongooseAny)
    })
  })
  describe('NonZod', () => {
    const nonZod = { type: String }
    it('throws on non zod type', () => {
      expect(() => mapTypeInSchema(nonZod as any)).toThrow('Type not supported: undefined - type unknown')
    })
    it('throws on undefined', () => {
      expect(() => mapTypeInSchema(undefined as any)).toThrow('Type not supported: undefined - type unknown')
    })
  })
})
