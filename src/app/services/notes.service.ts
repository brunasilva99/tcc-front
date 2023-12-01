import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ICreateReason {
  texto: string;
};

interface IDeleteReason {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private http: HttpClient
  ) { }

  createReason(bodyRequest: ICreateReason, id: number): Observable<any> {

    return this.http.post(`motivos/${id}`, bodyRequest);

  }

  deleteReason(bodyRequest: IDeleteReason): Observable<any> {

    return this.http.delete('motivos', { body: JSON.stringify(bodyRequest) });

  }

}
