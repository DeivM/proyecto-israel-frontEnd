import { Routes } from '@angular/router';
import { FichaInscripcionComponent } from './fichaInscripcion.component';
export const FichaInscripcionRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Ficha Inscripción',
      urls: []
    },
    children: [{
      path: '',
      component:FichaInscripcionComponent,
    }
     
  ]

    

  }
];
