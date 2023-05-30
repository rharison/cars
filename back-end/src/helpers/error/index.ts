type DefaultErrorInput = {
  name: string
  code: number
  message: string
  fields?: string[]
}

export class DefaultError extends Error {
  code: number
  fields?: string[]

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
