import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {ModuleModel} from '../model/module/module.model';
import {HttpService} from '../util/http.service';
import {MessageShowEnum} from "../constant/message.enum";

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL + '/category';

  constructor(private http: HttpService) {}

  /**
   * 查询模块列表，分页
   * @param module 模块
   */
  queryCategoryPageList(category: ModuleModel , show?: MessageShowEnum) {
    const url = `${this.baseUrl}/me/query/pagelist`;
    return this.http.post(url, category, show);
  }

  /**
   * 查询模块列表
   * @param category
   * @param show
   */
  queryCategoryList(category: ModuleModel , show?: MessageShowEnum) {
    const url = `${this.baseUrl}/me/query/list`;
    return this.http.post(url, category, show);
  }

  /**
   * 修改分类信息
   * @param category category
   */
  updateCategory(category: ModuleModel, show?: MessageShowEnum) {
    const url = `${this.baseUrl}/me/update`;
    return this.http.post(url, category, show);
  }

  /**
   * 创建分类
   * @param category category
   */
  createCategory(category: ModuleModel) {
    const url = `${this.baseUrl}/me/create`;
    return this.http.post(url, category, MessageShowEnum.ALL);
  }

  /**
   * 通过分类id查询其关联的文章信息
   * @param categoryId categoryId
   */
  queryCategoryBlog(categoryId) {
    const url = `${this.baseUrl}/all/query/blog/${categoryId}`;
    return this.http.get(url, MessageShowEnum.NONE);
  }

  /**
   * 查询未被分类关联的文章
   */
  queryBlogFreedom() {
    const url = `${this.baseUrl}/me/query/freeblog`;
    return this.http.get(url, MessageShowEnum.NONE);
  }

  /**
   * 修改种类绑定的文章
   * @param category category
   */
  updateCategoryBlog(category) {
    const url = `${this.baseUrl}/me/update/categoryblog`;
    return this.http.post(url, category, MessageShowEnum.ALL);
  }
}
