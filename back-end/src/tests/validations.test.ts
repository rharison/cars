import assert from 'assert';
import { v4 as uuidV4 } from 'uuid'
import {
  validate,
  messageErrorInvalidByField,
  MINIMUM_YEAR
} from '@validation/car';
import {
  validateId,
  MESSAGE_ERROR_INVALID_ID
} from '@validation/id';
import { Car } from "@/types/car"

const INVALID_STRING_VALUE = 123;

describe('Validations individual fields', () => {
  it('Must return false when field placa is valid', () => {
    const validPlaca = 'aaa-1234';
    const result = validate('placa', validPlaca);

    assert.strictEqual(result, false);
  });

  it('Must return false when field chassi is valid', () => {
    const validChassi = '1DC KEYwb6 Kx u96945';
    const result = validate('chassi', validChassi);

    assert.strictEqual(result, false);
  });

  it('Must return false when field modelo is valid', () => {
    const validModelo = 'Uno';
    const result = validate('modelo', validModelo);

    assert.strictEqual(result, false);
  });

  it('Must return false when field marca is valid', () => {
    const validMarca = 'Fiat';
    const result = validate('marca', validMarca);

    assert.strictEqual(result, false);
  });

  it('Must return false when field ano is valid', () => {
    const validAno = 2022;
    const result = validate('ano', validAno);

    assert.strictEqual(result, false);
  });

  it('Should return correct error message when field placa is invalid', () => {
    const invalidPlacaWithSpecialCharacter = '123**';
    const invalidPlacaWithInvalidString = INVALID_STRING_VALUE;

    const resultWithSpecialCharacter = validate('placa', invalidPlacaWithSpecialCharacter);
    const resultWithInvalidString = validate('placa', invalidPlacaWithInvalidString);

    const expectedWithSpecialCharacter = getObjectWithInvalidField('placa');
    const expectedWithInvalidString = getObjectWithInvalidField('placa');

    assert.deepStrictEqual(resultWithSpecialCharacter, expectedWithSpecialCharacter);
    assert.deepStrictEqual(resultWithInvalidString, expectedWithInvalidString);
  });

  it('Should return correct error message when field chassi is invalid', () => {
    const invalidChassi = INVALID_STRING_VALUE;
    const result = validate('chassi', invalidChassi);
    const expected = getObjectWithInvalidField('chassi');

    assert.deepStrictEqual(result, expected);
  });

  it('Should return correct error message when field modelo is invalid', () => {
    const invalidModelo = INVALID_STRING_VALUE;
    const result = validate('modelo', invalidModelo);
    const expected = getObjectWithInvalidField('modelo');

    assert.deepStrictEqual(result, expected);
  });

  it('Should return correct error message when field marca is invalid', () => {
    const invalidModeloString = INVALID_STRING_VALUE;
    const invalidModeloWithNumber = 'Fiat 1';

    const resultWithNumber = validate('marca', invalidModeloWithNumber);
    const resultWithInvalidString = validate('marca', invalidModeloString);

    const expectedWithNumber = getObjectWithInvalidField('marca');
    const expectedWithInvalidString = getObjectWithInvalidField('marca');

    assert.deepStrictEqual(resultWithNumber, expectedWithNumber);
    assert.deepStrictEqual(resultWithInvalidString, expectedWithInvalidString);
  });

  it('Should return correct error message when field ano is invalid', () => {
    const invalidAno = '2023';
    const anoGreaterThanMinimumYear = MINIMUM_YEAR - 1;

    const resultWithInvalidString = validate('ano', invalidAno);
    const resultWithNumberLessThanMinimumYear = validate('ano', anoGreaterThanMinimumYear);

    const expectedWithInvalidString = getObjectWithInvalidField('ano');
    const expectedWithNumberLessThanMinimumYear = getObjectWithInvalidField('ano');

    assert.deepStrictEqual(resultWithInvalidString, expectedWithInvalidString);
    assert.deepStrictEqual(resultWithNumberLessThanMinimumYear, expectedWithNumberLessThanMinimumYear);
  });

  it('Must return false when id is valid', () => {
    const validId = uuidV4();
    const result = validateId(validId);

    assert.strictEqual(result, false);
  });

  it('Should return correct error message when id is invalid', () => {
    const invalidId = '12345aaa';

    assert.throws(() => validateId(invalidId), {
      name: 'InvalidsFieldsError',
      message: 'Invalid id',
      fields: [{ field: 'id', message: MESSAGE_ERROR_INVALID_ID }]
    });
  });
});

const getObjectWithInvalidField = (field: keyof Omit<Car, 'id'>) => {
  return {
    field,
    message: messageErrorInvalidByField[field]
  }
}