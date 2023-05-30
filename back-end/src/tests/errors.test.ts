import assert from 'assert';
import {
  NotFoundError,
} from '@helpers/error'

describe('Tests creating custom error objects', () => {
  it('Must return a valid error object', () => {
    const error = new NotFoundError('Car not found');

    assert.strictEqual(error.name, 'NotFoundError');
    assert.strictEqual(error.message, 'Car not found');
    assert.strictEqual(error.code, 404);
  });
});