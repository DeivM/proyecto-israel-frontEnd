import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { JwtAuthService } from '../services/auth/jwt-auth.service';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html'
})
export class VerticalSidebarComponent implements OnInit {
  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];
  path = '';
  user:User;
  constructor( private router: Router,
    public jwtAuth: JwtAuthService,
    private menuServise: VerticalSidebarService,
    )
     {
   // this.sidebarnavItems =this.menusService.prueba();
      this.menuServise.items.subscribe(menuItems => {
        debugger
        this.sidebarnavItems = menuItems;
        // Active menu 
        this.sidebarnavItems.filter(m => m.submenu.filter(
          (s) => {
            if (s.path === this.router.url) {
              this.path = m.title;
            }
          }
        ));
        this.addExpandClass(this.path);
      });

     /*this.menusService.GetList();
    this.menusService.menusEmitter.subscribe(menuItems => {
      
      this.sidebarnavItems = menuItems.map(m=>{
        let item:any={
          path: m.path?m.path:'',
          title: m.title,
          icon: 'Cpu',
          class: '',
          extralink: m.extralink,
          submenu: m.submenu?m.submenu:[]
        };
        return item;
      });
      
     this.sidebarnavItems.filter(m => m.submenu.filter(
        (s) => {
          if (s.path === this.router.url) {
            this.path = m.title;
          }
        }
      ));
      this.addExpandClass(this.path);
    });*/
  }
  ngOnInit(): void {
    this.user= this.jwtAuth.getUser();
    
    
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  handleNotify() {
    this.notify.emit(!this.showClass);
  }
}
