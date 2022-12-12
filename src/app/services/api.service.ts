import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  refreshData = new BehaviorSubject(false);
  API_URL = "http://localhost:3000/";

  constructor(
    private http: HttpClient
  ) { }

  insertVotingTypes(product: any) {
    return this.http.post(this.API_URL + 'votingTypes', product);
  }
  getVotingTypes(): any {
    return this.http.get('http://localhost:3000/votingTypes');
  }
  putVotingTypes(product: any, id: number) {
    return this.http.put(this.API_URL + `votingTypes/${id}`, product);
  }
  deleteVotingTypes(id: number) {
    return this.http.delete(this.API_URL + `votingTypes/${id}`);
  }
}
