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
  constructor(private obj:CustomerService) { }

  ngOnInit(): void {
  }
  get_customers():void
  {
    this.table_value=!this.table_value;
    this.obj.getAllCustomers().subscribe(data=>{
      this.users=data;
      this.count=data.length;
      console.log(this.users);
    });
  }
}
