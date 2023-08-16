import type { SchemaTypeOptions } from 'mongoose'
import * as zod from 'zod'

/** Exists to ensure that these keys can't be used, since omit doesn't seem to do the trick */
type DisableKeys = {
  /**  use z.optional(), otherwise zod and mongoose won't be in sync */
  required?: never
  /** use z.default(), otherwise zod and mongoose won't be in sync */
  default?: never
  /** use z.enum(), otherwise zod and mongoose won't be in sync */
  enum?: never
  /** use z.lowercase(), otherwise zod and mongoose won't be in sync */
  lowercase?: never
  /** use z.uppercase(), otherwise zod and mongoose won't be in sync */
  uppercase?: never
  /** use z.regex(), otherwise zod and mongoose won't be in sync */
  match?: never
  /** use z.length() or z.max(), otherwise zod and mongoose won't be in sync */
  maxlength?: never
  /** use z.length() or z.min(), otherwise zod and mongoose won't be in sync */
  minlength?: never
  /** use z.min(), otherwise zod and mongoose won't be in sync */
  min?: never
  /** use z.max(), otherwise zod and mongoose won't be in sync */
  max?: never
  /** use z.trim(), otherwise zod and mongoose won't be in sync */
  trim?: never
  /** use z.<whatever type you want>, otherwise zod and mongoose won't be in sync */
  type?: never
}

export const zMongoose = function <T extends zod.z.ZodTypeAny>(
  zAny: T,
  mongooseOptions: DisableKeys & SchemaTypeOptions<T['_output']>
) {
  zAny._def.mongoose = {
    ...zAny._def.mongoose,
    ...mongooseOptions,
  }
  return zAny
}
