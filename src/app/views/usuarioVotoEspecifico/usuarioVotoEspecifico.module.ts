import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { UsuarioVotoEspecificoRoutes } from './usuarioVotoEspecifico.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UsuarioVotoEspecificoComponent } from './usuarioVotoEspecifico.component';
import { NotifierService } from 'angular-notifier';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(UsuarioVotoEspecificoRoutes),
    FormsModule,
    PerfectScrollbarModule,
    FeatherModule.pick(allIcons),
    
  ],
  declarations: [
    UsuarioVotoEspecificoComponent
  ],
  providers: [NotifierService]
})
export class UsuarioVotoEspecificoModule {}
