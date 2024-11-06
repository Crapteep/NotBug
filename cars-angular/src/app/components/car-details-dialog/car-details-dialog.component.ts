import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car, Service } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-car-details-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,   
    FormsModule,
    CommonModule
  ],
  templateUrl: './car-details-dialog.component.html',
  styleUrls: ['./car-details-dialog.component.css']
})
export class CarDetailsDialogComponent {
  car: Car;
  newServiceTitle: string = '';
  newServiceCost: number = 0;

  constructor(
    private carService: CarService,
    public dialogRef: MatDialogRef<CarDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car
  ) {
    this.car = { ...data };
  }

  addService() {
    const newService: Service = {
      part: this.newServiceTitle,
      cost: this.newServiceCost || 0,
      date: new Date()
    };

    this.car.services.push(newService);
    this.carService.updateCar(this.car);

    this.clearServiceForm();
  }

  clearServiceForm() {
    this.newServiceTitle = '';
    this.newServiceCost = 0;
  }
}
