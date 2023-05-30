type DefaultErrorInput = {
  name: string
  code: number
  message: string
  fields?: string[] | FieldInvalid[]
}

type FieldInvalid = {
  field: string
  message: string
}

export class DefaultError extends Error {
  code: number
  fields?: string[] | FieldInvalid[]

  constructor ({ name, code, message, fields }: DefaultErrorInput) {
    super(message)
    this.name = name
    this.code = code
    this.fields = fields
  }
}

export class NotFoundError extends DefaultError {
  constructor (message: string) {
    super({ name: 'NotFoundError', code: 404, message })
  }
}

export class RequiredFieldsError extends DefaultError {
  constructor (fields: string[], message: string) {
    super({ name: 'RequiredFieldsError', code: 400, fields, message })
  }
}

export class InvalidsFieldsError extends DefaultError {
  constructor (fields: FieldInvalid[], message: string) {
    super({ name: 'InvalidsFieldsError', code: 400, fields, message })
  }
}
