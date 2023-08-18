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
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  private readonly notifier: NotifierService;
  itemForm: UntypedFormGroup;
  formsErrors = [];
  itemSub: Subscription = new Subscription();
  anadirEditar: string = 'Añadir'
  medicos: any[];
  pacientes: any[];
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
      citId: [0],
      usuId: [0],
      espId: [0],
      mesId: [0],
      citFechaAtencion: [null, Validators.required],
      citInicioAtencion: [null, Validators.required],
      citFinAtencion: [null, Validators.required],
      citEstadoPaciente: [null, Validators.required],
      citObservaciones: [null, Validators.required],
      citEstado: [true],
    });

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.cita.name;
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
    this.medicos=[]
    this.pacientes=[]
    this.medicosEspecialidad=[]
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
      this.getDataForm(user.citId);
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
    this.itemSub = this.httpService.GetDataForm(id, undefined, modules.cita.name)
      .subscribe(item => {
        this.medicos = item.data?.medicos;
        this.pacientes = item.data?.pacientes;
        this.medicosEspecialidad = item.data?.medicosEspecialidad;
        if (item.data?.data) {
          this.itemForm.patchValue(item.data?.data);
          this.itemForm.patchValue({
            citEstado:ConvertirIntBool(item.data?.data.citEstado)
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
      citEstado:ConvertirBoolInt(this.itemForm.value.citEstado)
  })
    this.itemsSub = this.httpService.PostPut(this.itemForm.value, modules.cita.name, false, undefined, this.itemForm.value.citId)
      .subscribe(data => {
        this.closeBtnClick();
        this.notifier.notify("success", "Se ha registrado los datos correctamente");
      })
  }

  delete(id:number)
  {
    let itemsDelete:any[]=[];
    itemsDelete.push(id);

    
    this.itemsSub = this.httpService.deleteItems( modules.cita.name,  undefined, itemsDelete)
    .subscribe(data => {
      this.closeBtnClick();
      this.notifier.notify("success", "El dato se ha eliminado");
    })

  }

  buscarMedico(id:number)
  {
    
    let itemsDelete:any[]=[];
    itemsDelete.push(id);
    
    this.itemsSub = this.httpService.GetByIdList( id, 0,modules.medico.name,"GetList")
    .subscribe(data => {
      this.medicos = data;
    })

  }

  

 

}

