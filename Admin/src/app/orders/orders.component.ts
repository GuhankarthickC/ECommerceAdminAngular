import { Component, OnInit } from '@angular/core';
import { Order } from 'Models/Order';
import { OrderItem } from 'Models/OrderItem';
import { Product } from 'Models/Product';
import { User } from 'Models/User';
import { UserAddress } from 'Models/UserAddress';
import { CustomerService } from '../customer.service';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allOrders:Order[] = [];
  allOrderItems:OrderItem[] = [];
  allProducts:Product[] = [];
  allUsers:User[] = [];
  allUserAddresses:UserAddress[] = [];
  showOrder:boolean = false;
  editOrder:boolean = false;
  order:Order;
  constructor(private orderService: OrderService,private prodService:ProductService,private custService:CustomerService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderService.getOrders().subscribe(response=>{
      console.log(response);
      this.allOrders = response
      console.log(this.allOrders);
    });
  }

  // getAllOrderItems(){
  //   this.orderService.getOrderItems().subscribe(response=>{
  //     this.allOrderItems = response;
  //   });
  // }
  
  // getAllProducts(){
  //   this.prodService.getAllProducts().subscribe(response=>{
  //     this.allProducts = response;
  //   });
  // }

  // getAllUsers(){
  //   this.custService.getAllCustomers().subscribe(response=>{
  //     this.allUsers = response;
  //   });
  // }
  
  // getAllUserAddresses(){
  //   this.custService.getAllCustomersAddresses().subscribe(response=>{
  //     this.allUserAddresses = response;
  //   });
  // }

  showOrderDetails(od:Order):any{
    this.order = od;
    // this.selectedUser = this.allUsers.find(u=>u.userId==order.userId);
    // this.selectedUserAddress = this.allUserAddresses.find(u=>u.id == order.deliveryAddress);
    // console.log(order);
    // console.log(this.selectedUserAddress);
    // this.allOrderItems.forEach(item => {
    //   if(item.orderId == order.orderId){
    //     this.selectedOrderItems.push(item);
    //     this.selectedProducts.push(this.allProducts.find(p=>p.productId == item.productId))
    //   }
    // });
    this.showOrder = true;
  }
  
  showEditOrder(ad:Order):any{
    this.editOrder = true;
  }

  close():any{
    this.showOrder = false;
    this.editOrder = false;
  }
}
