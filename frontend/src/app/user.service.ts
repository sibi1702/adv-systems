import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: String = "http://localhost:3000/api/";
  constructor(private http: HttpClient) { }

  addUser(user:User): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    //const body=JSON.stringify(user);
    const body = user;
    console.log(body)
    return this.http.post(this.baseUrl + 'auth/signup', body,{'headers':headers}).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    )

  }
}
