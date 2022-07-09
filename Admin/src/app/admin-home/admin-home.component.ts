import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  adminid:string = "";
  constructor(public server:AdminService, private route:Router) { }

  ngOnInit(): void {
    this.adminid = sessionStorage.getItem("adminId");
    if(this.adminid!= undefined && this.adminid.length == 5){
        this.server.getAdminById(this.adminid).subscribe(response=>{
        this.server.admin = response;
      })
    }
  }

  callLogout():any{
    console.log(sessionStorage.getItem("adminId"), "requested logout");
    this.server.logout(sessionStorage.getItem("adminId")).subscribe();
    sessionStorage.clear();
    console.log(sessionStorage.getItem("adminId"),"loggedout");
    location.reload();
  }

}
