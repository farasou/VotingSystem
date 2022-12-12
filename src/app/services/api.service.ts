import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // BASIC CRUD OPERATIONS

  insertProduct(product: any) {
    return this.http.post('http://localhost:3000/products', product);
  }
  getProducts(): any {
    return this.http.get('http://localhost:3000/products');
  }
  putProduct(product: any, id: number) {
    return this.http.put(`http://localhost:3000/products/${id}`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
