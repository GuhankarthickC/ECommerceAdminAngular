import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { Contribution } from 'Models/Contribution';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: string = "https://localhost:44353/api/Admins/";
  isLoggedIn:boolean = false;
  admin:Admin;
  change:Contribution;
  constructor(private http:HttpClient , private route:Router) { }

  redirectDashboard():void{
    this.route.navigateByUrl("");
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.url);
  }

  getAdminById(id:any): Observable<Admin> {
    return this.http.get<Admin>(this.url + id);
  }

  updateAdmin(a: Admin): Observable<any> {
    return this.http.put<any>(this.url + a.adminId, a, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    });
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete<any>(this.url + id);
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
    return this.http.get(this.url + mail + "/" + pwd, {responseType:'text'});
  }

  logout(id:string):any{
    console.log("Logout called in admin service");
    return this.http.head(this.url + id);
  }

}
