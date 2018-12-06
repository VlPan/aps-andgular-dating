import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Product } from './models';
import { environment } from './../../environments/environment';

@Injectable()
export class ProductService {

  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}products`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createProduct(payload: Product): Observable<Product> {
    return this.http
      .post<Product>(`${this.baseUrl}products`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateProduct(payload: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.baseUrl}products/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeProduct(payload: Product): Observable<Product> {
    return this.http
      .delete<Product>(`${this.baseUrl}products/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
