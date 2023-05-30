import { Router } from 'express'

const carRoutes = Router()

carRoutes.get('/cars', (req, res, next) => {

})

carRoutes.get('/cars/:idCar', (req, res, next) => {

})

carRoutes.post('/cars', (req, res, next) => {

})

carRoutes.put('/cars/:idCar', (req, res, next) => {

})

carRoutes.delete('/cars/:idCar', (req, res, next) => {

})

export {
  carRoutes
}