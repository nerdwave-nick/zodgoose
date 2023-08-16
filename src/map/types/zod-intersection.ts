import { type ZodIntersection, type ZodTypeAny, z } from 'zod'
import { mapTypeInSchema } from '..'
import { zMongoose } from '../../extension'
import { getTypeOrInnerType, isObj } from '../util'
import mongoose from 'mongoose'

const common = (a: any, b: any): any => {
  let res = {} as any
  // check for any mongoose options that are the same
  for (const key of Object.keys(a).filter((x) => x !== 'type')) {
    if (b[key] !== undefined) {
      // if the values are the same, add them to the result
      if (a[key] === b[key]) {
        res[key] = a[key]
      }
      // if the values are both boolean, set it to false because that'd be their && value
      // (basically get false because if they were the same...)
      else if (typeof a[key] === 'boolean' && typeof b[key] === 'boolean') {
        res[key] = false
      }
    }
  }
  // now get the fancy stuff. Let's check their types
  res = {
    ...res,
    type: commonFromType(a.type, b.type),
    ...(a.required && b.required ? { required: true } : { required: false }),
  }
  return res
}

const commonFromType = (a: any, b: any): any => {
  // if they're not objects, just check if they're the same type
  // if not it's gonna be mixed
  if (!isObj(a) || !isObj(b)) {
    if (a === b) {
      return a
    } else {
      return mongoose.Schema.Types.Mixed
    }
  }
  // else do a recursion boi
  const res = {} as any
  for (const key of Object.keys(a)) {
    if (b[key] !== undefined) {
      res[key] = common(a[key], b[key])
    }
  }
  return res
}

export const mapZodIntersection = <T extends ZodIntersection<ZodTypeAny, ZodTypeAny>>(
  zodIntersection: T,
  errorOnNotSupportedType: boolean
): any => {
  const left = zodIntersection._def.left
  const right = zodIntersection._def.right
  const leftType = getTypeOrInnerType(left)
  const rightType = getTypeOrInnerType(right)
  let commonMongooseOptions = {} as any
  if (left._def.mongoose && right._def.mongoose) {
    commonMongooseOptions = common(left._def.mongoose, right._def.mongoose)
  }

  if (leftType !== rightType) {
    return mapTypeInSchema(
      zMongoose(z.any(), { ...commonMongooseOptions, ...zodIntersection._def.mongoose }),
      errorOnNotSupportedType
    )
  }

  const rightMapped = mapTypeInSchema(right, errorOnNotSupportedType)
  const leftMapped = mapTypeInSchema(left, errorOnNotSupportedType)
  const res = isObj(leftMapped.type) ? common(leftMapped, rightMapped) : { ...leftMapped, ...rightMapped }

  return {
    ...res,
    ...zodIntersection._def.mongoose,
  }
}
