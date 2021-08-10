
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

  update(post: Post, postId: string): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = post;
    return this.http.post(this.baseUrl + 'post/update/' + postId, body,{'headers':headers}).pipe(
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

  deletePost(postId: string): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.delete(this.baseUrl + 'post/delete-post/' + postId, { 'headers':headers }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    )
  }

  getPostById(postId: string): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseUrl + 'post/post-by-id/' + postId, { 'headers':headers }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    )
  }

}
