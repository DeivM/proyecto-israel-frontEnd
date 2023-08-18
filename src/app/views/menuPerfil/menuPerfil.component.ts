import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndexParameters } from 'src/app/shared/models/IndexParameters';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { ConvertirBoolInt, ConvertirIntBool, index, modules } from 'src/app/shared/confi/confi';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from 'src/app/shared/services/respuesta.service';

@Component({
  selector: 'app-menuPerfil',
  templateUrl: './menuPerfil.component.html',
  styleUrls: ['./menuPerfil.component.css']
})
export class MenuPerfilComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  itemForm: UntypedFormGroup;
  formsErrors = [];
  itemSub: Subscription = new Subscription();
  anadirEditar: string = 'Añadir'
  menu: any[];
  perfil: any[];
  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private respuestaService: RespuestaService
  ) {
  }
  ngOnInit() {
    this.itemForm = this.fb.group({
      mepId: [0],
      perId: [null, Validators.required],
      menId: [null, Validators.required],
      mepEstado: [true],

    });

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.menuPerfil.name;
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
    this.menu=[];
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
      this.getDataForm(user.mepId);
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
    this.itemSub = this.httpService.GetDataForm(id, undefined, modules.menuPerfil.name)
      .subscribe(item => {
        this.menu = item.data?.menu;
        this.perfil = item.data?.perfil;
        if (item.data?.data) {
          this.itemForm.patchValue(item.data?.data);
          this.itemForm.patchValue({
            mepEstado: ConvertirIntBool(item.data?.data.mepEstado)
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
      mepEstado: ConvertirBoolInt(this.itemForm.value.mepEstado)
    })
    
    this.itemsSub = this.httpService.PostPut(this.itemForm.value, modules.menuPerfil.name, false, undefined, this.itemForm.value.mepId)
      .subscribe(data => {
        this.closeBtnClick();
        this.respuestaService.successInsert();
      })
  }

  delete(id: number) {
    let itemsDelete: any[] = [];
    itemsDelete.push(id);

    this.itemsSub = this.httpService.deleteItems(modules.menuPerfil.name, undefined, itemsDelete)
      .subscribe(data => {
        this.closeBtnClick();
        this.respuestaService.successDatoEliminado();
      })

  }

}

