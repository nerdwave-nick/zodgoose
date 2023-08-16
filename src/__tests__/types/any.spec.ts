import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'
import mongoose from 'mongoose'

const zAny = z.any()
const zAnyIndexed = zMongoose(z.any(), { index: true })

const mongooseAnyCheck = { type: mongoose.Schema.Types.Mixed, required: true }
const mongooseAnyIndexedCheck = { type: mongoose.Schema.Types.Mixed, required: true, index: true }

describe('zod any', () => {
  it('basic', () => {
    expect(mapTypeInSchema(zAny)).toEqual(mongooseAnyCheck)
  })
  it('index mongoose modifier', () => {
    expect(mapTypeInSchema(zAnyIndexed)).toEqual(mongooseAnyIndexedCheck)
  })
})
