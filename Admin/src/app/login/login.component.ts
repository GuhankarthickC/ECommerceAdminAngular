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
    if(sessionStorage.getItem("response")!=undefined){
      this.loginResponse = sessionStorage.getItem("response");
    }
    if(sessionStorage.getItem("attempts")!=undefined){
      this.unSuccessAttempts = Number.parseInt(sessionStorage.getItem("attempts"), 10);
    }
  }

  validateAdmin():any{
    console.log("ValidateAdmin called, passed", this.mailid, this.password)
    this.server.checkCredentials(this.mailid, this.password).subscribe(response=>{
      this.loginResponse=response;
      console.log(this.loginResponse);
      if(this.loginResponse == "invalid"){
        this.unSuccessAttempts += 1;
      }
      else if(this.loginResponse.length == 5){
        console.log("Valid credentials");
        this.server.isLoggedIn = true;
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("adminId", this.loginResponse);
        sessionStorage.setItem("response", "success");
        sessionStorage.setItem("attempts", "0");
        this.unSuccessAttempts = 0;
      }
      console.log(this.loginResponse, this.unSuccessAttempts);
      sessionStorage.setItem("response", this.loginResponse);
      sessionStorage.setItem("attempts", this.unSuccessAttempts.toString());
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
