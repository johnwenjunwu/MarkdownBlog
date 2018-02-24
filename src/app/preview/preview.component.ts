import {Component, OnInit} from '@angular/core';
import {BlogService, Post} from '../blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Parser, HtmlRenderer} from 'commonmark';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  parser = new Parser();
  renderer = new HtmlRenderer();
  title: string;
  body: string;
  post: Post;


  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => this.getPost());
  }

  getPost() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.post = this.blogService.getPost(id);

    if (this.post) {
      this.title = this.renderer.render(this.parser.parse(this.post.title));
      this.body = this.renderer.render(this.parser.parse(this.post.body));
    }
  }

  edit() {
    this.router.navigate([`/edit/${this.post.postid}`]);
  }
}
