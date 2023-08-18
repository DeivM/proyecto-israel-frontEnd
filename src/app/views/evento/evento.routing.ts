import { Routes } from '@angular/router';
import { EventoComponent } from './evento.component';
export const EventoRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Eventos',
      urls: []
    },
    children: [{
      path: '',
      component:EventoComponent,
    }
     
  ]

    

  }
];
