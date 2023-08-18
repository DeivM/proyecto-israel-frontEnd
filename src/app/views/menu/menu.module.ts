import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { MenuRoutes } from './menu.routing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MenuComponent } from './menu.component';
import { NotifierService } from 'angular-notifier';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { MaskIntegerPositivoDirective } from 'src/app/shared/directives/mask-integer-positivo.directive';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    RouterModule.forChild(MenuRoutes),
    FormsModule,
    PerfectScrollbarModule,
    FeatherModule.pick(allIcons),

  ],
  declarations: [
    MenuComponent,
    MaskIntegerPositivoDirective
  ],
  providers: [NotifierService]
})
export class MenuModule {}
