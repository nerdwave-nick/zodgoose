import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const zArray = z.array(z.number()).min(1).max(10) // mongoose doesn't do min/max length on arrays
const zArrayIndexed = zMongoose(z.array(z.object({ type: z.string() })), { index: true })
const zArrayEnum = z.array(z.enum(['a', 'b']))

const mongooseArrayCheck = { type: [Number], required: true }
const mongooseArrayIndexedCheck = { type: [{ type: { type: String, required: true } }], required: true, index: true }
const mongooseArrayEnumCheck = { type: [String], required: true }

describe('zod array', () => {
  it('number array', () => {
    expect(mapTypeInSchema(zArray)).toEqual(mongooseArrayCheck)
  })
  it('object array', () => {
    expect(mapTypeInSchema(zArrayIndexed)).toEqual(mongooseArrayIndexedCheck)
  })
  it('enum array', () => {
    expect(mapTypeInSchema(zArrayEnum)).toEqual(mongooseArrayEnumCheck)
  })
})
