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
  allAdmins:Admin[] = [];
  showProfile:boolean = false;
  editProfile:boolean = false;
  stopNotifications = false;
  showChatWindow = false;
  newMessages:Chat[]=[];
  allMessages:Chat[]=[];
  selectedAdminForChat:string="";
  adminMessage = "";
  constructor(public server:AdminService, private route:Router,private messages:ChatService) { }

  ngOnInit(): void {
    this.adminid = sessionStorage.getItem("adminId");
    if(this.adminid!= undefined && this.adminid.length == 5){
        this.server.getAdminById(this.adminid).subscribe(response=>{
        this.server.admin = response;
        this.admin = response;
        this.isSuperAdmin=this.admin.isSuperAdmin;
        this.getAllAdmins();
        this.checkNewMessages();
      })
    }  
    if(sessionStorage.getItem("showChat")=="1"){
      this.getMessages();
      this.showChatWindow=true;
    }
    else{
      this.showChatWindow=false;
    }
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
      console.log(this.newMessages.length,this.newMessages);
    });
    setTimeout(() => {
      this.checkNewMessages();
    }, 10000);
  }

  getMessages() {
    this.messages.getAllMessages(this.admin.adminId).subscribe(response=>{
      this.allMessages = response;
      console.log(this.allMessages.length)
    });
  }

  sendNewMessage(){
    console.log("Send message called.");
    console.log(this.admin.adminId, this.selectedAdminForChat, this.adminMessage);
    this.messages.pushMessage(this.admin.adminId,Number.parseInt(this.selectedAdminForChat,10),this.adminMessage).subscribe();
    this.getMessages();
    location.reload();
  }  

  stopNotifying(){
    this.stopNotifications = true;
    if(this.stopNotifications == true){
      clearTimeout();
    }
  }

  
}
