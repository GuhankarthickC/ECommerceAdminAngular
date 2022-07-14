
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'Models/Order';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url: string = "https://localhost:44346/api/Orders";
  constructor(private http:HttpClient,private obj:AdminService) { }

  getAllorder():Observable<any>
  {
    localStorage.setItem('admindashboarderror', JSON.stringify(false));
    return this.http.get<Order[]>(this.url).pipe(catchError(this.handleError));

  }
  private handleError(error: HttpErrorResponse){
    console.log(error);
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:',error.status, error.statusText);
      localStorage.setItem('admindashboarderror', JSON.stringify(true));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      localStorage.setItem('admindashboarderror', JSON.stringify(true));
      console.error(
        'Backend returned code ${error.status}, body was: ',error.status);
    }
    localStorage.setItem('admindashboarderror', JSON.stringify(true));
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
 
}
