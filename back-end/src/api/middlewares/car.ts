import { NextFunction, Request, Response } from "express"
import { validateId } from '@validation/id'
import CarService from '@services/car'

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    validateId(id)

    next()
  } catch (error: any) {
    const { code, fields, message } = error

    return res.status(code).json({
      message,
      fields
    })
  }
}

export const hasCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    await CarService.get(id)

    next()
  } catch (error: any) {
    const { code, fields, message } = error

    return res.status(code).json({
      message,
      fields
    })
  }
}

export const alreadyExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { placa, chassi } = req.body

    await CarService.getByPlacaOrChassi(placa, chassi)

    next()
  } catch (error: any) {
    const { code, fields, message } = error

    return res.status(code).json({
      message,
      fields
    })
  }

}

export default {
  isValidId,
  hasCar,
  alreadyExists
}