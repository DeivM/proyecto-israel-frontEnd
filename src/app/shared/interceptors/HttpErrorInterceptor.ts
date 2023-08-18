import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import {  throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
//import { ErrorService } from "../services/ErrorService";
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor  {
  private notifier: NotifierService;
  constructor(
   // private errorService: ErrorService
   notifierService: NotifierService,
   private spinner: NgxSpinnerService
     ) 
     {
      this.notifier = notifierService;
     }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(()=>this.spinner.hide()),
      catchError(error => {
        this.spinner.hide()
        if(error.status===401)
          {
            this.notifier.notify( "error", "Usuario o contraseña incorrecta" );
        return throwError(error.error);
          }
        let errorMessage = '';
        let file=false;
        if (error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } 
        else {
          let message!:any;
          if(error?.error)
          {

            message=error?.error;
            if(message?.size)
            {
              message="No hay datos para mostrar"
              file=true;
            }
          }
         /* if(error?.error?.message)
          {
            error?.error?.message.forEach(element => {
              message += element
            });
          }*/
          
          if (error.error && error.error.errors && error.error.errors.length > 0) 
          {
            
            /*error.error.errors.forEach(item => {
              if (item.msg && item.param) {
                message += `<li><strong>${item.param}</strong> ${item.msg} </li>`;
              }
            });*/
          }
          errorMessage = `Server-side error: ${error.status} ${!file?error.message:''} ${message?.message}`;
        }
        this.notifier.notify( "error",errorMessage);
      //  this.errorService.show(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
