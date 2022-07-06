import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http
      .post(`${environment.firebaseUrlApi}/posts.json`, postData)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
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
      .get(`${environment.firebaseUrlApi}/posts.json`)
      .pipe(
        map((responseData: any) => {
          const postsArrray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArrray.push({ ...responseData[key], id: key });
            }
          }
          return postsArrray;
        })
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
  }
}
