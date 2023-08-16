import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const minFive = zMongoose(z.string(), { index: true }).catch('minFive')
const maxFive = zMongoose(z.string().catch('maxFive'), { index: true })

const minFiveMongoose = { type: String, required: true, index: true }
const maxFiveMongoose = { type: String, required: true, index: true }
describe('zod catch (passthrough)', () => {
  it('min', () => {
    expect(mapTypeInSchema(minFive)).toEqual(minFiveMongoose)
  })
  it('max', () => {
    expect(mapTypeInSchema(maxFive)).toEqual(maxFiveMongoose)
  })
})
