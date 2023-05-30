import { Car } from "@/types/car"
import CarService from '@services/car'
import { NextFunction, Request, Response } from "express"

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const car = await CarService.create(req.body)

    res.status(201).json(car)
  } catch (error: any) {
    const { code, fields, message } = error

    return res.status(code).json({
      message,
      fields
    })
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const idCar = req.params.idCar
    const car = await CarService.get(idCar)

    res.status(200).json(car)
  } catch (error) {
    return next(error)
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const cars = await CarService.getAll()

    res.status(200).json(cars)
  } catch (error) {
    return next(error)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const idCar = req.params.idCar
    await CarService.update(idCar, req.body)

    res.status(200).send('Car updated')
  } catch (error) {
    return next(error)
  }
}

export async function deleteCar(req: Request, res: Response, next: NextFunction) {
  try {
    const idCar = req.params.idCar
    await CarService.deleteCar(idCar)

    res.status(200).send('Car deleted')
  } catch (error) {
    return next(error)
  }
}


export default {
  create,
  get,
  getAll,
  update,
  deleteCar
}