import { map, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/components/product/product.model';
import { EMPTY } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001/produts"
             

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X',{
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }
  create (product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl,product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      );
  }
  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      );
  }
  readById(id: number): Observable<Product>{
    const url =`${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
  }
  update(product: Product): Observable<Product>{
    const url =`${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      );
  }

  delete(id: number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      );
  }
}
