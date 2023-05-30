import { Car } from "@/types/car"
import { RequiredFieldsError } from "@/helpers/error"

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
}