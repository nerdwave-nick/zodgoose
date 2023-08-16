import { type ZodDiscriminatedUnion, type ZodDiscriminatedUnionOption, z } from 'zod'
import { zMongoose } from '../../extension'
import { mapTypeInSchema } from '..'

export const mapZodDiscriminatedUnion = <
  Discriminator extends string,
  Options extends ZodDiscriminatedUnionOption<Discriminator>[],
>(
  zodUnion: ZodDiscriminatedUnion<Discriminator, Options>,
  errorOnNotSupportedType: boolean
): any => {
  // extract discriminator, keep it as required by default
  const discriminator = zodUnion._def.discriminator
  const discriminatorValues = [...zodUnion._def.optionsMap.keys()]
  const discriminatorSchema = {
    [discriminator]: { type: String, enum: discriminatorValues, required: true },
  } as any
  const individualKeysBesidesDiscriminator = {} as any
  const keyCount = {} as any
  for (const option of zodUnion._def.options) {
    for (const key of Object.keys(option.shape)) {
      if (key === discriminator) {
        discriminatorSchema[discriminator] = { ...discriminatorSchema[key], ...option.shape[key]._def.mongoose }
        continue
      }
      if (individualKeysBesidesDiscriminator[key]) {
        keyCount[key] = keyCount[key] + 1
        if (individualKeysBesidesDiscriminator[key]._def.typeName !== option.shape[key]._def.typeName) {
          individualKeysBesidesDiscriminator[key] = zMongoose(z.any(), {
            ...individualKeysBesidesDiscriminator[key]._def.mongoose,
            ...option.shape[key]._def.mongoose,
          })
        }
      } else {
        keyCount[key] = 1
        individualKeysBesidesDiscriminator[key] = option.shape[key]
      }
    }
  }
  for (const key of Object.keys(individualKeysBesidesDiscriminator)) {
    if (keyCount[key] < zodUnion._def.options.length) {
      individualKeysBesidesDiscriminator[key] = zMongoose(individualKeysBesidesDiscriminator[key], {
        required: false,
      } as any)
    }
  }
  const mappedIndividualKeys = {} as any
  for (const key of Object.keys(individualKeysBesidesDiscriminator)) {
    mappedIndividualKeys[key] = mapTypeInSchema(individualKeysBesidesDiscriminator[key], errorOnNotSupportedType)
  }
  const rv = {
    ...mappedIndividualKeys,
    ...discriminatorSchema,
  }
  const mongooseOptions = zodUnion._def.mongoose ?? {}
  return { type: rv, required: true, ...mongooseOptions }
}
