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
  selector: 'app-seguimientoPaciente',
  templateUrl: './seguimientoPaciente.component.html',
  styleUrls: ['./seguimientoPaciente.component.css']
})
export class SeguimientoPacienteComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  private readonly notifier: NotifierService;
  itemForm: UntypedFormGroup;
  formsErrors = [];
  itemSub: Subscription = new Subscription();
  anadirEditar: string = 'Añadir'
  preguntas: any[];

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
      sepId: [0],
      sepObservacion: [null, Validators.required],
      sepFinalizar: [null, Validators.required],
    });

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.seguimientoPaciente.name;
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
    this.preguntas=[]
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
      this.getDataForm(user.sepId);
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
    this.itemSub = this.httpService.GetDataForm(id, undefined, modules.seguimientoPaciente.name)
      .subscribe(item => {
        this.preguntas = item.data?.preguntas;
        if (item.data?.data) {
          this.itemForm.patchValue(item.data?.data);
        }
      })
  }


  onSubmit() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }
    this.itemsSub = this.httpService.PostPut(this.itemForm.value, modules.seguimientoPaciente.name, false, undefined, this.itemForm.value.sepId)
      .subscribe(data => {
        this.closeBtnClick();
        this.notifier.notify("success", "Se ha registrado los datos correctamente");
      })
  }

  delete(id:number)
  {
    let itemsDelete:any[]=[];
    itemsDelete.push(id);
    
    this.itemsSub = this.httpService.deleteItems( modules.seguimientoPaciente.name,  undefined, itemsDelete)
    .subscribe(data => {
      this.closeBtnClick();
      this.notifier.notify("success", "El dato se ha eliminado");
    })

  }

  buscarPreguntas(id:number)
  {
    
    let itemsDelete:any[]=[];
    itemsDelete.push(id);
    
    this.itemsSub = this.httpService.GetByIdList( id, 0,modules.catalogoSeguimiento.name,"GetList")
    .subscribe(data => {
      this.preguntas = data;
    })

  }

 

}

