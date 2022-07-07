import { Component, OnInit } from '@angular/core';
import { Admin } from 'Models/Admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-adminslist',
  templateUrl: './adminslist.component.html',
  styleUrls: ['./adminslist.component.css']
})
export class AdminslistComponent implements OnInit {
  admins:Admin[]=[];
  constructor(private server:AdminService) { }

  ngOnInit(): void {
    this.adminList();
  }

  adminList():any{
    this.server.getAdmins().subscribe(response=>{
      this.admins= response;
    })
  }

}
