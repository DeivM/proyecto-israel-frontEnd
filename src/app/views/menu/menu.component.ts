import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndexParameters } from 'src/app/shared/models/IndexParameters';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { ConvertirBoolInt, ConvertirIntBool, ConvertirPrimerLetraMuyuscula, index, modules } from 'src/app/shared/confi/confi';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from 'src/app/shared/services/respuesta.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  itemForm: UntypedFormGroup;
  formsErrors = [];
  itemSub: Subscription = new Subscription();
  anadirEditar: string = 'Añadir'
  menuPadre: any[];
  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private respuestaService: RespuestaService
  ) {
  }
  ngOnInit() {
    this.itemForm = this.fb.group({
      menId: [0],
      menMenId: [null],
      menNombre: [null, Validators.required],
      menUrl: [null],
      menIcono: [''],
      menOrden: [null, Validators.required],
      menEstado: [true],

    });

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.menu.name;
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
    this.menuPadre=[]
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
      this.getDataForm(user.menId);
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
    this.itemSub = this.httpService.GetDataForm(id, undefined, modules.menu.name)
      .subscribe(item => {
        this.menuPadre = item.data?.menuPadre;
        if (item.data?.data) {
          this.itemForm.patchValue(item.data?.data);
          this.itemForm.patchValue({
            menEstado: ConvertirIntBool(item.data?.data.menEstado)
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
      menNombre: ConvertirPrimerLetraMuyuscula(this.itemForm.value.menNombre)
    })
    this.itemForm.patchValue({
      menEstado: ConvertirBoolInt(this.itemForm.value.menEstado)
    })
    
    this.itemsSub = this.httpService.PostPut(this.itemForm.value, modules.menu.name, false, undefined, this.itemForm.value.menId)
      .subscribe(data => {
        this.closeBtnClick();
        this.respuestaService.successInsert();
      })
  }

  delete(id: number) {
    let itemsDelete: any[] = [];
    itemsDelete.push(id);

    this.itemsSub = this.httpService.deleteItems(modules.menu.name, undefined, itemsDelete)
      .subscribe(data => {
        this.closeBtnClick();
        this.respuestaService.successDatoEliminado();
      })

  }

}

