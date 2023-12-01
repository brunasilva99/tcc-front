import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IEdit {
  id: number;
  texto: string;
};

@Injectable({
  providedIn: 'root'
})
export class ReasonsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(id: number): Observable<any> {

    return this.http.get(`motivos/all/${id}`);

  }

  add(id: number, text: string): Observable<any> {

    return this.http.post(`motivos/${id}`, {texto: text});

  }

  delete(id: number): Observable<any> {
    const bodyRequest: any = { id: id };
    const httpOptions = {
      body: bodyRequest
    };
  
    return this.http.delete(`motivos/`, httpOptions);
  }

  edit(bodyRequest: IEdit): Observable<any> {
    console.log(bodyRequest)
    return this.http.put('motivos/', bodyRequest);
  }

}
