import { Routes } from '@angular/router';
import { AlimentoComponent } from './alimento.component';
export const AlimentoRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Receta',
      urls: []
    },
    children: [{
      path: '',
      component:AlimentoComponent,
    }
     
  ]

    

  }
];
