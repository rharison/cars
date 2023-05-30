import { Router } from 'express'
import CarControllers from '@controllers/car'
import CarMiddlewares from '@middlewares/car'

const carRoutes = Router()

carRoutes.get(
  '/cars',
  CarControllers.getAll
)

carRoutes.get(
  '/cars/:id',
  CarMiddlewares.isValidId,
  CarControllers.get
)

carRoutes.post(
  '/cars',
  CarMiddlewares.alreadyExists,
  CarControllers.create
)

carRoutes.put(
  '/cars/:id',
  CarMiddlewares.isValidId,
  CarMiddlewares.hasCar,
  CarControllers.update
)

carRoutes.delete(
  '/cars/:id',
  CarMiddlewares.isValidId,
  CarMiddlewares.hasCar,
  CarControllers.deleteCar
)

export {
  carRoutes
}