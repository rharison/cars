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
    const { id } = req.params
    const car = await CarService.get(id)

    res.status(200).json(car)
  } catch (error: any) {
    const { code, fields, message } = error

    return res.status(code).json({
      message,
      fields
    })
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
    const { id } = req.params
    await CarService.update(id, req.body)

    res.status(200).send('Car updated')
  } catch (error: any) {
    const { code, fields, message } = error

    return res.status(code).json({
      message,
      fields
    })
  }
}

export async function deleteCar(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    await CarService.deleteCar(id)

    res.status(200).send('Car deleted')
  } catch (error: any) {
    const { code, fields, message } = error

    return res.status(code).json({
      message,
      fields
    })
  }
}


export default {
  create,
  get,
  getAll,
  update,
  deleteCar
}