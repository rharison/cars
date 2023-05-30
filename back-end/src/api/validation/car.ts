import { Car } from "@/types/car"
import {
  RequiredFieldsError,
  InvalidsFieldsError
} from "@/helpers/error"

const requiredField = [
  'placa',
  'chassi',
  'modelo',
  'marca',
  'ano'
] as const

export const validateDataCreateCar = (data: Omit<Car, 'id'>) => {
  const fieldsRequiredsNotInformed = requiredField.filter(field => !data[field])

  if(fieldsRequiredsNotInformed.length) {
    throw new RequiredFieldsError(
      fieldsRequiredsNotInformed,
      'These fields are mandatory for creating a new car'
    )
  }

  const fieldsInvalids = Object.entries(data).map(([field, value]) => {
    return validate(field, value)
  }).filter(Boolean)

  if(fieldsInvalids.length) {
    throw new InvalidsFieldsError(
      fieldsInvalids as { field: string, message: string }[],
      'These fields are invalids'
    )
  }
}

const validate = (field: string, value: unknown) => {
  type ValidateFunctionType = {
    [key: string]: (value: unknown) => false | { field: string, message: string }
  }

  const validateFunctions = {
    placa: () => {
      if (typeof value !== 'string') {
        return {
          field,
          message: 'The field "placa" must be a string'
        }
      }

      const regex = /^[a-zA-Z0-9-]+$/;
      if (!regex.test(value)) {
        return {
          field,
          message: 'The field "placa" is invalid. Is only accepted letters and numbers'
        }
      }

      return false
    },
    chassi: () => {
      if (typeof value !== 'string') {
        return {
          field,
          message: 'The field "chassi" must be a string'
        }
      }

      return false
    },
    modelo: () => {
      if (typeof value !== 'string') {
        return {
          field,
          message: 'The field "modelo" must be a string'
        }
      }

      return false
    },
    marca: () => {
      if (typeof value !== 'string') {
        return {
          field,
          message: 'The field "marca" must be a string'
        }
      }

      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(value)) {
        return {
          field,
          message: 'The field "marca" is invalid. Is only accepted letters'
        }
      }

      return false
    },
    ano: (value: unknown) => {
      if (typeof value !== 'number') {
        return {
          field,
          message: 'The field "ano" must be a number'
        }
      }

      return false
    }
  } as ValidateFunctionType

  return validateFunctions[field] && validateFunctions[field](value)
}