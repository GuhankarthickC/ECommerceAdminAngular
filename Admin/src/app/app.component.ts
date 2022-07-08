import { Component } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopX Admin';
  isLogged:boolean = false;
  temp:string = "";
  constructor(private server:AdminService){}

  ngOnInit():void{
    this.temp = sessionStorage.getItem("isLoggedIn");
    if(this.temp == "true"){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

}
