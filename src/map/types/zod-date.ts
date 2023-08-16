import type { ZodDate } from 'zod'

export const mapZodDate = (zodDate: ZodDate, _errorOnNotSupportedType: boolean): any => {
  const rv = { type: Date, required: true } as any
  const checks = zodDate._def.checks
  if (checks && checks.length) {
    for (const check of checks) {
      switch (check.kind) {
        case 'min': {
          rv.min = new Date(check.value)
          break
        }
        case 'max': {
          rv.max = new Date(check.value)
          break
        }
      }
    }
  }
  const mongooseOptions = zodDate._def.mongoose ?? {}
  return { ...rv, ...mongooseOptions }
}
