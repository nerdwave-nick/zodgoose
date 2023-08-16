import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const basicNumberZod = z.number()
const gtFiveZod = z.number().gt(5)
const gteFiveZod = z.number().gte(5)
const minFiveZod = z.number().min(5)
const ltFiveZod = z.number().lt(5)
const lteFiveZod = z.number().lte(5)
const maxFiveZod = z.number().max(5)
const intNumZod = z.number().int()
const positiveZod = z.number().positive()
const negativeZod = z.number().negative()
const nonpositiveZod = z.number().nonpositive()
const nonnegativeZod = z.number().nonnegative()
const multipleOfFiveZod = z.number().multipleOf(5)
const multipleOfNegativeFiveZod = z.number().multipleOf(-5)
const finiteZod = z.number().finite()
const safeZod = z.number().safe()
const stepPointOneZod = z.number().step(0.1)
const stepPointZeroZeroZeroOneZod = z.number().step(0.0001)
const stepSixPointFourZod = zMongoose(z.number().step(6.4), { immutable: true })

const basicNumberMongoose = { type: Number, required: true }
const gtFiveMongoose = { type: Number, required: true, min: 5 + Number.EPSILON }
const gteFiveMongoose = { type: Number, required: true, min: 5 }
const minFiveMongoose = { type: Number, required: true, min: 5 }
const ltFiveMongoose = { type: Number, required: true, max: 5 - Number.EPSILON }
const lteFiveMongoose = { type: Number, required: true, max: 5 }
const maxFiveMongoose = { type: Number, required: true, max: 5 }
const intNumMongoose = { type: Number, required: true }
const positiveMongoose = { type: Number, required: true, min: Number.EPSILON }
const negativeMongoose = { type: Number, required: true, max: -Number.EPSILON }
const nonpositiveMongoose = { type: Number, required: true, max: 0 }
const nonnegativeMongoose = { type: Number, required: true, min: 0 }
const multipleOfFiveMongoose = { type: Number, required: true }
const multipleOfNegativeFiveMongoose = { type: Number, required: true }
const finiteMongoose = { type: Number, required: true, min: Number.MIN_VALUE, max: Number.MAX_VALUE }
const safeMongoose = { type: Number, required: true, min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }
const stepPointOneMongoose = { type: Number, required: true }
const stepPointZeroZeroZeroOneMongoose = { type: Number, required: true }
const stepSixPointFourMongoose = { type: Number, required: true, immutable: true }

describe('zod numbers', () => {
  it('basic number', () => {
    expect(mapTypeInSchema(basicNumberZod)).toEqual(basicNumberMongoose)
  })
  it('gt five', () => {
    expect(mapTypeInSchema(gtFiveZod)).toEqual(gtFiveMongoose)
  })
  it('gte five', () => {
    expect(mapTypeInSchema(gteFiveZod)).toEqual(gteFiveMongoose)
  })
  it('min five', () => {
    expect(mapTypeInSchema(minFiveZod)).toEqual(minFiveMongoose)
  })
  it('lt five', () => {
    expect(mapTypeInSchema(ltFiveZod)).toEqual(ltFiveMongoose)
  })
  it('lte five', () => {
    expect(mapTypeInSchema(lteFiveZod)).toEqual(lteFiveMongoose)
  })
  it('max five', () => {
    expect(mapTypeInSchema(maxFiveZod)).toEqual(maxFiveMongoose)
  })
  it('int number', () => {
    expect(mapTypeInSchema(intNumZod)).toEqual(intNumMongoose)
  })
  it('positive', () => {
    expect(mapTypeInSchema(positiveZod)).toEqual(positiveMongoose)
  })
  it('negative', () => {
    expect(mapTypeInSchema(negativeZod)).toEqual(negativeMongoose)
  })
  it('nonpositive', () => {
    expect(mapTypeInSchema(nonpositiveZod)).toEqual(nonpositiveMongoose)
  })
  it('nonnegative', () => {
    expect(mapTypeInSchema(nonnegativeZod)).toEqual(nonnegativeMongoose)
  })
  it('multiple of five', () => {
    expect(mapTypeInSchema(multipleOfFiveZod)).toEqual(multipleOfFiveMongoose)
  })
  it('multiple of negative five', () => {
    expect(mapTypeInSchema(multipleOfNegativeFiveZod)).toEqual(multipleOfNegativeFiveMongoose)
  })
  it('finite', () => {
    expect(mapTypeInSchema(finiteZod)).toEqual(finiteMongoose)
  })
  it('safe', () => {
    expect(mapTypeInSchema(safeZod)).toEqual(safeMongoose)
  })
  it('step point one', () => {
    expect(mapTypeInSchema(stepPointOneZod)).toEqual(stepPointOneMongoose)
  })
  it('step point zero zero zero one', () => {
    expect(mapTypeInSchema(stepPointZeroZeroZeroOneZod)).toEqual(stepPointZeroZeroZeroOneMongoose)
  })
  it('step six point four', () => {
    expect(mapTypeInSchema(stepSixPointFourZod)).toEqual(stepSixPointFourMongoose)
  })
})
