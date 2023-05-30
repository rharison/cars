import { Car } from '@/types/car'
import CarModel from '@models/car'
import { validateDataCreateCar } from '@validation/car'
import {
  NotFoundError,
  DefaultError
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

export async function getByPlacaOrChassi(placa: string, chassi: string) {
  const car = await CarModel.getByPlacaOrChassi(placa, chassi)

  if(car) {
    throw new DefaultError({
      name: 'AlreadExists',
      message: 'Car already exists',
      code: 400
    })
  }

  return false
}


export default {
  create,
  get,
  getAll,
  update,
  deleteCar,
  getByPlacaOrChassi
}