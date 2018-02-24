import {Component, Input, OnInit} from '@angular/core';
import {BlogService, Post} from '../blog.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: Post[];
  current: Post;

  constructor(private blogService: BlogService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getPosts();
    this.blogService.change.subscribe((p: Post) => this.current = p);
  }

  // onSelect(p: Post) {
  //   this.router.navigate([`/edit/${p.postid}`]);
  // }

  getPosts() {
    this.blogService.getPosts().subscribe(posts => this.posts = posts);
  }

  newPost() {
    let p = this.blogService.newPost();
    this.router.navigate([`/edit/${p.postid}`]);
  }

}
