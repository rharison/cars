import { FieldInvalid } from '@helpers/error'

export type CustomError = {
  name: string
  code: number
  message: string
  fields?: string[] | FieldInvalid[]
}