import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '../services/auth/jwt-auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html'
})

export class VerticalNavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
  user:User;
    empresas:any[]=[]
  empresa:any

  constructor(private translate: TranslateService,
    public jwtAuth: JwtAuthService,
    private router: Router,) {
    translate.setDefaultLang('en');
    this.user= this.jwtAuth.getUser();
  }
  ngAfterViewInit() {
  }
  changeCompanies(item: any)
  {
    this.router.navigateByUrl("/starter");
    this.empresa=item;
 
  }

}
