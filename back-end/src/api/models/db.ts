import { Car } from "../../types/car"

type DBInMemory = {
  cars: {
    [id: string]: Car
  }
}

export const dbInMemory: DBInMemory = {
  cars: {}
}