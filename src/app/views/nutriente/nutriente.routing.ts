import { Routes } from '@angular/router';
import { NutrienteComponent } from './nutriente.component';
export const NutrienteRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Nutriente',
      urls: []
    },
    children: [{
      path: '',
      component:NutrienteComponent,
    }
     
  ]

    

  }
];
