import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})

export class PostListComponent  implements OnInit{
  // posts = [
  //   {name: 'Dave Masko', age:"30"},
  //   {name: 'Phili Joe', age:"33"},
  //   {name: 'Juli Rahe', age:"39"},
  //   {name: 'Jus Jew', age:"47"}
  // ];
 posts: Post[] = [];
 private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(){
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
