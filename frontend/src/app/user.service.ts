import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  baseUrl: String = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {

    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    console.log('----->>',this.userSubject);
    this.user = this.userSubject.asObservable();

  }
  
  public get userValue(): User {
    return this.userSubject.value;
  }

  addUser(user:User): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.post(this.baseUrl + 'auth/signup', user,{'headers':headers}).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    )

  }
  setUserDetail(user:User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
  getCurrentUser(token:string): Observable<User> {
    const headers = { 
      'content-type': 'application/json',
      'Authorization': 'Bearer '+token
    }
    
    return this.http.get<User>(this.baseUrl + 'users/me',{'headers':headers}).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    )
  }
}
