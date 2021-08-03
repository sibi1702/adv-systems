import { Component, OnInit } from '@angular/core';
import {PostService} from '../../post.service';
import {Post} from '../../post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: Array<Post>
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    
    this.postService.list().subscribe(data => {
      this.posts = data;
    }) ;

  }

}
