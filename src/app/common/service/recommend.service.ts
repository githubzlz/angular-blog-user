import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecommendService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpClient) {}

  /**
   * 推荐文章
   */

  recommendBlog(param: any) {
    const url = this.baseUrl + '/blog/recommend/recommend';
    return this.http.post(url, param);
  }

  /**
   * 取消推荐
   * @param id id
   */
  cancel(id: string) {
    const url = this.baseUrl + `/blog/recommend/cancel/${id}`;
    return this.http.get(url);
  }

  /**
   * 获取侧边栏推荐列表
   * @param num num
   */
  getHotBlogs(num: number) {
    const url = this.baseUrl + `/blog/recommend/hot?num=${num}`;
    return this.http.get(url);
  }

  getHomepageBlogs() {
    const url = this.baseUrl + `/blog/recommend/homepage`;
    return this.http.get(url);
  }

  getSideBlogs() {
    const url = this.baseUrl + `/blog/recommend/side`;
    return this.http.get(url);
  }

  recommendList(data) {
    const url = this.baseUrl + `/blog/recommend/list`;
    return this.http.post(url, data);
  }
}
