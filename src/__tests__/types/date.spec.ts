import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const benchmarkDate = new Date(2022, 10, 5)

const zMaxCheck = z.date().max(benchmarkDate)
const zMinCheck = zMongoose(z.date().min(benchmarkDate), { expires: 6000 })

const mongooseMaxCheck = { type: Date, max: benchmarkDate, required: true }
const mongooseMinCheck = { type: Date, min: benchmarkDate, expires: 6000, required: true }

describe('zod date', () => {
  it('min', () => {
    expect(mapTypeInSchema(zMinCheck)).toEqual(mongooseMinCheck)
  })
  it('max', () => {
    expect(mapTypeInSchema(zMaxCheck)).toEqual(mongooseMaxCheck)
  })
})
