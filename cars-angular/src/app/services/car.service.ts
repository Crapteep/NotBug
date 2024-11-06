
import { Injectable } from '@angular/core';
import { Car, Service } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private storageKey = 'cars';

  constructor() {}

  getCars(): Car[] {
    const cars = localStorage.getItem(this.storageKey);
    return cars ? JSON.parse(cars) : [];
  }

  saveCars(cars: Car[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cars));
  }

  addCar(car: Car): void {
    const cars = this.getCars();
    car.id = Date.now();
    cars.push(car);
    this.saveCars(cars);
  }

  updateCar(updatedCar: Car): void {
    const cars = this.getCars().map(car => car.id === updatedCar.id ? updatedCar : car);
    this.saveCars(cars);
  }

  deleteCar(id: number): void {
    const cars = this.getCars().filter(car => car.id !== id);
    this.saveCars(cars);
  }
}
