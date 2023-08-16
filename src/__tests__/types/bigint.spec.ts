import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const basicBigintZod = z.bigint()
const gtFiveZod = z.bigint().gt(BigInt(5))
const gteFiveZod = z.bigint().gte(BigInt(5))
const minFiveZod = z.bigint().min(BigInt(5))
const ltFiveZod = z.bigint().lt(BigInt(5))
const lteFiveZod = z.bigint().lte(BigInt(5))
const maxFiveZod = z.bigint().max(BigInt(5))
const positiveZod = z.bigint().positive()
const negativeZod = z.bigint().negative()
const nonpositiveZod = z.bigint().nonpositive()
const nonnegativeZod = z.bigint().nonnegative()
const multipleOfFiveZod = z.bigint().multipleOf(BigInt(5))
const multipleOfNegativeFiveZod = zMongoose(z.bigint().multipleOf(BigInt(5)), { immutable: true })

const basicBigintMongoose = { type: BigInt, required: true }
const gtFiveMongoose = { type: BigInt, required: true, min: BigInt(6) }
const gteFiveMongoose = { type: BigInt, required: true, min: BigInt(5) }
const minFiveMongoose = { type: BigInt, required: true, min: BigInt(5) }
const ltFiveMongoose = { type: BigInt, required: true, max: BigInt(4) }
const lteFiveMongoose = { type: BigInt, required: true, max: BigInt(5) }
const maxFiveMongoose = { type: BigInt, required: true, max: BigInt(5) }
const positiveMongoose = { type: BigInt, required: true, min: BigInt(1) }
const negativeMongoose = { type: BigInt, required: true, max: BigInt(-1) }
const nonpositiveMongoose = { type: BigInt, required: true, max: BigInt(0) }
const nonnegativeMongoose = { type: BigInt, required: true, min: BigInt(0) }
const multipleOfFiveMongoose = { type: BigInt, required: true }
const multipleOfNegativeFiveMongoose = { type: BigInt, required: true, immutable: true }

describe('zod bigints', () => {
  it('basic bigint', () => {
    expect(mapTypeInSchema(basicBigintZod)).toEqual(basicBigintMongoose)
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
})
