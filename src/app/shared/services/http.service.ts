import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subscription } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  general: any;
  moduleSubscription: Subscription = new Subscription();
  actionLecturaSubscription: Subscription = new Subscription();
  queryParams = null;
  get apiUrl(): string {
    return environment.apiURL;
  }
  constructor(
    private httpClient: HttpClient
  ) {

  }

  //obtiene todos los datos
  getItems(parameters: any): Observable<any> {
    this.general = parameters;
    let params = new HttpParams();
    params = this.general?.id ? params.append('id', this.general?.id) : params;
    params = this.general?.id1 ? params.append('id1', this.general?.id1) : params;
    params = this.general?.id2 ? params.append('id2', this.general?.id2) : params;
    params = this.general?.id3 ? params.append('id3', this.general?.id3) : params;
    if (!this.general?.notFilter) {
      params = this.general.quantity ? params.append('quantity', this.general.quantity) : params;
      params = (this.general.page != null && this.general.page != undefined) ? params.append('page', this.general.page) : params;
      params = (this.general.search && this.general.search.length > 0) ? params.append('search', this.general.search) : params;
      params = this.general.orderBy ? params.append('orderby', this.general.orderBy) : params;
      params = this.general.orderType ? params.append('ascdesc', (this.general.orderType == 'asc' ? 'ascending' : 'descending')) : params;
      params = this.general.filtros ? params.append('filtrosJSON', JSON.stringify(this.general.filtros)) : params;
    }
    
    params = this.general.parameters ? params.append('parameters', JSON.stringify(this.general.parameters)) : params;
    if (this.general?.actionResult) {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + this.general?.modulo}/${this.general?.actionResult}`, { params });
    } else {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + this.general?.modulo}/`, { params });
    }
  }



  //lista los datos id y nombre de acion 
  GetByIdList(id:any = undefined, id1:any = undefined, module:any = undefined, actionResult:any = undefined): Observable<any> {
    
    let params = new HttpParams();
    if (id && actionResult) {
      params = id ? params.append('id', id) : params;
      params = id1 ? params.append('id1', id1) : params;
      return this.httpClient.get<any>(`${this.apiUrl + "/" + module + "/" + actionResult}`, { params });
    }
    else if (id && !actionResult) {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + module}/${id}`);
    }
    else if (!id && actionResult) {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + module + "/" + actionResult}`);
    }
    return this.httpClient.get<any>(`${this.apiUrl + "/" + module}`);
  }
  //lista los datos del formulario
  GetDataForm(id:any = undefined, id1:any = undefined, module:any = undefined, actionResult:any = undefined) : Observable<any>{
    let params = new HttpParams();
    params = id ? params.append('id', id) : params;
    params = id1 ? params.append('id1', id1) : params;
    if (id && !id1 && !actionResult) {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + module + "/GetData"}?id=${id}`);
    }
    else if (id && !id1 && actionResult) {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + module + "/" + actionResult}?id=${id}`);
    }
    else if (id && id1 && !actionResult) {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + module + "/GetData"}/`, { params });
    }
    else if (id && id1 && actionResult) {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + module + "/" + actionResult}/`, { params });
    }
    else if (!id && actionResult) {
      return this.httpClient.get<any>(`${this.apiUrl + "/" + module + "/" + actionResult}`);
    }
    return this.httpClient.get<any>(`${this.apiUrl + "/" + module + "/GetData"}`);
  }
  downLaodFile(parameters:any):Observable<Blob | any> 
  {
    this.general = parameters;
    let params = new HttpParams();
    params = this.general?.id ? params.append('id', this.general?.id) : params;
    params = this.general?.id1 ? params.append('id1', this.general?.id1) : params;
    params = this.general?.id2 ? params.append('id2', this.general?.id2) : params;
    params = this.general.parameters ? params.append('parameters', JSON.stringify(this.general.parameters)) : params;
    if (this.general?.actionResult) {
      return this.httpClient.get(`${this.apiUrl + "/" + this.general?.modulo}/${this.general?.actionResult}`, { params, responseType: 'blob' })
      .pipe(
        map((res: any) => {
          return res
        }),
        catchError((error) => {
          
          return throwError(error);
        })
        );
    } else {
      return this.httpClient.get(`${this.apiUrl + "/" + this.general?.modulo}/`, { params, responseType: 'blob' })
      .pipe(
        map((res: any) => {
          return res
        }),
        catchError((error) => {
          return throwError(error);
        })
        );
    }
  }

  PostPut(data:any, general:any, formData = false, actionResult:any = undefined, id:any=undefined):Observable<any>
   {
    
    let urlPost = '';
    if (actionResult) {
      urlPost = general + '/' + actionResult;
    }
    else {
      urlPost = general
    }
if(!id)
{
    if (formData) {
      var form_data = new FormData();
      for (var key in data) {
        form_data.append(key, data[key]);
      }
      return this.httpClient.post(`${this.apiUrl + "/" + urlPost}`, form_data)
      .pipe(
        map((response:any)=>response));;
    } else {
      return this.httpClient.post(`${this.apiUrl + "/" + urlPost}`,data    )
      .pipe(
        map((response:any)=>response));;

    }
  }
else
{
  if (formData)
   {
    var form_data = new FormData();
    for (var key in data) 
    {
      form_data.append(key, data[key]);
    }
    return this.httpClient.put(`${this.apiUrl + "/" + urlPost}?id=${id}`, form_data)
    .pipe(
      map((response:any)=>response));;
  } 
  else
   {
    return this.httpClient.put(`${this.apiUrl + "/" + urlPost}?id=${id}`, data)
    .pipe(
      map((response:any)=>response));
  }
}
  }

  putItem(id:number, data:any, general:any, formData = false) {

    if (formData) {
      var form_data = new FormData();
      for (var key in data) {
        form_data.append(key, data[key]);
      }
      return this.httpClient.put(`${this.apiUrl + "/" + general}?id=${id}`, form_data);
    } else {
      return this.httpClient.put(`${this.apiUrl + "/" + general}?id=${id}`, data);
    }
  }


  deleteItems(general: string, actionResult:any = undefined, ids: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: ids
    };

    if (ids && actionResult) {
      return this.httpClient.delete(`${this.apiUrl + "/" + general + "/" + actionResult}`, options);
    }
    return this.httpClient.delete(`${this.apiUrl + "/" + general}`, options);
  }

}
