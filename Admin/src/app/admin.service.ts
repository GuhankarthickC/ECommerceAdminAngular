import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: string = "https://localhost:44353/api/Admins/";
  isLoggedIn:boolean = false;

  constructor(private http:HttpClient , private route:Router) { }

  redirectDashboard():void{
    this.route.navigateByUrl("");
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.url);
  }

  pushAdmin(admin:Admin):any{
    return this.http.post<Admin>(this.url, admin, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    });
  }

  checkCredentials(mail:string, pwd:string): Observable<string> {
    return this.http.get<string>(this.url + "mailid=" + mail + "/password=" + pwd);
  }

}
