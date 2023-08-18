import { Routes } from '@angular/router';
import { EspecialidadeComponent } from './especialidade.component';
export const EspecialidadeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Especialidade',
      urls: []
    },
    children: [{
      path: '',
      component:EspecialidadeComponent,
    }
     
  ]

    

  }
];
