import type { ZodString } from 'zod'

export const mapZodString = (zodString: ZodString, _errorOnNotSupportedType: boolean): any => {
  const rv = { type: String, required: true } as any
  const checks = zodString._def.checks
  if (checks && checks.length) {
    for (const check of checks) {
      switch (check.kind) {
        case 'min':
          rv.minLength = check.value
          break
        case 'max':
          rv.maxLength = check.value
          break
        case 'length':
          rv.minLength = check.value
          rv.maxLength = check.value
          break
        case 'email':
          rv.match = /^\S+@\S+\.\S+$/
          break
        case 'url':
          rv.match = /^(https?):\/\/[^\s$.?#].[^\s]*$/gm
          break
        case 'emoji':
          rv.match = /[\u{1F600}-\u{1F6FF}]/u
          break
        case 'uuid':
          rv.match = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gm
          break
        case 'cuid': {
          rv.match = /^c[a-z0-9]{24}$/i
          break
        }
        case 'includes': {
          rv.match = new RegExp(check.value, 'gm')
          break
        }
        case 'cuid2':
          rv.match = /^c[a-z0-9]{24}$/i
          break
        case 'ulid':
          rv.match = /[0-7][0-9A-HJKMNP-TV-Z]{25}/gm
          break
        case 'startsWith':
          rv.match = new RegExp(`^${check.value}`)
          break
        case 'endsWith':
          rv.match = new RegExp(`${check.value}$`)
          break
        case 'regex':
          rv.match = check.regex
          break
        case 'trim':
          rv.trim = true
          break
        case 'toLowerCase':
          rv.lowercase = true
          break
        case 'toUpperCase':
          rv.uppercase = true
          break
        case 'datetime':
          rv.match = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/gm
          break
        case 'ip':
          rv.match = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/gm
          break
      }
    }
  }
  const mongooseOptions = zodString._def.mongoose ?? {}
  return { ...rv, ...mongooseOptions }
}
