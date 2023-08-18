import { Routes } from '@angular/router';
import { CitaComponent } from './cita.component';
export const CitaRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Cita',
      urls: []
    },
    children: [{
      path: '',
      component:CitaComponent,
    }
     
  ]

    

  }
];
