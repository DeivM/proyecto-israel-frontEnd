import { Routes } from '@angular/router';
import { ComidasComponent } from './comidas.component';
export const ComidasRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Comidas',
      urls: []
    },
    children: [{
      path: '',
      component:ComidasComponent,
    }
     
  ]

    

  }
];
