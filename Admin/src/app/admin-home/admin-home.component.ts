import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { Chat } from 'Models/Chat';
import { AdminService } from '../admin.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  adminid:string = "";
  isSuperAdmin:boolean;
  admin:Admin;
  showProfile:boolean = false;
  editProfile:boolean = false;
  stopNotifications = false;
  newMessages:Chat[]=[];
  allMessages:Chat[]=[];
  constructor(public server:AdminService, private route:Router,private messages:ChatService) { }

  ngOnInit(): void {
    this.adminid = sessionStorage.getItem("adminId");
    if(this.adminid!= undefined && this.adminid.length == 5){
        this.server.getAdminById(this.adminid).subscribe(response=>{
        this.server.admin = response;
        this.admin = response;
        this.isSuperAdmin=this.admin.isSuperAdmin;
      })
    }
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

  checkNewMessages() {
    this.messages.getNewMessages(this.admin.adminId).subscribe(response=>{
      this.newMessages = response;
      console.log(this.newMessages.length)
    });
  }

  getMessages() {
    this.messages.getAllMessages(this.admin.adminId).subscribe(response=>{
      this.allMessages = response;
      console.log(this.allMessages.length)
    });
  }

  

  repeat = setTimeout(() => {
    this.checkNewMessages();
    if(this.stopNotifications == true){
      clearTimeout(this.repeat);
    }
  }, 1000);

  
}
