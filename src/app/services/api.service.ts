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

  insertProduct(product: any) {
    return this.http.post(this.API_URL + 'votingTypes', product);
  }
  getProducts(): any {
    return this.http.get(this.API_URL + 'votingTypes');
  }
  putProduct(product: any, id: number) {
    return this.http.put(this.API_URL + `votingTypes/${id}`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(this.API_URL + `votingTypes/${id}`);
  }
}
