import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { CatalogoSeguimientoRoutes } from './catalogoSeguimiento.routing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CatalogoSeguimientoComponent } from './catalogoSeguimiento.component';
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
    RouterModule.forChild(CatalogoSeguimientoRoutes),
    FormsModule,
    PerfectScrollbarModule,
    FeatherModule.pick(allIcons),

  ],
  declarations: [
    CatalogoSeguimientoComponent
  ],
  providers: [NotifierService]
})
export class CatalogoSeguimientoModule {}
