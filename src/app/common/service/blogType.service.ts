import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BlogTypeModel } from '../model/article/blogType.model';

@Injectable({
  providedIn: 'root',
})
export class BlogTypeService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpClient) {}

  /**
   * 查询分类树
   */
  queryTypeTree(type: string) {
    let url;
    if (type !== undefined) {
      url = this.baseUrl + `/article/type/queryblogtype/1?type=${type}`;
    } else {
       url = this.baseUrl + `/article/type/queryblogtype/1`;
    }
    return this.http.get(url);
  }

  /**
   * 查询分类树
   */
  queryTypeTreeManage() {
    const url = this.baseUrl + '/article/type/queryblogtype/0';
    return this.http.get(url);
  }

  /**
   * 创建分类
   */
  createType(pId: string, name: string, type: string) {
    const url = this.baseUrl + `/article/type/create/${pId}/${name}/${type}`;
    return this.http.get(url);
  }

  /**
   * 修改停用启用状态
   */
  updateState(id: string, state: number) {
    const url = this.baseUrl + `/article/type/updatestate/${id}/${state}`;
    return this.http.get(url);
  }

  /**
   * 删除
   */
  deleteBlogType(id: string) {
    const url = this.baseUrl + `/article/type/removestate/${id}`;
    return this.http.get(url);
  }

  /**
   * 修改类型名
   */
  changeTypeName(blogType: BlogTypeModel) {
    const url = this.baseUrl + `/article/type/changetypename`;
    return this.http.post(url, blogType);
  }
}
