import { Routes } from '@angular/router';
import { IndiceSeguimientoComponent } from './indiceSeguimiento.component';
export const IndiceSeguimientoRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'IndiceSeguimiento',
      urls: []
    },
    children: [{
      path: '',
      component:IndiceSeguimientoComponent,
    }
     
  ]

    

  }
];
