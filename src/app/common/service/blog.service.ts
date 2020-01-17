import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * 发布文章
   */
  publicBlog(article: any) {
    const url = this.baseUrl + '/blog/article/create';
    return this.http.post(url, article);
  }
}
