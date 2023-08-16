import { z } from 'zod'
import { mapTypeInSchema, zMongoose } from '../..'

const minFive = z.string().min(5, 'min5')
const maxFive = z.string().max(5, 'max5')
const justFive = z.string().length(5)
const nonempty = z.string().min(1, 'nonempty')
const includes = z.string().includes('includes')
const includesFromIndex2 = z.string().includes('includes', { position: 2 })
const startsWith = z.string().startsWith('startsWith')
const endsWith = z.string().endsWith('endsWith')
const lowercase = z.string().toLowerCase()
const uppercase = z.string().toUpperCase()
const regex = z.string().regex(/'asdf'/gm)
const trim = z.string().trim()
const email = z.string().email()
const url = z.string().url()
const emoji = z.string().emoji()
const uuid = z.string().uuid()
const cuid = z.string().cuid()
const cuid2 = z.string().cuid2()
const ulid = z.string().ulid()
const datetime = z.string().datetime()
const ip = zMongoose(z.string().ip(), { immutable: true })
// only matches the last regex. Also: don't do this. Email + ip means nothing matches
const mix = z.string().email().ip().min(10).max(14).trim().toLowerCase()

const minFiveMongoose = { type: String, required: true, minLength: 5 }
const maxFiveMongoose = { type: String, required: true, maxLength: 5 }
const justFiveMongoose = { type: String, required: true, minLength: 5, maxLength: 5 }
const nonemptyMongoose = { type: String, required: true, minLength: 1 }
const includesMongoose = { type: String, required: true, match: /includes/gm }
const includesFromIndex2Mongoose = { type: String, required: true, match: /includes/gm }
const startsWithMongoose = { type: String, required: true, match: /^startsWith/ }
const endsWithMongoose = { type: String, required: true, match: /endsWith$/ }
const lowercaseMongoose = { type: String, required: true, lowercase: true }
const uppercaseMongoose = { type: String, required: true, uppercase: true }
const regexMongoose = { type: String, required: true, match: /'asdf'/gm }
const trimMongoose = { type: String, required: true, trim: true }
const emailMongoose = { type: String, required: true, match: /^\S+@\S+\.\S+$/ }
const urlMongoose = { type: String, required: true, match: /^(https?):\/\/[^\s$.?#].[^\s]*$/gm }
const emojiMongoose = { type: String, required: true, match: /[\u{1F600}-\u{1F6FF}]/u }
const uuidMongoose = {
  type: String,
  required: true,
  match: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gm,
}
const cuidMongoose = { type: String, required: true, match: /^c[a-z0-9]{24}$/i }
const cuid2Mongoose = { type: String, required: true, match: /^c[a-z0-9]{24}$/i }
const ulidMongoose = { type: String, required: true, match: /[0-7][0-9A-HJKMNP-TV-Z]{25}/gm }
const dateTimeMongoose = { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/gm }
const ipMongoose = { type: String, required: true, match: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/gm, immutable: true }
const mixMongoose = {
  type: String,
  required: true,
  match: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/gm,
  minLength: 10,
  maxLength: 14,
  trim: true,
  lowercase: true,
}

describe('zod strings', () => {
  it('min', () => {
    expect(mapTypeInSchema(minFive)).toEqual(minFiveMongoose)
  })
  it('max', () => {
    expect(mapTypeInSchema(maxFive)).toEqual(maxFiveMongoose)
  })
  it('just', () => {
    expect(mapTypeInSchema(justFive)).toEqual(justFiveMongoose)
  })
  it('nonempty', () => {
    expect(mapTypeInSchema(nonempty)).toEqual(nonemptyMongoose)
  })
  it('includes', () => {
    expect(mapTypeInSchema(includes)).toEqual(includesMongoose)
  })
  it('includesFromIndex2', () => {
    expect(mapTypeInSchema(includesFromIndex2)).toEqual(includesFromIndex2Mongoose)
  })
  it('startsWith', () => {
    expect(mapTypeInSchema(startsWith)).toEqual(startsWithMongoose)
  })
  it('endsWith', () => {
    expect(mapTypeInSchema(endsWith)).toEqual(endsWithMongoose)
  })
  it('lowercase', () => {
    expect(mapTypeInSchema(lowercase)).toEqual(lowercaseMongoose)
  })
  it('uppercase', () => {
    expect(mapTypeInSchema(uppercase)).toEqual(uppercaseMongoose)
  })
  it('regex', () => {
    expect(mapTypeInSchema(regex)).toEqual(regexMongoose)
  })
  it('trim', () => {
    expect(mapTypeInSchema(trim)).toEqual(trimMongoose)
  })
  it('email', () => {
    expect(mapTypeInSchema(email)).toEqual(emailMongoose)
  })
  it('url', () => {
    expect(mapTypeInSchema(url)).toEqual(urlMongoose)
  })
  it('emoji', () => {
    expect(mapTypeInSchema(emoji)).toEqual(emojiMongoose)
  })
  it('uuid', () => {
    expect(mapTypeInSchema(uuid)).toEqual(uuidMongoose)
  })
  it('cuid', () => {
    expect(mapTypeInSchema(cuid)).toEqual(cuidMongoose)
  })
  it('cuid2', () => {
    expect(mapTypeInSchema(cuid2)).toEqual(cuid2Mongoose)
  })
  it('ulid', () => {
    expect(mapTypeInSchema(ulid)).toEqual(ulidMongoose)
  })
  it('dateTime', () => {
    expect(mapTypeInSchema(datetime)).toEqual(dateTimeMongoose)
  })
  it('ip', () => {
    expect(mapTypeInSchema(ip)).toEqual(ipMongoose)
  })
  it('mix', () => {
    expect(mapTypeInSchema(mix)).toEqual(mixMongoose)
  })
})
