import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'Models/Product';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  req:string="https://localhost:44346/api/Products";
  getAllProducts():Observable<Product[]>
  {
    return this.http.get<Product[]>(this.req);
  }
  getProductsByCategory(name:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.req+"/category"+name,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
}
