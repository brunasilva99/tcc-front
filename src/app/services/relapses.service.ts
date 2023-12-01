import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ICreateRelapse {
  data_rec: string;
};

@Injectable({
  providedIn: 'root'
})
export class RelapsesService {

  constructor(
    private http: HttpClient
  ) { }

  getRelapses(id: number): Observable<any> {

    return this.http.get(`recaidas/all/${id}`);

  }

  createRelapse(bodyRequest: ICreateRelapse, id: number): Observable<any> {

    return this.http.post(`recaidas/${id}`, bodyRequest);
    
  }

}
