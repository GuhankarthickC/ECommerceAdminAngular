import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'Models/Order';
import { OrderItem } from 'Models/OrderItem';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {

  constructor(private http:HttpClient) { }
  req:string="https://localhost:44346/api/OrderItems";
  getAllorderitems():Observable<OrderItem[]>
  {
    return this.http.get<OrderItem[]>(this.req);
  }
  
  
}
