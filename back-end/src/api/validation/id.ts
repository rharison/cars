import { validate } from 'uuid'
import { InvalidsFieldsError } from '@helpers/error'

export const validateId = (id: string) => {
  const isValidUUID = validate(id)

  if(!isValidUUID) {
    throw new InvalidsFieldsError(
      [{field: 'id', message: 'Invalid id' }],
      'Invalid UUID'
    )
  }

  return true
}