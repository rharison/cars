import { Car } from '@/types/car'
import CarModel from '@models/car'
import { validateDataCreateCar } from '@validation/car'
import { validateId } from '@validation/id'
import {
  NotFoundError,
} from '@helpers/error'
import { v4 as uuidV4 } from 'uuid'

export async function create(car: Car) {
  validateDataCreateCar(car)
  const id = uuidV4()
  car.id = id
  const newCar = await CarModel.create(car)

  return newCar
}

export async function get(id: string) {
  validateId(id)

  const car = await CarModel.get(id)

  if(!car) {
    throw new NotFoundError('Car not found')
  }

  return car
}

export async function getAll() {
  const cars = await CarModel.getAll()

  return cars
}

export async function update(id: string, data: Partial<Omit<Car, 'id'>>) {
  const car = await CarModel.update(id, data)

  return car
}

export async function deleteCar(id: string) {
  return await CarModel.deleteCar(id)
}


export default {
  create,
  get,
  getAll,
  update,
  deleteCar
}