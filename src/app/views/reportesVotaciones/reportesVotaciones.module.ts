import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { ReportesVotacionesRoutes } from './reportesVotaciones.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReportesVotacionesComponent } from './reportesVotaciones.component';
import { NotifierService } from 'angular-notifier';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(ReportesVotacionesRoutes),
    FormsModule,
    PerfectScrollbarModule,
    
  ],
  declarations: [
    ReportesVotacionesComponent
  ],
  providers: [NotifierService]
})
export class ReportesVotacionesModule {}
