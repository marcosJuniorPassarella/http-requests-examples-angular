import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post.model';
import { PostsService } from './services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private errorSubscription$!: Subscription;
  loadedPosts: Post[] = [];
  isFetching = false;
  error!: any;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
    this.errorSubscription$ = this.postService.errorSubject$.subscribe({
      next: (err) => (this.error = err.message),
    });
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

  onHandleError() {
    this.error = null;
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

  ngOnDestroy(): void {
    this.errorSubscription$.unsubscribe();
  }
}
