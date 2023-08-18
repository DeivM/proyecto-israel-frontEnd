import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndexParameters } from 'src/app/shared/models/IndexParameters';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { ConvertirBoolInt, ConvertirIntBool, ConvertirPrimerLetraMuyuscula, index, modules } from 'src/app/shared/confi/confi';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catalogoSeguimiento',
  templateUrl: './catalogoSeguimiento.component.html',
  styleUrls: ['./catalogoSeguimiento.component.css']
})
export class CatalogoSeguimientoComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  private readonly notifier: NotifierService;
  itemForm: UntypedFormGroup;
  formsErrors = [];
  itemSub: Subscription = new Subscription();
  anadirEditar: string = 'Añadir'
  medicosEspecialidad: any[];
  constructor(
    private httpService: HttpService,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder
  ) {
    this.notifier = notifierService;
  }
  ngOnInit() {
    this.itemForm = this.fb.group({
      casId: [0],
      espId: [0],
      casNombre: [null, Validators.required],
      casEstado: [true],
    });

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.catalogoSeguimiento.name;
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
      this.medicosEspecialidad=[]
    })
    this.getItems();
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
          this.notifier.notify("warning", "No hay datos para mostrar");
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
      this.getDataForm(user.casId);
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
    this.itemSub = this.httpService.GetDataForm(id, undefined, modules.catalogoSeguimiento.name)
      .subscribe(item => {
        this.medicosEspecialidad = item.data?.medicosEspecialidad;
        if (item.data?.data) {
          this.itemForm.patchValue(item.data?.data);
          this.itemForm.patchValue({
            casEstado:ConvertirIntBool(item.data?.data.casEstado)
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
      casEstado:ConvertirBoolInt(this.itemForm.value.casEstado)
  })
    this.itemsSub = this.httpService.PostPut(this.itemForm.value, modules.catalogoSeguimiento.name, false, undefined, this.itemForm.value.casId)
      .subscribe(data => {
        this.closeBtnClick();
        this.notifier.notify("success", "Se ha registrado los datos correctamente");
      })
  }

  delete(id:number)
  {
    let itemsDelete:any[]=[];
    itemsDelete.push(id);
    
    this.itemsSub = this.httpService.deleteItems( modules.catalogoSeguimiento.name,  undefined, itemsDelete)
    .subscribe(data => {
      this.closeBtnClick();
      this.notifier.notify("success", "El dato se ha eliminado");
    })

  }

 

}

