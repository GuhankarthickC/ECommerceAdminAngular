import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { Chat } from 'Models/Chat';
import { Order } from 'Models/Order';
import { AdminService } from '../admin.service';
import { ChatService } from '../chat.service';
import { CustomerService } from '../customer.service';
import { OrdersService } from '../orders.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  customercount:number=0;
  revenue:number=0;
  liveproducts:number=0;
  neworders:number=0;
  ordervalue:Order[]=[];
  sampleorder:Order[]=[];
  adminid:string = "";
  isSuperAdmin:boolean;
  admin:Admin;
  allAdmins:Admin[] = [];
  showProfile:boolean = false;
  editProfile:boolean = false;
  stopNotifications = false;
  showChatWindow = false;
  newMessages:Chat[]=[];
  allMessages:Chat[]=[];
  selectedAdminForChat:string="";
  adminMessage = "";
  admindashboard:any=false;
  constructor(public server:AdminService, private route:Router,private messages:ChatService,private obj:CustomerService,private orderobj:OrdersService,private productobj:ProductService) { }

  ngOnInit(): void {
    console.log("page loaded");
    this.get_customers();
    this.get_revenuefromorders();
    this.get_products();
    this.adminid = sessionStorage.getItem("adminId");
    this.admindashboard=JSON.parse(localStorage.getItem('admindashboard'));
    if(this.adminid!= undefined && this.adminid.length == 5){
        this.server.getAdminById(this.adminid).subscribe(response=>{
        this.server.admin = response;
        this.admin = response;
        this.admin.adminName=this.admin.adminName.charAt(0).toUpperCase()+this.admin.adminName.slice(1).toLowerCase();
        this.isSuperAdmin=this.admin.isSuperAdmin;
        this.getAllAdmins();
        this.checkNewMessages();
      })
    }  
    if(sessionStorage.getItem("showChat")=="1"){
      this.getMessages();
    }
    else{
      this.showChatWindow=false;
    }
  }
  close():void{
    this.admindashboard=false;
  }
  open():void{
    this.admindashboard=true;
  }
  getAllAdmins(){
    this.server.getAdmins().subscribe(res=>{
      res.forEach(element => {
        if(element.adminId.toString()!=sessionStorage.getItem("adminId")){
          this.allAdmins.push(element);
        }
      });
    });
  }

  showMyProfile():any{
    this.showProfile = true;
  }

  editMyProfile():any{
    this.editProfile = true;
  }

  closeMyProfile():any{
    this.showProfile = false;
    this.editProfile = false;
    this.showChatWindow = false;
    sessionStorage.setItem("showChat","0");
  }

  saveMyProfile(){
    this.server.updateAdmin(this.admin).subscribe();
    location.reload();
  }

  callLogout():any{
    console.log(sessionStorage.getItem("adminId"), "requested logout");
    this.server.logout(sessionStorage.getItem("adminId")).subscribe();
    sessionStorage.clear();
    console.log(sessionStorage.getItem("adminId"),"loggedout");
    location.reload();
  }

  showChat(){
    this.showChatWindow = true;
    sessionStorage.setItem("showChat","1");
    this.getMessages();
  }

  checkNewMessages() {
    this.messages.getNewMessages(this.admin.adminId).subscribe(response=>{
      this.newMessages = response;
      response.forEach(element => {
        this.allMessages.push(element);
      });
      console.log(this.newMessages.length,this.newMessages);
    });
    setTimeout(() => {
      this.checkNewMessages();
    }, 7000);
  }

  getMessages() {
    this.messages.getAllMessages(this.admin.adminId).subscribe(response=>{
      this.allMessages = response;
      console.log("AllMessages Count: " + this.allMessages.length);
      this.showChatWindow=true;
    });
  }

  sendNewMessage(){
    console.log("Send message called.");
    console.log(this.admin.adminId, this.selectedAdminForChat, this.adminMessage);
    this.messages.pushMessage(this.admin.adminId,Number.parseInt(this.selectedAdminForChat,10),this.adminMessage).subscribe(
      res=>{
        this.allMessages.push(res);
        this.adminMessage="";
      }
    );
    
  }  

  stopNotifying(){
    this.stopNotifications = true;
    if(this.stopNotifications == true){
      clearTimeout();
    }
  }

  get_customers():void
  {
    this.obj.getAllCustomers().subscribe(data=>this.customercount=data.filter((res)=>res.isActive).length); 
    console.log(this.customercount);
  }
  get_revenuefromorders():void{
    this.orderobj.getAllorder().subscribe((rsult:any)=>{this.ordervalue=rsult  
      this.findsum(this.ordervalue)
    this.neworders=this.ordervalue.length});  
  }
  findsum(data:any){    
    this.sampleorder=data;    
    for(let j=0;j<data.length;j++){   
         this.revenue+= this.sampleorder[j].totalAmount;
         console.log(this.revenue);  
    }  
  }  

  get_products():void{
    this.productobj.getAllProducts().subscribe(data=>this.liveproducts=data.filter((res)=>res.active.toLocaleLowerCase()=="yes").length);
  }
  
}
