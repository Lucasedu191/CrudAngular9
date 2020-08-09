
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/components/product/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001/produts"
             

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',{
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  create (product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl,product)
  }
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }
}
