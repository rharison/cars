export type Car = {
  id: string;
  placa: string;
  chassi: string;
  modelo: string;
  marca: string;
  ano: number;
}

export type CarBodyResponse = Car;


export type CarBodyCreate = {
  car: Omit<Car, 'id'>;
}

export type CarBodyUpdate = {
  car: Partial<Omit<Car, 'id'>>;
}
