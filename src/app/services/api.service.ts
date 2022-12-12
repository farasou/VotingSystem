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

  insertVotingTypes(votingType: any) {
    return this.http.post(this.API_URL + 'votingTypes', votingType);
  }
  getVotingTypes(): any {
    return this.http.get(this.API_URL + 'votingTypes');
  }
  putVotingTypes(votingType: any, id: number) {
    return this.http.put(this.API_URL + `votingTypes/${id}`, votingType);
  }
  deleteVotingTypes(id: number) {
    return this.http.delete(this.API_URL + `votingTypes/${id}`);
  }
}
