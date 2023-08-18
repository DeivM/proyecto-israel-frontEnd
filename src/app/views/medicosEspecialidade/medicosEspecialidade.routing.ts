import { Routes } from '@angular/router';
import { MedicosEspecialidadeComponent } from './medicosEspecialidade.component';
export const MedicosEspecialidadeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'MedicosEspecialidade',
      urls: []
    },
    children: [{
      path: '',
      component:MedicosEspecialidadeComponent,
    }
     
  ]

    

  }
];
