import axios from "axios";
import {
  CarBodyResponse,
  CarBodyCreate,
  CarBodyUpdate
} from "src/types/car-types";

const axiosInstance = axios.create({
  baseURL: "https://cars-control-xyc9.onrender.com",
  headers: {
    "content-type": "application/json",
  },
});

export async function getCars() {
  const { data } = await axiosInstance.get<CarBodyResponse[]>("/cars");

  return data;
}

export async function getCarById(id: string) {
  const { data } = await axiosInstance.get<CarBodyResponse>(`/cars/${id}`);

  return data;
}

export async function createCar(body: CarBodyCreate) {
  const { data } = await axiosInstance.post<CarBodyResponse>("/cars", body);

  return data;
}

export async function updateCar(id: string, body: CarBodyUpdate) {
  await axiosInstance.put(`/cars/${id}`, body);
}

export async function deleteCar(id: string) {
  await axiosInstance.delete(`/cars/${id}`);
}

export default {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
}
