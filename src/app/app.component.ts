import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http
      .post<{ name: string }>(
        `${environment.firebaseUrlApi}/posts.json`,
        postData
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
    this.fetchPosts();
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>(`${environment.firebaseUrlApi}/posts.json`)
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
      )
      .subscribe({
        next: (res) => {
          this.loadedPosts = res;
        },
        error: (err) => console.log(err),
      });
  }
}
