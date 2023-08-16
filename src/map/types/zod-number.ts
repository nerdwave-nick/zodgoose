import type { ZodNumber } from 'zod'

export const mapZodNumber = (zodNumber: ZodNumber, _errorOnNotSupportedType: boolean): any => {
  const rv = { type: Number, required: true } as any
  const checks = zodNumber._def.checks
  if (checks && checks.length) {
    for (const check of checks) {
      switch (check.kind) {
        case 'min': {
          rv.min = check.value
          if (check.inclusive === false) rv.min += Number.EPSILON
          break
        }
        case 'max': {
          rv.max = check.value
          if (check.inclusive === false) rv.max -= Number.EPSILON
          break
        }
        case 'finite': {
          rv.min = Number.MIN_VALUE
          rv.max = Number.MAX_VALUE
          break
        }
        case 'int':
          break // nothing to do in mongoose. No int checks
        case 'multipleOf':
          break // mongoose can't do this
      }
    }
  }
  const mongooseOptions = zodNumber._def.mongoose ?? {}
  return { ...rv, ...mongooseOptions }
}
