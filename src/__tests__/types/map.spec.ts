import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const zodMap = zMongoose(z.map(z.string(), z.number().min(10)), { index: true })
const zodComplexMap = z.map(z.string(), z.object({ a: z.string().length(10), b: z.object({ c: z.number().gte(10) }) }))

const mongooseMap = { type: Map, of: { type: Number, min: 10, required: true }, required: true, index: true }
const mongooseComplexMap = {
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

describe('zod maps', () => {
  it('simple map', () => {
    expect(mapTypeInSchema(zodMap, false)).toEqual(mongooseMap)
  })
  it('complex map', () => {
    expect(mapTypeInSchema(zodComplexMap, false)).toEqual(mongooseComplexMap)
  })
})
