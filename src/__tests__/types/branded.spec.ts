import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const minFive = zMongoose(z.string(), { index: true }).brand('minFive')
const maxFive = zMongoose(z.string().brand('maxFive'), { index: true })

const minFiveMongoose = { type: String, required: true, index: true }
const maxFiveMongoose = { type: String, required: true, index: true }
describe('zod branded (passthrough)', () => {
  it('min', () => {
    expect(mapTypeInSchema(minFive)).toEqual(minFiveMongoose)
  })
  it('max', () => {
    expect(mapTypeInSchema(maxFive)).toEqual(maxFiveMongoose)
  })
})
