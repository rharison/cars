import { NextFunction, Request, Response } from "express"
import { validateId } from '@validation/id'
import { validateDataCar } from '@validation/car'
import { handleErrorApi } from '@helpers/response'
import CarService from '@services/car'

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    validateId(id)

    next()
  } catch (error: any) {
    return handleErrorApi(error, res)
  }
}

export const hasCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    await CarService.get(id)

    next()
  } catch (error: any) {
    return handleErrorApi(error, res)
  }
}

export const alreadyExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { placa, chassi } = req.body.car

    await CarService.getByPlacaOrChassi(placa, chassi)

    next()
  } catch (error: any) {
    return handleErrorApi(error, res)
  }
}

export const validateBody = async (req: Request, res: Response, next: NextFunction) => {
  const { car } = req.body
  const method = req.method.toLowerCase()
  const isCreate = method === 'post'
  const operation = isCreate ? 'create' : 'update'

  if (!car) {
    return res.status(400).json({
      message: "The 'car' property is required"
    })
  }

  try {
    validateDataCar(car, operation)

    next()
  } catch (error: any) {
    return handleErrorApi(error, res)
  }
}

export default {
  isValidId,
  hasCar,
  alreadyExists,
  validateBody
}