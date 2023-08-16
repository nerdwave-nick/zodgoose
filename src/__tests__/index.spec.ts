import * as index from '../index'

describe('index exports', () => {
  it('should export mapTypeInSchema', () => {
    expect(index.mapTypeInSchema).toBeDefined()
  })
  it('should export zMongoose', () => {
    expect(index.zMongoose).toBeDefined()
  })
  it('should export mapSchema', () => {
    expect(index.mapSchema).toBeDefined()
  })
})
