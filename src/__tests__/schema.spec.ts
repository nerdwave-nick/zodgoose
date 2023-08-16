import { z } from 'zod'
import { mapSchema, zMongoose } from '..'
import { Schema } from 'mongoose'

const getCurrentDate = () => new Date()
const zodSchema = z.object({
  name: z.string().min(3).max(255),
  age: z.number().min(0).max(150),
  email: zMongoose(z.string().email(), { index: true, unique: true }),
  password: z.string().min(8).max(255),
  tags: z
    .array(z.enum(['Creator', 'Consumer', 'Admin']))
    .min(1)
    .max(10),
  createdAt: z.date().default(getCurrentDate),
  updatedAt: z.date().default(getCurrentDate).optional(),
  deletedAt: z.date().nullable(),
})

const mongooseSchema = {
  name: { type: String, required: true, minLength: 3, maxLength: 255 },
  age: { type: Number, required: true, min: 0, max: 150 },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/, index: true, unique: true },
  password: { type: String, required: true, minLength: 8, maxLength: 255 },
  tags: { type: [String], required: true },
  createdAt: { type: Date, required: true, default: getCurrentDate },
  updatedAt: { type: Date, required: false, default: getCurrentDate },
  deletedAt: { type: Date, required: false, default: null },
}

describe('full schema', () => {
  it('mapping test', () => {
    expect(mapSchema(zodSchema)).toEqual(mongooseSchema)
  })
  it('can use mapped schema in mongoose', () => {
    expect(() => {
      new Schema(mapSchema(zodSchema))
    }).not.toThrow()
  })
})
