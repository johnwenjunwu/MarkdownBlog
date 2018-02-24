import {Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BlogService, Post} from '../blog.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  post: Post;
  titleControl = new FormControl();
  bodyControl = new FormControl();
  // num = 0;

  constructor(private blogSerivce: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.save();
      this.getPost()
    });
  }

  getPost() {
    this.titleControl.markAsPristine();
    this.bodyControl.markAsPristine();
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.post = this.blogSerivce.getPost(id);
  }

  ngOnDestroy() {
    this.save();
  }

  @HostListener('window:beforeunload')
  save() {
    // console.log(this.num++);
    if (this.titleControl.dirty || this.bodyControl.dirty) {
      this.titleControl.markAsPristine();
      this.bodyControl.markAsPristine();
      this.blogSerivce.update(this.post);
    }
  }


  delete() {
    this.blogSerivce.delete(this.post.postid);
    this.router.navigate(['/']);
  }

  preview() {
    this.router.navigate([`/preview/${this.post.postid}`]);
  }
}
