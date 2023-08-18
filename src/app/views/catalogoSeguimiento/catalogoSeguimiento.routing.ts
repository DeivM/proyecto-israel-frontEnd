import { Routes } from '@angular/router';
import { CatalogoSeguimientoComponent } from './catalogoSeguimiento.component';
export const CatalogoSeguimientoRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'CatalogoSeguimiento',
      urls: []
    },
    children: [{
      path: '',
      component:CatalogoSeguimientoComponent,
    }
     
  ]

    

  }
];
