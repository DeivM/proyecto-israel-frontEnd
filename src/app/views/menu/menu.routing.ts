import { Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
export const MenuRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Menu',
      urls: []
    },
    children: [{
      path: '',
      component:MenuComponent,
    }
     
  ]

    

  }
];
