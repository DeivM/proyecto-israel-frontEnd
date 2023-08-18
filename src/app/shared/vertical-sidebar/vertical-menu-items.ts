import { modules } from '../confi/confi';
import { RouteInfo } from './vertical-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  
  {
    path: '',
    title: 'Administración',
    icon: 'Cpu',
    clas: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: modules.perfil.path,
        title: modules.perfil.title,
        icon: 'mdi mdi-adjust',
        clas: '',
        extralink: false,
        submenu: []
      },
      {
        path: modules.usuario.path,
        title: modules.usuario.title,
        icon: 'mdi mdi-adjust',
        clas: '',
        extralink: false,
        submenu: []
      },
      {
        path: modules.menu.path,
        title: modules.menu.title,
        icon: 'mdi mdi-adjust',
        clas: '',
        extralink: false,
        submenu: []
      },
      {
        path: modules.menuPerfil.path,
        title: modules.menuPerfil.title,
        icon: 'mdi mdi-account',
        clas: '',
        extralink: false,
        submenu: []
      },

      {
        path: '/medico',
        title: 'Medico',
        icon: 'mdi mdi-adjust',
        clas: '',
        extralink: false,
        submenu: []
      },
    ]
  },


  {
    path: '/fichaInscripcion',
    title: 'Ficha Inscripción',
    icon: 'Home',
    clas: '',
    extralink: false,
    submenu: []
  },

  
  {
    path: '',
    title: 'Reportes',
    icon: 'Cpu',
    clas: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/reportesVotaciones',
        title: 'Votaciones',
        icon: 'mdi mdi-adjust',
        clas: '',
        extralink: false,
        submenu: []
      },
   
    ]
  }
  
];
