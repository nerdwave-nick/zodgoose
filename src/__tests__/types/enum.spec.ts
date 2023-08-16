import { z } from 'zod'
import { mapTypeInSchema } from '../..'

const zodEnum = z.enum(['Dog', 'Cat'])

const mongooseEnum = { type: String, enum: ['Dog', 'Cat'], required: true }

describe('zod enums', () => {
  it('string enum', () => {
    expect(mapTypeInSchema(zodEnum)).toEqual(mongooseEnum)
  })
})
