
import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { modules } from './shared/confi/confi';
export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
   canActivate: [AuthGuard],
    children: [

      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },

      {
        path: modules.perfil.path,
        loadChildren: () => import('./views/perfil/perfil.module').then(m => m.PerfilModule),
      },
      {
        path: modules.usuario.path,
        loadChildren: () => import('./views/usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: modules.menu.path,
        loadChildren: () => import('./views/menu/menu.module').then(m => m.MenuModule),
      },

      {
        path: modules.menuPerfil.path,
        loadChildren: () => import('./views/menuPerfil/menuPerfil.module').then(m => m.MenuPerfilModule),
      },

      {
        path: modules.medico.path,
        loadChildren: () => import('./views/medico/medico.module').then(m => m.MedicoModule),
      },

      {
        path: modules.especialidade.path,
        loadChildren: () => import('./views/especialidade/especialidade.module').then(m => m.EspecialidadeModule),
      },
      
      {
        path: modules.medicosEspecialidade.path,
        loadChildren: () => import('./views/medicosEspecialidade/medicosEspecialidade.module').then(m => m.MedicosEspecialidadeModule),
      },
      
      {
        path: modules.catalogoSeguimiento.path,
        loadChildren: () => import('./views/catalogoSeguimiento/catalogoSeguimiento.module').then(m => m.CatalogoSeguimientoModule),
      },
      
      {
        path: modules.indiceSeguimiento.path,
        loadChildren: () => import('./views/indiceSeguimiento/indiceSeguimiento.module').then(m => m.IndiceSeguimientoModule),
      },
      
      {
        path: modules.cita.path,
        loadChildren: () => import('./views/cita/cita.module').then(m => m.CitaModule),
      },

      {
        path: modules.horario.path,
        loadChildren: () => import('./views/horario/horario.module').then(m => m.HorarioModule),
      },
      
      {
        path: modules.seguimientoPaciente.path,
        loadChildren: () => import('./views/seguimientoPaciente/seguimientoPaciente.module').then(m => m.SeguimientoPacienteModule),
      },
      
      

    ]
  },
  {
    path: '**',
    redirectTo: '/login'
   // redirectTo: '/fichaInscripcion'
    
  },
  {
   // path: 'fichaInscripcion',
    path: 'login',
    component: LoginComponent,
  },
];

