import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { ComidasRoutes } from './comidas.routing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComidasComponent } from './comidas.component';
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
    RouterModule.forChild(ComidasRoutes),
    FormsModule,
    PerfectScrollbarModule,
    FeatherModule.pick(allIcons),

  ],
  declarations: [
    ComidasComponent
  ],
  providers: [NotifierService]
})
export class ComidasModule {}
