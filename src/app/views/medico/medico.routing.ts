import { Routes } from '@angular/router';
import { MedicoComponent } from './medico.component';
export const MedicoRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Medico',
      urls: []
    },
    children: [{
      path: '',
      component:MedicoComponent,
    }
     
  ]

    

  }
];
