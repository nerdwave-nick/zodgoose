import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const zSet = z.set(z.number()).min(1).max(10) // mongoose doesn't do min/max length on arrays
const zSetIndexed = zMongoose(z.set(z.object({ type: z.string() })), { index: true })

const mongooseSetCheck = { type: [Number], required: true }
const mongooseSetIndexedCheck = { type: [{ type: { type: String, required: true } }], required: true, index: true }

describe('zod set', () => {
  it('number set', () => {
    expect(mapTypeInSchema(zSet)).toEqual(mongooseSetCheck)
  })
  it('object set', () => {
    expect(mapTypeInSchema(zSetIndexed)).toEqual(mongooseSetIndexedCheck)
  })
})
