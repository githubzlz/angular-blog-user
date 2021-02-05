import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpService} from '../util/http.service';
import {BlogTagModel} from "../model/tag/blogTag.model";
import {MessageShowEnum} from "../constant/message.enum";

@Injectable({
  providedIn: 'root',
})
export class BlogTagService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpService) {}

  /**
   * 查询标签列表
   */
  queryTagList(tag: BlogTagModel, show?: MessageShowEnum) {
    const url = this.baseUrl + '/tag/me/query/list';
    return this.http.post(url, tag, show);
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
