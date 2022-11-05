import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from '../../models/ApiRoutes';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl + ApiRoutes.product.search)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
      );
  }

  createProducts(product: IProduct) {
    return this.http.post(this.apiUrl + ApiRoutes.product.create, product);
  }


  updateProducts(product: IProduct) {
    return this.http.post(this.apiUrl + ApiRoutes.product.update, product);
  }
}
