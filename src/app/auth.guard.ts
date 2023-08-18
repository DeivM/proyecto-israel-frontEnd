import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { JwtAuthService } from './shared/services/auth/jwt-auth.service';
import { RespuestaService } from './shared/services/respuesta.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private readonly notifier: NotifierService;
  constructor(private router: Router,
    private jwtAuth: JwtAuthService,
    private respuestaService: RespuestaService,
    private notifierService: NotifierService,) 
    { 
      this.notifier = notifierService;
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      return this.checkLoginAndUrl(next.routeConfig?.path, next.routeConfig?.data?.path);
    /*if (localStorage.getItem('username') != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }*/
  }
  protected checkLoginAndUrl(path: string | null=null, path1: string | null=null) {
    
    if (!this.jwtAuth.isLoggedIn()) {
      this.router.navigate(["/login"], {
        queryParams: {
          return: null
        }
      });
    }
    else {

      if(path!=null && path!="" && path!='starter')
      {
        const pathUrl:any[]=this.jwtAuth.getPaths();
        if (!pathUrl.find(element=>element== path || element==path1)) {
          let respuesta = this.respuestaService.WithPermitions();
          this.notifier.notify(respuesta.message , respuesta.detalle );
          this.router.navigate(["/starter"], {
            queryParams: {
              return: null
            }
          })
          return false;
        }
      }
      
    }
    return true;
  }
}
