import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: String = "http://localhost:3000/api/";
  constructor(
    private http: HttpClient
  ) { }

  login(email:string, password:string ): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.post<object>(this.baseUrl + 'auth/signin', {email, password}, {'headers':headers})
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      ) 
  }
        
  setSession(authResult:any) {
      const expiresAt = moment().add(authResult.expiresIn,'second');

      localStorage.setItem('id_token', authResult.token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }    

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration || '{}');
      return moment(expiresAt);
  }  
}
