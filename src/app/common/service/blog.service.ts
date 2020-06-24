import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PageInfoModel } from '../model/commonmodel/pageInfo.model';
import { BlogPublicInfoModel } from '../model/article/BlogPublicInfo.model';
import { ArticleModel } from '../model/article/article.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpClient) {}

  /**
   * 发布文章
   */
  publicBlog(article: any) {
    const url = this.baseUrl + '/blog/article/create';
    return this.http.post(url, article);
  }

  /**
   * 查询文章列表
   * @param pageInfo pageInfo
   */
  selectList(pageInfo: ArticleModel) {
    const url = this.baseUrl + '/blog/article/list';
    return this.http.post(url, pageInfo);
  }

  /**
   * 删除文章
   * @param id id
   */
  deletedArtcle(id: string) {
    const url = this.baseUrl + '/blog/article/remove/' + id;
    return this.http.get(url);
  }

  /**
   * 修改文章标题和摘要
   * @param blog blog
   */
  updateTitleOrSummary(blog: ArticleModel) {
    const url = this.baseUrl + '/blog/article/titleorsummary';
    return this.http.post(url, blog);
  }

  /**
   * 查询文章正文
   * @param id id
   */
  getBlogContent(id: string) {
    const url = this.baseUrl + '/blog/article/queryarticle/' + id;
    return this.http.get(url);
  }
}
