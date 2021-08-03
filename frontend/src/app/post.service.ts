
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Post} from './post.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: String = "http://localhost:3000/api/";
  constructor(private http: HttpClient) { }

  add(post:Post): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = post;
    console.log(body)
    return this.http.post(this.baseUrl + 'post/add', body,{'headers':headers}).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    )

  }

  list(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseUrl + 'post/list',{'headers':headers}).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    )

  }
}





