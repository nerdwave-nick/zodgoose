import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const minFive = zMongoose(z.string(), { index: true }).refine((x) => x.length > 5)
const maxFive = zMongoose(
  z.string().refine((x) => x.length > 5),
  { index: true }
)

const minFiveMongoose = { type: String, required: true, index: true }
const maxFiveMongoose = { type: String, required: true, index: true }
describe('zod effects (passthrough)', () => {
  it('min', () => {
    expect(mapTypeInSchema(minFive)).toEqual(minFiveMongoose)
  })
  it('max', () => {
    expect(mapTypeInSchema(maxFive)).toEqual(maxFiveMongoose)
  })
})
