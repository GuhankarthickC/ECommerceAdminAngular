import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from 'Models/Chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url:string = "https://localhost:44353/api/Chats/";

  constructor(private http:HttpClient) { }

  getNewMessages(adminid:number): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.url+"newMessages/" + adminid);
  }

  getAllMessages(adminId:number): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.url + adminId);
  }

  pushChange(message:Chat):any{
    return this.http.post<Chat>(this.url, message, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    });
  }
}
