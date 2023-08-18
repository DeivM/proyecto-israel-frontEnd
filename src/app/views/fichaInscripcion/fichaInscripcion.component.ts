import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndexParameters } from 'src/app/shared/models/IndexParameters';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { ConvertirMuyuscula, ConvertirPrimerLetraMuyuscula, index, modules } from 'src/app/shared/confi/confi';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user.model';
import { Hobbies } from 'src/app/shared/models/Hobbies';
import { Motivaciones } from 'src/app/shared/models/Motivaciones';
import { ImagenFichaInscripcion } from 'src/app/shared/models/ImagenFichaInscripcion';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
//import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-fichaInscripcion',
  templateUrl: './fichaInscripcion.component.html',
  styleUrls: ['./fichaInscripcion.component.css']
})
export class FichaInscripcionComponent implements OnInit, OnDestroy {
  indexParameters = new IndexParameters();
  itemsSub: Subscription = new Subscription();
  items: any[] = []
  search = new UntypedFormControl('', []);
  private readonly notifier: NotifierService;
  itemForm: UntypedFormGroup;
  userDetail: User | null = null;
  formsErrors = [];
  itemHobbies: any = {
    hobId: 0,
    fiiId: 0,
    hobDescripcion: null
  };

  itemMotivaciones: any = {
    motId: 0,
    fiiId: 0,
    motDescripcion: null
  };

  itemFichaInscripcion: any = {
    ifiId: 0,
    fiiId: 0,
    ifiUrl: null,
    ifiTipo: 0,
    ifiPrincipal: false
  };

  carreras: any[];
  evento: any[];
  itemSub: Subscription = new Subscription();
  hobbiesDelete: any = []=[];
  motivacionesDelete: any = []=[];
  imagenFichaInscripcionDelete: any = []=[];
  anadirEditar: string = 'Añadir'
  public get apiUrl(): string {
    return environment.apiURL+'/Resources/Imagenes/';
  }
  constructor(
    private httpService: HttpService,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    //private datePipe: DatePipe
  ) {
    this.notifier = notifierService;
  }
  ngOnInit() {
    this.hobbiesDelete =[];
    this.motivacionesDelete=[];
    this.imagenFichaInscripcionDelete=[];
    this.itemForm = this.fb.group({
      fiiId: [0],
      eveId: [null, Validators.required],
      carId: [null, Validators.required],
      fiiNombres: ['', Validators.required],
      fiiApellidos: ['', Validators.required],
      fiiIdentificacion: ['', Validators.required],
      fiiTelefono: ['', Validators.required],
      fiiEmail: ['', Validators.required],
      fiiFechaNacimiento: ['', Validators.required],
      fiiUrlYoutube: [''],
      fiiUrlInstagram: [''],
      fiiUrlFacebook: [''],
      fiiUrlTiktok: [''],
      hobbies: this.fb.array([]),
      imagenFichaInscripcion: this.fb.array([]),
      motivaciones: this.fb.array([]),
      hobbiesDelete: [null],
      motivacionesDelete: [null],
      imagenFichaInscripcionDelete: [null]
    });

    this.indexParameters.length = index.count;
    this.indexParameters.pageSize = index.quantity;
    this.indexParameters.quantity = index.quantity;
    this.indexParameters.pageIndex = index.page;
    this.indexParameters.modulo = modules.fichaInscripcion.name;
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
    //this.indexParameters.quantity=this.indexParameters.pageIndex;
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
      this.getDataForm(user.fiiId);
      /*this.userDetail = user;
      this.itemForm?.patchValue({
          Name: user.nombres,
          Position: user.nombres,
          Email: user.nombres,
          Mobile: user.nombres,
          DateOfJoining: user.nombres,
          Salary: user.nombres,
          Projects: user.nombres,
      });*/
    }
    else {
      this.getDataForm(0);
    }


  }

  logValidationErrors(group: UntypedFormGroup) {
    // Object.keys(group.controls).forEach((key: string) => {
    //     const ac = group.get(key);

    //     this.formsErrors[key] = '';
    //     if (ac && !ac.valid && (ac.touched || ac.dirty)) {
    //         const message = this.ValidationMessage[key];
    //         for (const errorKey in ac.errors) {
    //             if (errorKey) {
    //                 this.formsErrors[key] += message[errorKey] + '    ';
    //             }
    //         }
    //     }
    //     if (ac instanceof FormGroup) {
    //         this.logValidationErrors(ac)
    //     }
    // })
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  get hobbiesArray(): UntypedFormArray {
    return this.itemForm.get("hobbies") as UntypedFormArray;
  }

  get imagenFichaInscripcionArray(): UntypedFormArray {
    return this.itemForm.get("imagenFichaInscripcion") as UntypedFormArray;
  }

  get motivacionesArray(): UntypedFormArray {
    return this.itemForm.get("motivaciones") as UntypedFormArray;
  }


  addHobbies(item: any) {
    this.hobbiesArray.push(
      this.fb.group({
        hobId: [item.hobId || 0],
        fiiId: [item.fiiId],
        hobDescripcion: [item.hobDescripcion || null, Validators.required],
      })
    );
  }

  addImagenFichaInscripcion(item: any) {
    this.imagenFichaInscripcionArray.push(
      this.fb.group({
        ifiId: [item.ifiId || 0],
        fiiId: [item.fiiId],
        ifiUrl: [item.ifiUrl],
        ifiTipo: [item.ifiTipo],
        ifiPrincipal: [item.ifiPrincipal],
        imagen: [],
        url:[],
        nuevo:[],
        indexImagen:[]
        // selectedImage: [item.selectedImage]
      })
    );
  }

  addMotivaciones(item: any) {
    this.motivacionesArray.push(
      this.fb.group({
        motId: [item.motId || 0],
        fiiId: [item.fiiId || 0],
        motDescripcion: [item.motDescripcion || null, Validators.required],

      })
    );
  }

  deleteHobbies(i: number) {
    let id = this.hobbiesArray.controls[i].value.hobId
    if (id > 0) {
      this.hobbiesDelete.push(id);
    }
    this.hobbiesArray.removeAt(i);
  }

  deleteMotivaciones(i: number) {
    let id = this.motivacionesArray.controls[i].value.motId
    if (id > 0) {
      this.motivacionesDelete.push(id);
    }
    this.motivacionesArray.removeAt(i);
  }

  deleteFichaInscricion(i: number) {
    let id = this.imagenFichaInscripcionArray.controls[i].value.ifiId
    if (id > 0) {
      this.imagenFichaInscripcionDelete.push(id);
    }
    this.imagenFichaInscripcionArray.removeAt(i);
  }


  getDataForm(id: number) {
    this.itemSub = this.httpService.GetDataForm(id, undefined, modules.fichaInscripcion.name)
      .subscribe(item => {
        this.carreras = item?.data?.carreras;
        this.evento = item?.data?.evento;
        if (item.data?.data) {
          debugger
          const data = {
            fiiId: item.data?.data.fiiId,
            carId: item.data?.data.carId,
            eveId: item.data?.data.eveId,
            fiiNombres: item.data?.data.fiiNombres,
            fiiApellidos: item.data?.data.fiiApellidos,
            fiiIdentificacion: item.data?.data.fiiIdentificacion,
            fiiTelefono: item.data?.data.fiiTelefono,
            fiiEmail: item.data?.data.fiiEmail,
            fiiFechaNacimiento: formatDate(new Date(item.data?.data.fiiFechaNacimiento), 'yyyy-MM-dd', 'en'),
        
            /* this.datePipe.
            transform(new Date(item.data?.data.fiiFechaNacimiento), 'yyyy-MM-dd') ,*/
            fiiUrlYoutube: item.data?.data.fiiUrlYoutube,
            fiiUrlInstagram: item.data?.data.fiiUrlInstagram,
            fiiUrlFacebook: item.data?.data.fiiUrlFacebook,
            fiiUrlTiktok: item.data?.data.fiiUrlTiktok,
          }
          this.itemForm.patchValue(data);
          if (item.data?.data.hobbies) {
            let hobbies: Hobbies[] = item.data?.data?.hobbies;
            hobbies.forEach(i => {
              this.addHobbies(i);
            });
          }

          if (item.data?.data.motivaciones) {
            let motivaciones: Motivaciones[] = item.data?.data?.motivaciones;
            motivaciones.forEach(i => {
              this.addMotivaciones(i);
            });
          }

          if (item.data?.data.imagenFichaInscripcion) {
            let imagenFichaInscripcion: ImagenFichaInscripcion[] = item.data?.data?.imagenFichaInscripcion;
            imagenFichaInscripcion.forEach(i => {
              this.addImagenFichaInscripcion(i);
            });
          }


        }
      })
  }


  onSubmit() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }
    this.itemForm.patchValue({
      fiiNombres:ConvertirPrimerLetraMuyuscula(this.itemForm.value.fiiNombres),
      fiiApellidos:ConvertirMuyuscula(this.itemForm.value.fiiApellidos),
      hobbiesDelete: this.hobbiesDelete,
      motivacionesDelete: this.motivacionesDelete,
      imagenFichaInscripcionDelete: this.imagenFichaInscripcionDelete,
    })
    let ima: ImagenFichaInscripcion[] = this.itemForm.value.imagenFichaInscripcion;
    let form_data = new FormData();
    ima.forEach((file) => { form_data.append('files', file.imagen); });

    for (var key in this.itemForm.value) {

      if (key == 'hobbiesDelete' && this.itemForm.value[key].length>0) {
        form_data.append('stringHobbiesDelete', JSON.stringify(this.itemForm.value[key]));
      }
else if (key == 'motivacionesDelete' && this.itemForm.value[key].length>0) {
        form_data.append('stringMotivacionesDelete', JSON.stringify(this.itemForm.value[key]));
      }

      
      else if (key == 'imagenFichaInscripcionDelete' && this.itemForm.value[key].length>0) {
        form_data.append('stringImagenFichaInscripcionDelete', JSON.stringify(this.itemForm.value[key]));
      }

    else  if (key == 'hobbies') {
        form_data.append('stringBobbies', JSON.stringify(this.itemForm.value[key]));
      }
      else if (key == 'imagenFichaInscripcion') {
        form_data.append('stringImagenFichaInscripcion', JSON.stringify(this.itemForm.value[key]));
      }
      else if (key == 'motivaciones') {
        form_data.append('stringMotivaciones', JSON.stringify(this.itemForm.value[key]));
      }
      else  
      {
        form_data.append(key, this.itemForm.value[key]);
      }


    }


    this.itemsSub = this.httpService.PostPut(form_data, modules.fichaInscripcion.name, false, undefined, 0)
      .subscribe(data => {
        this.closeBtnClick();
        this.notifier.notify("success", "Se ha registrado los datos correctamente");
        //this.router.navigate(['/piky']);
      })
  }

  preview(files: any, i: number) {
    const fi = files[0]

    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);



    reader.onload = (_event) => {
      this.imagenFichaInscripcionArray.at(i).patchValue(
        {
          url:reader.result,
          imagen: fi,
          nuevo:true,
          indexImagen:i
        });
      /*const itemFichaInscripcion: any={
         ifiId:0,
         fiiId :0,
         ifiUrl:null,
        ifiTipo:0,
        selectedImage :this.selectedImage
        };
       this.addImagenFichaInscripcion(itemFichaInscripcion);*/
    };
  }
  delete(id:number)
  {
    let itemsDelete:any[]=[];
    itemsDelete.push(id);
    
    this.itemsSub = this.httpService.deleteItems( modules.fichaInscripcion.name,  undefined, itemsDelete)
    .subscribe(data => {
      this.closeBtnClick();
      this.notifier.notify("success", "El dato se ha eliminado");
    })

  }

}
