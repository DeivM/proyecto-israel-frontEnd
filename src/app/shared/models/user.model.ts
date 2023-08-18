export interface User {
  id?: string;
  usuarioCuenta?: string;
  nombres?: string;
  role?: string;
  permiso?:boolean;
  rolId?:number;
  crear ?:boolean;
  actualizar?:boolean;
  subirArchivo ?:boolean;
}