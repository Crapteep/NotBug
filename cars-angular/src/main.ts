import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { CarListComponent } from './app/components/car-list/car-list.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [
  { path: '', component: CarListComponent },
];

bootstrapApplication(CarListComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule
    )
  ]
}).catch(err => console.error(err));
