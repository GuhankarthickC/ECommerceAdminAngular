import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'Models/Order';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }
  req:string="https://localhost:44346/api/Orders";
  getAllorder():Observable<Order[]>
  {
    return this.http.get<Order[]>(this.req);
  }
}
