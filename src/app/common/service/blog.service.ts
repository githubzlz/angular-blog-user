import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {BlogModel} from '../model/article/blog.model';
import {HttpService} from '../util/http.service';
import {MessageShowEnum} from '../constant/message.enum';

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
  publicBlog(article: any, show?: MessageShowEnum) {
    const url = this.baseUrl + '/blog/me/create';
    return this.http.post(url, article, show);
  }

  /**
   * 修改文章内容
   * @param article
   * @param show
   */
  updateBlog(article: any, show?: MessageShowEnum) {
    const url = this.baseUrl + '/blog/me/update';
    return this.http.post(url, article, show);
  }

  /**
   * 查询文章列表
   * @param pageInfo pageInfo
   */
  selectList(pageInfo: BlogModel) {
    const url = this.baseUrl + '/blog/me/query/pagelist';
    return this.http.post(url, pageInfo);
  }

  /**
   * 删除文章
   * @param id id
   */
  deletedArtcle(id: string) {
    const url = this.baseUrl + '/blog/me/remove/' + id;
    return this.http.get(url);
  }

  /**
   * 恢复删除
   * @param id id
   */
  revokeDeleted(id: string) {
    const url = this.baseUrl + `/blog/me/revoke/${id}`;
    return this.http.get(url);
  }

  /**
   * 修改文章标题和摘要
   * @param blog blog
   */
  updateTitleOrSummary(blog: BlogModel) {
    const url = this.baseUrl + '/blog/me/update/titleorsummary';
    return this.http.post(url, blog);
  }

  /**
   * 查询文章正文
   * @param id id
   */
  getBlogInfoById(id: string) {
    const url = `${this.baseUrl}/blog/me/query/${id}`;
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
