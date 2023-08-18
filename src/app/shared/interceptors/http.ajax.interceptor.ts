import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {finalize} from 'rxjs/internal/operators';
//import { SpinnerService } from '../services/spinner.service';


@Injectable()
export class HttpAjaxInterceptor implements HttpInterceptor {
  constructor(
   // private spinnerService:SpinnerService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
 //   this.spinnerService.show();
    return next.handle(req)
    .pipe(
      finalize(() => {
    //    this.spinnerService.hide();
      })
    );
  }
}
