import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {BlogModel} from '../model/article/blog.model';
import {HttpService} from '../util/http.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpService) {
  }

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
  selectList(pageInfo: BlogModel) {
    const url = this.baseUrl + '/blog/list';
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
   * 恢复删除
   * @param id id
   */
  revokeDeleted(id: string) {
    const url = this.baseUrl + `/blog/article/remove/revoke/${id}`;
    return this.http.get(url);
  }

  /**
   * 修改文章标题和摘要
   * @param blog blog
   */
  updateTitleOrSummary(blog: BlogModel) {
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

  /**
   * 查询所有文章
   * @param param param
   */
  getAllBlog(param: string) {
    const url = this.baseUrl + `/blog/article/search/all?param=${param}`;
    return this.http.get(url);
  }
}
