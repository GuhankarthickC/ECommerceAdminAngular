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
filteredproducts:Product[]=[];
producttable:any=false;
searchKey:string="";
value:any;
ischecked:any;
grocery:Array<string>=[];
clothing:Array<string>=[];
  constructor(private obj:ProductService) { }

  ngOnInit(): void {
    this.obj.getAllProducts().subscribe(data=>{
      this.filteredproducts=data;});
    this.get_products();
  }
  get_products():void
  {
    this.obj.getAllProducts().subscribe(data=>{
      this.products=data;
      if(this.products.length>0){
        this.producttable=true;
      }
    });
  }
  getbyCategory(categoryname:string):void{
    this.obj.getProductsByCategory(categoryname).subscribe(data=>{
      this.products=data;
      console.log(this.products);
    });
  }
  search():void{
    if(this.searchKey!="" && this.searchKey!=" ")
    this.products=this.filteredproducts.filter((product)=>product.productName.toLowerCase().indexOf(this.searchKey.toLocaleLowerCase())!=-1);
    else
    this.products=this.filteredproducts;
  }
  price():void{
    console.log(this.value);
    this.products=this.filteredproducts.filter((product)=>(product.price < this.value));
    console.log(this.products);
  }
  sort():void{
    this.grocery.push("Vegetables","Fruits","Juices");
    this.clothing.push("MenApparels","WomenApparels","Footwear");
    if(this.ischecked){
      this.products=this.filteredproducts.filter((product)=>(this.clothing.includes(product.category)));
      console.log(this.products);
    }
    else{
      this.products=this.filteredproducts.filter((product)=>(this.grocery.includes(product.category)));
      console.log(this.products);
    }
  }
}
