import { Component, OnInit } from '@angular/core';
import {PostService} from '../../post.service';
import {Post} from '../../post.model';
import { Globals } from '../../common/globals';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  globals = Globals
  posts: Array<Post>
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.updateList();
  }

  private updateList() {
    this.postService.list().subscribe(data => {
      this.posts = data;
    }) ;
  }

  deletePost(postId: string) {
    if (confirm("Are you sure you want to delete ?")) {
      this.postService.deletePost(postId).subscribe({
        next : (data) => {
          if (data.status === true){
            this.updateList();
          }
        },
        error: error => {
            alert(error.error.errors.message);
        }
      });
    }
  }
}
