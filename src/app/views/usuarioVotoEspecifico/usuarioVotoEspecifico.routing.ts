import { Routes } from '@angular/router';
import { UsuarioVotoEspecificoComponent } from './usuarioVotoEspecifico.component';
export const UsuarioVotoEspecificoRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuario Voto Específico',
      urls: []
    },
    children: [{
      path: '',
      component:UsuarioVotoEspecificoComponent,
    }
     
  ]

    

  }
];
