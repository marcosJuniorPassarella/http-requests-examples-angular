import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  errorSubject$ = new Subject<{ message: string }>();

  constructor(private http: HttpClient) {}

  createPost(post: Post): Subscription {
    return this.http
      .post<{ name: string }>(`${environment.firebaseUrlApi}/posts.json`, post)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => this.errorSubject$.next(err.message),
      });
  }

  fetchPosts(): Observable<any> {
    return this.http
      .get<{ [key: string]: Post }>(
        `${environment.firebaseUrlApi}/posts.json`,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        }
      )
      .pipe(
        map((responseData) => {
          const postsArrray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArrray.push({ ...responseData[key], id: key });
            }
          }
          return postsArrray;
        })
      );
  }

  deleteAllPosts(): Observable<any> {
    return this.http.delete(`${environment.firebaseUrlApi}/posts.json`);
  }
}
