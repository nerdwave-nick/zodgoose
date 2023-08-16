import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const zodBoolean = z.boolean().describe('Hello, boolean!')
const zodBooleanIndex = zMongoose(z.boolean().describe('Hello, boolean indexed?!'), { index: true })

const mongooseBoolean = { type: Boolean, required: true }
const mongooseBooleanIndex = { type: Boolean, required: true, index: true }
describe('zod booleans', () => {
  it('basic boolean', () => {
    expect(mapTypeInSchema(zodBoolean)).toEqual(mongooseBoolean)
  })
  it('index boolean', () => {
    expect(mapTypeInSchema(zodBooleanIndex)).toEqual(mongooseBooleanIndex)
  })
})
