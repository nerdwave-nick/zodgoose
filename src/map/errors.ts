import { ZodFirstPartyTypeKind } from 'zod'

export class ZodToMongooseParsingError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'ZodToMongooseParsingError'
  }
}
export class ZodToMongooseTypeNotSupportedError extends ZodToMongooseParsingError {
  constructor(type: ZodFirstPartyTypeKind, extraInfo?: string) {
    super('Type not supported: ' + type + (extraInfo ? ' - ' + extraInfo : ''))
    this.name = 'ZodToMongooseTypeNotSupportedError'
  }
}
export class ZodToMongooseTypeCombinationNotSupportedError extends ZodToMongooseParsingError {
  constructor(type: ZodFirstPartyTypeKind, extraInfo: string) {
    super(`Type ${type} not supported with given subtypes: ${extraInfo}`)
    this.name = 'ZodToMongooseTypeComnbinationNotSupportedError'
  }
}
