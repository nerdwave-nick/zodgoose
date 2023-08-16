import type { ZodBigInt } from 'zod'

export const mapZodBigInt = (zodBigInt: ZodBigInt, _errorOnNotSupportedType: boolean): any => {
  const rv = { type: BigInt, required: true } as any
  const checks = zodBigInt._def.checks
  if (checks && checks.length) {
    for (const check of checks) {
      switch (check.kind) {
        case 'min': {
          rv.min = check.value
          if (check.inclusive === false) rv.min += BigInt(1)
          break
        }
        case 'max': {
          rv.max = check.value
          if (check.inclusive === false) rv.max -= BigInt(1)
          break
        }
        case 'multipleOf':
          break // mongoose can't do this
      }
    }
  }
  const mongooseOptions = zodBigInt._def.mongoose ?? {}
  return { ...rv, ...mongooseOptions }
}
