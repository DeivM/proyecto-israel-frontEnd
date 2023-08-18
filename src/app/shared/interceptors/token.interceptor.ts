import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private jwtAuth: JwtAuthService , private router: Router,
    private spinner: NgxSpinnerService) {
      
    }
  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const token =  this.jwtAuth.getJwtToken();
    let changedReq;
    changedReq = req.clone({
      headers: req.headers 
      .set('Authorization', `Bearer ${token}`)
  });
    
    return next.handle(changedReq).pipe(
      finalize(()=>this.spinner.hide()),
      catchError((err, caugth)=>
      {
        this.spinner.hide()
          if(err.status===401)
          {
          this.router.navigate(['/login'],{
           queryParams:{redirectUrl: this.router.routerState.snapshot.url},});}
      return throwError(err);
      })
  );
  }
}
