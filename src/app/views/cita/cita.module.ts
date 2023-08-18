import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { CitaRoutes } from './cita.routing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CitaComponent } from './cita.component';
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
    RouterModule.forChild(CitaRoutes),
    FormsModule,
    PerfectScrollbarModule,
    FeatherModule.pick(allIcons),

  ],
  declarations: [
    CitaComponent
  ],
  providers: [NotifierService]
})
export class CitaModule {}
