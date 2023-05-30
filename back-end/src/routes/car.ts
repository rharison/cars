import { Router } from 'express'
import CarControllers from '@controllers/car'

const carRoutes = Router()

carRoutes.get('/cars', CarControllers.getAll)

carRoutes.get('/cars/:idCar', CarControllers.get)

carRoutes.post('/cars', CarControllers.create)

carRoutes.put('/cars/:idCar', CarControllers.update)

carRoutes.delete('/cars/:idCar', CarControllers.deleteCar)

export {
  carRoutes
}