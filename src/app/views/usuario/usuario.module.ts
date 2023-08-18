import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { UsuarioRoutes } from './usuario.routing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UsuarioComponent } from './usuario.component';
import { NotifierService } from 'angular-notifier';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    RouterModule.forChild(UsuarioRoutes),
    FormsModule,
    PerfectScrollbarModule,
    FeatherModule.pick(allIcons),

  ],
  declarations: [
    UsuarioComponent
  ],
  providers: [NotifierService]
})
export class UsuarioModule {}
