import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { IndiceSeguimientoRoutes } from './indiceSeguimiento.routing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IndiceSeguimientoComponent } from './indiceSeguimiento.component';
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
    RouterModule.forChild(IndiceSeguimientoRoutes),
    FormsModule,
    PerfectScrollbarModule,
    FeatherModule.pick(allIcons),

  ],
  declarations: [
    IndiceSeguimientoComponent
  ],
  providers: [NotifierService]
})
export class IndiceSeguimientoModule {}
