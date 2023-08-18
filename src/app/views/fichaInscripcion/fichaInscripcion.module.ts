import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { FichaInscripcionRoutes } from './fichaInscripcion.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FichaInscripcionComponent } from './fichaInscripcion.component';
import { NotifierService } from 'angular-notifier';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(FichaInscripcionRoutes),
    FormsModule,
    PerfectScrollbarModule,
    
  ],
  declarations: [
    FichaInscripcionComponent
  ],
  providers: [NotifierService]
})
export class FichaInscripcionModule {}
