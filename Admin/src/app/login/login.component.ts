import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mailid:any;
  password:any;
  loginResponse:string = "";
  responseType = "";
  unSuccessAttempts = 0;
  show = false;
  constructor(private server:AdminService, private route:Router) { }
  

  ngOnInit(): void {
    if(sessionStorage.getItem("show")=="1"){
      this.show = true;
    }
    else{
      this.show = false;
    }
  }

  validateAdmin():any{
    console.log("ValidateAdmin called, passed", this.mailid, this.password)
    this.server.checkCredentials(this.mailid, this.password).subscribe(response=>{
      this.loginResponse=response;
      console.log(this.loginResponse);
      if(this.loginResponse == "noadmin"){
        this.responseType = "failed";
      }
      else if(this.loginResponse == "invalid"){
        this.responseType = "failed";
        this.unSuccessAttempts += 1;
      }
      else if(this.loginResponse == "deleted" || this.loginResponse == "locked" || this.loginResponse == "loggedin"){
        this.responseType = "warning";
      }
      else if(this.loginResponse.length == 5){
        console.log("Valid credentials");
        this.server.isLoggedIn = true;
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("adminId", this.loginResponse);
        this.unSuccessAttempts = 0;
        this.responseType = "success";
      }
      console.log(this.responseType, this.unSuccessAttempts);
      location.reload();
      this.redirectDashboard();
      sessionStorage.setItem("show", "1");
    });
  }

  redirectDashboard():void{
    this.route.navigateByUrl("");
  }

  closeToast(){
    sessionStorage.setItem("show", "0");
    location.reload();
  }

}
