import { Component, OnInit } from '@angular/core';
import { User } from 'Models/User';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
users:User[]=[];
count:any;
table_value:any=false;
table_error:any=true;
  constructor(private obj:CustomerService) { }

  ngOnInit(): void {
    this.get_customers();
  }
  get_customers():void
  {
    this.obj.getAllCustomers().subscribe(data=>{
      this.users=data;
      this.count=data.length;
      console.log(this.users);
      if(this.users.length > 0){
        this.table_error=false;
      }
    });
    
  }
  btntoggle():void{
    this.table_value=!this.table_value;
  }
}
