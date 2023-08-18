import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, throwError } from "rxjs";
import { Permiso } from "../../models/Permiso";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  return: string;
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "ANDES";
  APP_MENU='MENUS';
  APP_PATHS='PATHS'
  APP_ID='ID'
   permiso:Permiso
  constructor(
    private ls: LocalStoreService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    
    
  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
  }

  public signin(usuEmail:string, usuPassword:string) {
    debugger
     return this.httpClient.post<any>(`${environment.apiURL}/Login/Login`,{usuEmail:usuEmail, usuPassword:usuPassword})
      .pipe(
        map((resultado: any) => {
          const res=resultado.data
          const user:User={nombres:res.nombres , role:res.rolId, usuarioCuenta:res.usuarioCuenta};
          this.setUserAndToken(res.access_token, user, res.menu,  res?.paths,);
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  public checkTokenIsValid() {
    return of(this.getUser())
      .pipe(
        map((profile: User) => {
          
          this.setUserAndToken(this.getJwtToken(), this.getUser(), this.getMenus(),  this.getPaths());
          return profile;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  
  }

  public signout() {
    this.setUserAndToken(null, null, [], []);;
    this.router.navigateByUrl("sessions/signin");
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }
  getMenus() {
    return this.ls.getItem(this.APP_MENU);
  }
  
  getPaths() {
    return this.ls.getItem(this.APP_PATHS);
  }
  
  


  
  setPaths(paths:any[],) {
    return this.ls.setItem(this.APP_PATHS, paths);
  }
 
  setUserAndToken(token: any, user: any, menus:any[], paths:any[]) {
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
    this.ls.setItem(this.APP_MENU, menus);

    this.ls.setItem(this.APP_PATHS, paths);
 
  }
  //permite accesos a los roles
  getPermission()
  {
   let  user= this.ls.getItem(this.APP_USER);  
   return user?.rolId
  }
  getPermissionCrud()
  {
    return this.ls.getItem(this.APP_USER);  
  }
  ValidateUrl()
  {
    this.router.navigate(['/starter']);
  }
  ValidateUrlMenu()
  {
    const pathUrl:any[]=this.getPaths();
    
  }
}
