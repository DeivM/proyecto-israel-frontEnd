import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ErrorHandler,  NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { VerticalNavigationComponent } from './shared/vertical-header/vertical-navigation.component';
import { VerticalSidebarComponent } from './shared/vertical-sidebar/vertical-sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { HorizontalNavigationComponent } from './shared/horizontal-header/horizontal-navigation.component';
import { HorizontalSidebarComponent } from './shared/horizontal-sidebar/horizontal-sidebar.component';


import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { HttpErrorInterceptor } from './shared/interceptors/HttpErrorInterceptor';
import { HttpAjaxInterceptor } from './shared/interceptors/http.ajax.interceptor';
import { MaskDecimalPositivoDirective } from './shared/directives/mask-decimal-positivo.directive';
import { MaskDecimalDirective } from './shared/directives/mask-decimal.directive';
import { NotifierModule, NotifierOptions, NotifierService } from 'angular-notifier';
import { ToastrModule } from 'ngx-toastr';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgxSpinnerModule } from 'ngx-spinner';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};
const customNotifierOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: 'right',
          distance: 12
      },
      vertical: {
          position: 'top',
          distance: 12,
          gap: 10
      }
  },
  theme: 'material',
  behaviour: {
      autoHide: 5000,
      onClick: false,
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
  },
  animations: {
      enabled: true,
      show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
      },
      hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
      },
      shift: {
          speed: 300,
          easing: 'ease'
      },
      overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    VerticalNavigationComponent,
    BreadcrumbComponent,
    VerticalSidebarComponent,
    HorizontalNavigationComponent,
    HorizontalSidebarComponent,
    LoginComponent,
    MaskDecimalPositivoDirective,
    MaskDecimalDirective,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FeatherModule.pick(allIcons),
    NotifierModule.withConfig(customNotifierOptions),
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,    
    },
  //  { provide: LOCALE_ID, useValue: 'es' },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    // REQUIRED IF YOU USE JWT AUTHENTICATION
   {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
   {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HttpAjaxInterceptor, multi: true },
    AuthGuard,
    NotifierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
