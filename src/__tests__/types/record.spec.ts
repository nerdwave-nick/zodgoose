import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const zodRecord = zMongoose(z.record(z.number().min(10)), { index: true })
const zodComplexRecord = z.record(z.object({ a: z.string().length(10), b: z.object({ c: z.number().gte(10) }) }))

const mongooseRecord = { type: Map, of: { type: Number, min: 10, required: true }, required: true, index: true }
const mongooseComplexRecord = {
  type: Map,
  of: {
    type: {
      a: {
        type: String,
        maxLength: 10,
        minLength: 10,
        required: true,
      },
      b: {
        required: true,
        type: {
          c: {
            min: 10,
            required: true,
            type: Number,
          },
        },
      },
    },
    required: true,
  },
  required: true,
}

describe('zod records', () => {
  it('simple record', () => {
    expect(mapTypeInSchema(zodRecord, false)).toEqual(mongooseRecord)
  })
  it('complex record', () => {
    expect(mapTypeInSchema(zodComplexRecord, false)).toEqual(mongooseComplexRecord)
  })
})
