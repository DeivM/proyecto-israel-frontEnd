
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Respuesta } from '../models/Respuesta';
@Injectable({
  providedIn: 'root'
})
export class RespuestaService 
{
  private readonly notifier: NotifierService;
  respuesta:Respuesta={ id :0,
     message :'',
     detalle:'',
    code :0,
     success:true}
  constructor(    private notifierService: NotifierService,)
 {
  this.notifier = notifierService;
  }
    successInsert()
       {
        this.MostrarMnesaje("success", "Se ha registrado los datos correctamente")
       }

       infoIngresarContrasena()
       {
        this.MostrarMnesaje("info", "Debe ingresar una contraseña válida")
       }

       successDatoEliminado()
       {
        this.MostrarMnesaje("success", "El dato se ha eliminado")
       }

       infoNohayDatosParaMostrar()
       {
        this.MostrarMnesaje("info", "No hay datos para mostrar")
       }

       WithPermitions()
       {
         this.respuesta.success = false;
         this.respuesta.message = "warning";
         this.respuesta.detalle="No tiene permiso para ver esta página"; 
         return  this.respuesta;
       }


      
MostrarMnesaje(tipoMensaje:string, mensaje:string)
{
  this.notifier.notify(tipoMensaje, mensaje);
}


}
