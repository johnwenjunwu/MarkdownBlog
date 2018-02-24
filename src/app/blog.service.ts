import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';


@Injectable()
export class BlogService {
  private posts: Post[];
  private newId: number;
  change: EventEmitter<Post> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.posts = JSON.parse(localStorage.getItem('posts')) || [];
    this.newId = JSON.parse(localStorage.getItem('newId')) || 1;
  }

  getPosts(): Observable<Post[]> {
    const username = document.cookie;
    console.log(username, document.cookie);
    return this.http.get<Post[]>('').pipe(catchError(this.handleError('getPosts', [])));
  }

  getPost(id: number): Post {
    let p = this.posts.find(h => h.postid === id);
    this.change.emit(p);
    return p;
  }


  newPost(): Post {
    let p = new Post(this.newId++);
    this.posts.push(p);
    localStorage.setItem('posts', JSON.stringify(this.posts));
    localStorage.setItem('newId', JSON.stringify(this.newId));
    return p;
  }

  update(post: Post): void {
    if (post) {
      let old = this.getPost(post.postid);
      if (old) {
        // console.log('modified');
        old.title = post.title;
        old.body = post.body;
        old.modified = new Date();
        localStorage.setItem('posts', JSON.stringify(this.posts));
      }
    }
  }

  delete(id: number): void {
    let old = this.getPost(id);

    if (old) {
      this.posts.splice(this.posts.indexOf(old), 1);
      localStorage.setItem('posts', JSON.stringify(this.posts));
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

export class Post {

  public created: Date;

  constructor(public postid: number,
              public title = '',
              public body = '',
              public modified = new Date()) {
    this.created = new Date();
  }
}
