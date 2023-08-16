import type { ZodEnum } from 'zod'

export const mapZodEnum = <T extends ZodEnum<any>>(zodEnum: T, errorOnNotSupportedType: boolean): any => {
  return { type: String, enum: zodEnum._def.values, required: true, ...zodEnum._def.mongoose }
}
