import { Routes } from '@angular/router';
import { SeguimientoPacienteComponent } from './seguimientoPaciente.component';
export const SeguimientoPacienteRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'SeguimientoPaciente',
      urls: []
    },
    children: [{
      path: '',
      component:SeguimientoPacienteComponent,
    }
     
  ]

    

  }
];
