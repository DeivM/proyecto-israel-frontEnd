import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './vertical-sidebar.metadata';
import { ROUTES } from './vertical-menu-items';
import { JwtAuthService } from '../services/auth/jwt-auth.service';


@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMS: RouteInfo[] = ROUTES;

    items = new BehaviorSubject<RouteInfo[]>([]);

    constructor(private jwtAuth: JwtAuthService,) {
        const a=jwtAuth.getMenus()
        
        this.items = new BehaviorSubject<RouteInfo[]>(a);
    }
}
