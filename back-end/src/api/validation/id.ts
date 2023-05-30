import { validate } from 'uuid'
import { InvalidsFieldsError } from '@helpers/error'

export const MESSAGE_ERROR_INVALID_ID = 'Must be a valid UUID'

export const validateId = (id: string) => {
  const isValidUUID = validate(id)

  if(!isValidUUID) {
    throw new InvalidsFieldsError(
      [{field: 'id', message: MESSAGE_ERROR_INVALID_ID }],
      'Invalid id'
    )
  }

  return false
}