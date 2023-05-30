import { NextFunction, Request, Response } from "express"
import { handleErrorApi } from '@helpers/response'
import CarService from '@services/car'

export async function create(req: Request, res: Response) {
  try {
    const { car } = req.body
    const newCar = await CarService.create(car)

    res.status(201).json(newCar)
  } catch (error: any) {
    handleErrorApi(error, res)
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params
    const car = await CarService.get(id)

    res.status(200).json(car)
  } catch (error: any) {
    handleErrorApi(error, res)
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const cars = await CarService.getAll()

    res.status(200).json(cars)
  } catch (error: any) {
    handleErrorApi(error, res)
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { car } = req.body
    await CarService.update(id, car)

    res.status(200).send('Car updated')
  } catch (error: any) {
    handleErrorApi(error, res)
  }
}

export async function deleteCar(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    await CarService.deleteCar(id)

    res.status(200).send('Car deleted')
  } catch (error: any) {
    handleErrorApi(error, res)
  }
}


export default {
  create,
  get,
  getAll,
  update,
  deleteCar
}