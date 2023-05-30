import { Car } from "../../types/car"
import { dbInMemory } from "./db";

export async function create(car: Car) {
  const newCar = dbInMemory.cars[car.id] = {
    id: car.id,
    placa: car.placa,
    chassi: car.chassi,
    modelo: car.modelo,
    marca: car.marca,
    ano: car.ano,
  }

  return newCar
}

export async function get(id: string) {
  const car = dbInMemory.cars[id]

  return car
}

export async function getAll() {
  const cars = dbInMemory.cars

  return Object.values(cars)
}

export async function update(id: string, data: Partial<Omit<Car, 'id'>>) {
  const car = dbInMemory.cars[id]

  if(!car) {
    throw new Error('Car not found')
  }

  const updatedCar = dbInMemory.cars[id] = {
    ...car,
    ...data
  }

  return updatedCar
}

export async function deleteCar(id: string) {
  const car = dbInMemory.cars[id]

  if(!car) {
    throw new Error('Car not found')
  }

  delete dbInMemory.cars[id]

  return true
}

export default {
  create,
  get,
  getAll,
  update,
  deleteCar
}