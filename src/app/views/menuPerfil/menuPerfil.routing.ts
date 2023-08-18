import { Routes } from '@angular/router';
import { MenuPerfilComponent } from './menuPerfil.component';
export const MenuPerfilRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Permisos Menú',
      urls: []
    },
    children: [{
      path: '',
      component:MenuPerfilComponent,
    }
     
  ]

    

  }
];
