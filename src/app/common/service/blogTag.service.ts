import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogTagService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpClient) {}

  /**
   * 查询标签分类
   */
  queryTagType() {
    const url = this.baseUrl + '/article/tags/querytagtypelist';
    return this.http.get(url);
  }

  /**
   * 根据标签分类查询标签
   * @param typeId  typeId
   */
  queryTag(typeId: string) {
    const url = this.baseUrl + '/article/tags/querytaglist/' + typeId;
    return this.http.get(url);
  }
}
