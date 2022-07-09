import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post.model';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createPost(postData);
    this.fetchPosts();
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.deleteAllPosts().subscribe({
      next: () => {
        this.loadedPosts = [];
      },
      error: (err) => console.log(err),
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.loadedPosts = res;
      },
      error: (err) => {
        this.isFetching = false;
        this.error = err.message;
        console.log(err);
      },
    });
  }
}
