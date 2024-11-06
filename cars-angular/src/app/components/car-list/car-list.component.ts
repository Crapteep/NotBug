
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { CarDialogComponent } from '../car-detail/car-detail.component';
import { CarDetailsDialogComponent } from '../car-details-dialog/car-details-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  cars: Car[] = [];
  displayedColumns: string[] = ['make', 'model', 'year', 'actions'];

  constructor(private carService: CarService, private dialog: MatDialog) {
    this.cars = this.carService.getCars();
  }

  openAddCarDialog() {
    const dialogRef = this.dialog.open(CarDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carService.addCar(result);
        this.cars = this.carService.getCars();
      }
    });
  }

  openEditCarDialog(car: Car) {
    const dialogRef = this.dialog.open(CarDialogComponent, { data: car });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carService.updateCar(result);
        this.cars = this.carService.getCars();
      }
    });
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id);
    this.cars = this.carService.getCars();
  }

  openCarDetailsDialog(car: Car) {
    this.dialog.open(CarDetailsDialogComponent, { data: car });
  }
}
