import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
export const PerfilRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Perfil',
      urls: []
    },
    children: [{
      path: '',
      component:PerfilComponent,
    }
     
  ]

    

  }
];
