export type Car = {
  id: string;
  placa: string;
  chassi: string;
  modelo: string;
  ano: number;
}

export type CarBodyResponse = {
  car: Car;
}

export type CarBodyCreate = {
  car: Omit<Car, 'id'>;
}

export type CarBodyUpdate = {
  car: Partial<Omit<Car, 'id'>>;
}
