import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ICreateUserHabit {
  id_vicio: number;
  data_abs: string;
};

interface ICreateSystemHabit {
  nome: string;
  icone: string;
};

interface IEditUserHabit {
  id: number;
  data_abs: string;
};

interface IEditSystemHabit {
  nome: string;
  icone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddictionService {

  constructor(
    private http: HttpClient
  ) { }

  // Funções dos vícios do sistema
  getStandardsHabits(): Observable<any> {
    
    return this.http.get('vicios-sistema/');

  }

  saveStandardsHabits(bodyRequest: ICreateSystemHabit): Observable<any> {

    return this.http.post('vicios-sistema', bodyRequest);

  }

  editStandardHabits(bodyRequest: IEditSystemHabit, id: number): Observable<any> {

    return this.http.put('vicios-sistema/'+ id, bodyRequest);

  }

  // Funções dos vícios do usuário
  getUserHabits(): Observable<any> {

    return this.http.get('vicios-usuario/');

  }

  saveUserHabit(bodyRequest: ICreateUserHabit): Observable<any> {

    return this.http.post('vicios-usuario/', bodyRequest);

  }

  editUserHabit(bodyRequest: IEditUserHabit): Observable<any> {

    return this.http.put(`vicios-usuario`, bodyRequest);

  }

  deleteUserHabit(id: number): Observable<any> {

    return this.http.delete(`vicios-usuario/${id}`);

  }

}