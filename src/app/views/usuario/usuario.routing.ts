import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
export const UsuarioRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuario',
      urls: []
    },
    children: [{
      path: '',
      component:UsuarioComponent,
    }
     
  ]

    

  }
];
