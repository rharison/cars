import { Car } from "@/types/car"
import {
  RequiredFieldsError,
  InvalidsFieldsError
} from "@/helpers/error"

type MessageByField = {
  [Property in keyof Car]: string
}

export const MINIMUM_YEAR = 1886

const requiredField = [
  'placa',
  'chassi',
  'modelo',
  'marca',
  'ano'
] as const

export const messageErrorInvalidByField = {
  'placa': 'The field "placa" is invalid. Is only accepted letters and numbers and type string.',
  'chassi': 'The field "chassi" must be a string.',
  'modelo': 'The field "modelo" must be a string.',
  'marca': 'The field "marca" is invalid. Is only accepted letters and type string.',
  'ano': `The field "ano" must be a number and and must be greater than ${MINIMUM_YEAR}.`
} as MessageByField

export const validateDataCreateCar = (data: Omit<Car, 'id'>) => {
  const fieldsRequiredsNotInformed = requiredField.filter(field => !data[field])

  if(fieldsRequiredsNotInformed.length) {
    throw new RequiredFieldsError(
      fieldsRequiredsNotInformed,
      'These fields are mandatory for creating a new car'
    )
  }

  const fieldsInvalids = Object.entries(data).map(([field, value]) => {
    return validate(field as keyof Omit<Car, 'id'>, value)
  }).filter(Boolean)

  if(fieldsInvalids.length) {
    throw new InvalidsFieldsError(
      fieldsInvalids as { field: string, message: string }[],
      'These fields are invalids'
    )
  }
}

export const validate = (field: keyof Omit<Car, 'id'>, value: unknown) => {
  type ValidateFunctionType = {
    [key: string]: (value: unknown) => false | { field: string, message: string }
  }

  const validateFunctions = {
    placa: (value) => {
      const regex = /^[a-zA-Z0-9-]+$/;
      if (typeof value !== 'string' || !regex.test(value)) {
        return {
          field,
          message: messageErrorInvalidByField[field]
        }
      }

      return false
    },
    chassi: (value) => {
      if (typeof value !== 'string') {
        return {
          field,
          message: messageErrorInvalidByField[field]
        }
      }

      return false
    },
    modelo: (value) => {
      if (typeof value !== 'string') {
        return {
          field,
          message: messageErrorInvalidByField[field]
        }
      }

      return false
    },
    marca: (value) => {
      const regex = /^[a-zA-Z]+$/;
      if (typeof value !== 'string' || !regex.test(value)) {
        return {
          field,
          message: messageErrorInvalidByField[field]
        }
      }

      return false
    },
    ano: (value: unknown) => {
      if (typeof value !== 'number' || value < MINIMUM_YEAR) {
        return {
          field,
          message: messageErrorInvalidByField[field]
        }
      }

      return false
    }
  } as ValidateFunctionType

  return validateFunctions[field] && validateFunctions[field](value)
}