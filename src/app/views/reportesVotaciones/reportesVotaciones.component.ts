import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndexParameters } from 'src/app/shared/models/IndexParameters';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { index, modules } from 'src/app/shared/confi/confi';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-reportesVotaciones',
  templateUrl: './reportesVotaciones.component.html',
  styleUrls: ['./reportesVotaciones.component.css']
})
export class ReportesVotacionesComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  private readonly notifier: NotifierService;

  userDetail: User | null = null;
  formsErrors = [];
  

  itemSub: Subscription = new Subscription();
  
  public get apiUrl(): string {
    return environment.apiURL+'/Resources/Imagenes/';
  }
  id: any;
  constructor(
    private httpService: HttpService,
    private notifierService: NotifierService,
    private modalService: NgbModal,

  ) {
    this.notifier = notifierService;
  }
  ngOnInit() {

    

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.fichaInscripcion.name;
    this.indexParameters.actionResult = 'GetListaVotos';
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
    this.id = setInterval(() => {
      this.getItems();; 
      }, 5000);
  }
  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
    this.itemSub.unsubscribe();
    if (this.id) {
      clearInterval(this.id);
    }
  }

  getItems() {
    this.itemsSub = this.httpService.getItems(this.indexParameters)
      .subscribe(items => {
        this.items = items?.data;
       // this.indexParameters.length = items?.data?.cantidadElementos
        if (this.items && this.items.length == 0) {
          this.notifier.notify("warning", "No hay datos para mostrar");
        }
      }
      );

  }

  changePagination($event: any) {
    //this.indexParameters.quantity=this.indexParameters.pageIndex;
    this.indexParameters.page = $event;
    this.getItems();
  }



  logValidationErrors(group: UntypedFormGroup) {
  
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }






}
