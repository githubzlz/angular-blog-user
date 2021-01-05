import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {ModuleModel} from '../model/module/module.model';
import {HttpService} from '../util/http.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpService) {}

  /**
   * 查询模块
   * @param module 模块
   */
  queryModuleList(module: ModuleModel) {
    const url = `${this.baseUrl}/module/list`;
    return this.http.post(url, module);
  }
}
