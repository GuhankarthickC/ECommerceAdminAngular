import { Component, OnInit } from '@angular/core';
import { Product } from 'Models/Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:Product[]=[];
producttable:any=false;
  constructor(private obj:ProductService) { }

  ngOnInit(): void {
    this.get_products();
  }
  get_products():void
  {
    this.producttable=!this.producttable;
    this.obj.getAllProducts().subscribe(data=>{
      this.products=data;
      console.log(this.products);
    });
  }
  getbyCategory(categoryname:string):void{
    this.obj.getProductsByCategory(categoryname).subscribe(data=>{
      this.products=data;
      console.log(this.products);
    });
  }
}
