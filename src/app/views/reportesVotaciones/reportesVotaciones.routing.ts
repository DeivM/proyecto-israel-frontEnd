import { Routes } from '@angular/router';
import { ReportesVotacionesComponent } from './reportesVotaciones.component';
export const ReportesVotacionesRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Votaciones',
      urls: []
    },
    children: [{
      path: '',
      component:ReportesVotacionesComponent,
    }
     
  ]

    

  }
];
