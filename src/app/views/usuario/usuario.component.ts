import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndexParameters } from 'src/app/shared/models/IndexParameters';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { ConvertirBoolInt, ConvertirIntBool, ConvertirPrimerLetraMuyuscula, index, modules } from 'src/app/shared/confi/confi';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from 'src/app/shared/services/respuesta.service';
import { whiteSpaceValidator } from 'src/app/shared/validators/whiteSpaceValidator';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  itemForm: UntypedFormGroup;
  formsErrors = [];
  itemSub: Subscription = new Subscription();
  anadirEditar: string = 'Añadir'
  perfil: any[];
  id:number=0;
  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private respuestaService: RespuestaService
  ) {
  }
  ngOnInit() {
    this.itemForm = this.fb.group({
      usuId: [0],
      perId: [null, Validators.required],
      usuNombres: [null, Validators.required],
      usuApellidos: [null, Validators.required],
      usuCedula: [null, Validators.required],
      usuDireccion: [null, Validators.required],
      usuTelefono: [null, Validators.required],
      usuSexo: [null, Validators.required],
      usuFechaNacimiento: [null, Validators.required],
      usuEmail: ['', [Validators.required, whiteSpaceValidator.cannotContainSpace, Validators.email]],
      usuPassword: ['', whiteSpaceValidator.cannotContainSpace],
      usuEstado: [true],
      

    });

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.usuario.name;
    this.indexParameters.actionResult = undefined;
    this.search.valueChanges.pipe(
      debounceTime(350)
    ).subscribe(value => {
      if (value && value.trim()) {
        this.indexParameters.search = value
      } else {
        this.indexParameters.search = undefined
      }
      this.getItems();
    })
    this.getItems();
    this.id=0;
    this.perfil=[]
  }
  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
    this.itemSub.unsubscribe();
  }

  getItems() {
    this.itemsSub = this.httpService.getItems(this.indexParameters)
      .subscribe(items => {
        this.items = items?.data?.elementos;
        this.indexParameters.length = items?.data?.cantidadElementos
        if (this.items && this.items.length == 0) {
          this.respuestaService.infoNohayDatosParaMostrar();
        }
      }
      );

  }

  changePagination($event: any) {
    this.indexParameters.page = $event;
    this.getItems();
  }

  openModal(targetModal: NgbModal, user: any | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (user != null) {
      this.anadirEditar = "Editar";
      this.getDataForm(user.usuId);
    }
    else {
      this.getDataForm(0);
    }


  }
  logValidationErrors(group: UntypedFormGroup) {
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  getDataForm(id: number) {
    this.itemSub = this.httpService.GetDataForm(id, undefined, modules.usuario.name)
      .subscribe(item => {
        this.perfil = item.data?.perfil;
        if (item.data?.data) {
          this.itemForm.patchValue(item.data?.data);
          this.id=item.data?.data.usuId;
          this.itemForm.patchValue({
            usuEstado: ConvertirIntBool(item.data?.data.usuEstado),
            perId:item.data?.data.perId
          })
        }
      })
  }


  onSubmit() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }
    this.itemForm.patchValue({
      usuNombres: ConvertirPrimerLetraMuyuscula(this.itemForm.value.usuNombres)
    })
    this.itemForm.patchValue({
      usuApellidos: ConvertirPrimerLetraMuyuscula(this.itemForm.value.usuApellidos)
    })
    this.itemForm.patchValue({
      usuEstado: ConvertirBoolInt(this.itemForm.value.usuEstado)
    })
    if (this.itemForm.value.usuId == 0) {

      if (this.itemForm.value.usuPassword == null || this.itemForm.value.usuPassword == "") {
        this.respuestaService.infoIngresarContrasena();
        return;
      }
    }
    this.itemsSub = this.httpService.PostPut(this.itemForm.value, modules.usuario.name, false, undefined, this.itemForm.value.usuId)
      .subscribe(data => {
        this.closeBtnClick();
        this.respuestaService.successInsert();
      })
  }

  delete(id: number) {
    let itemsDelete: any[] = [];
    itemsDelete.push(id);

    this.itemsSub = this.httpService.deleteItems(modules.usuario.name, undefined, itemsDelete)
      .subscribe(data => {
        this.closeBtnClick();
        this.respuestaService.successDatoEliminado();
      })

  }

}

