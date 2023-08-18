// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
 clas: string;
  extralink: boolean;
  submenu: RouteInfo[];
}
