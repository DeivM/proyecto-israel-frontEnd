import { Routes } from '@angular/router';
import { HorarioComponent } from './horario.component';
export const HorarioRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Horario',
      urls: []
    },
    children: [{
      path: '',
      component:HorarioComponent,
    }
     
  ]

    

  }
];
