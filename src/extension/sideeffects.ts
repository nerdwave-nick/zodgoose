// @eslint-ignore
import * as zod from 'zod'
import { SchemaTypeOptions } from 'mongoose'

declare module 'zod' {
  interface ZodTypeDef {
    mongoose?: SchemaTypeOptions<any>
  }
}
