import express from 'express'
import cors from 'cors'
import { env } from '@/utils/env'
import { carRoutes }  from '@routes/car'

const app = express()
const PORT = env('PORT')

app.disable('x-powered-by').disable('etag')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(carRoutes)


export function start() {
  return new Promise(resolve => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      resolve(true)
    })
  })
}