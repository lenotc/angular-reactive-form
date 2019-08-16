import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Item } from '../models/item.interface';
import {Product} from '../models/product.interface';

const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class StockInventoryService {

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${url}/cart`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/products`);
  }
}
