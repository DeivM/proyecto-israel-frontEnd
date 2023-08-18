import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndexParameters } from 'src/app/shared/models/IndexParameters';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import {  index, modules } from 'src/app/shared/confi/confi';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  private readonly notifier: NotifierService;
  itemForm: UntypedFormGroup;
  formsErrors = [];
  itemSub: Subscription = new Subscription();
  anadirEditar: string = 'Añadir'

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
      eveId: [0],
      eveNombre: [null, Validators.required],
      eveLugar: [null],
      eveFechaInicio: [null, Validators.required],
      eveFechaFin: [null, Validators.required],
      eveNombrePromotor: [null],
      eveIdentificacion: [null],
      eveLongitud: [null],
      eveLatitud: [null],
    });

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.evento.name;
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
      this.getDataForm(user.eveId);
    }
    else {
      this.getDataForm(0);
    }


  }
  logVevedationErrors(group: UntypedFormGroup) {
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  getDataForm(id: number) {
    this.itemSub = this.httpService.GetDataForm(id, undefined, modules.evento.name)
      .subscribe(item => {
        if (item.data?.data) {
          const data = {
            eveId: item.data?.data.eveId,
            eveNombre: item.data?.data.eveNombre,
            eveLugar: item.data?.data.eveLugar,
            eveFechaInicio: formatDate(new Date(item.data?.data.eveFechaInicio), 'yyyy-MM-dd', 'en'),
            eveFechaFin: formatDate(new Date(item.data?.data.eveFechaFin), 'yyyy-MM-dd', 'en'),
            eveNombrePromotor: item.data?.data.eveNombrePromotor,
            eveIdentificacion: item.data?.data.eveIdentificacion,
            eveLongitud: item.data?.data.eveLongitud,
            eveLatitud: item.data?.data.eveLatitud,

          }
          this.itemForm.patchValue(data);
        }
      })
  }


  onSubmit() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }
   
    this.itemsSub = this.httpService.PostPut(this.itemForm.value, modules.evento.name, false, undefined, this.itemForm.value.eveId)
      .subscribe(data => {
        this.closeBtnClick();
        this.notifier.notify("success", "Se ha registrado los datos correctamente");
      })
  }

  delete(id:number)
  {
    let itemsDelete:any[]=[];
    itemsDelete.push(id);
    
    this.itemsSub = this.httpService.deleteItems( modules.evento.name,  undefined, itemsDelete)
    .subscribe(data => {
      this.closeBtnClick();
      this.notifier.notify("success", "El dato se ha eliminado");
    })

  }

 

}

