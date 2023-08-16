import { z } from 'zod'
import { mapTypeInSchema } from '../..'
import mongoose from 'mongoose'
enum Animal {
  Dog = 'Dog',
  Cat = 'Cat',
}
enum NumericAnimal {
  Dog = 0,
  Cat = 1,
}
enum MixedAnimal {
  Dog = 'Cat',
  Cat = 1,
}
const zodStringNativeEnum = z.nativeEnum(Animal)
const zodNumericNativeEnum = z.nativeEnum(NumericAnimal)
const zodMixedNativeEnum = z.nativeEnum(MixedAnimal)

const mongooseNativeStringEnum = { type: String, enum: ['Dog', 'Cat'], required: true }
const mongooseNativeNumericEnum = { type: Number, enum: [0, 1], required: true }
const mongooseNativeMixedEnum = { type: mongoose.Schema.Types.Mixed, required: true }

describe('zod native enums', () => {
  it('native string enum', () => {
    expect(mapTypeInSchema(zodStringNativeEnum)).toEqual(mongooseNativeStringEnum)
  })
  it('native numeric enum', () => {
    expect(mapTypeInSchema(zodNumericNativeEnum)).toEqual(mongooseNativeNumericEnum)
  })
  describe('native mixed enum', () => {
    it('throws by default', () => {
      expect(() => mapTypeInSchema(zodMixedNativeEnum)).toThrowError(
        'Type ZodNativeEnum not supported with given subtypes: mixed enum not supported'
      )
    })
    it('does not throw when errorOnNotSupportedType is false', () => {
      expect(mapTypeInSchema(zodMixedNativeEnum, false)).toEqual(mongooseNativeMixedEnum)
    })
  })
})
