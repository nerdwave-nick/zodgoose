import type { AnyZodObject } from 'zod'
import { mapTypeInSchema } from '..'

export const mapZodObject = <T extends AnyZodObject>(zodObject: T, errorOnNotSupportedType: boolean): any => {
  const output: any = {}
  const zodInputShape = zodObject.shape
  for (const key in zodInputShape) {
    const zodSchemaShapeKey = zodInputShape[key]
    output[key] = mapTypeInSchema(zodSchemaShapeKey, errorOnNotSupportedType)
  }
  return { type: output, required: true, ...zodObject._def.mongoose }
}
