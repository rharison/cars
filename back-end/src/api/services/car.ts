import { Car } from '../../types/car'
import CarModel from '@models/car'

export async function create(car: Car) {
  const newCar = await CarModel.create(car)

  return newCar
}

export async function get(id: string) {
  const car = await CarModel.get(id)

  if(!car) {
    throw new Error('Car not found')
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