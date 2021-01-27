import {environment} from 'src/environments/environment';
import {Injectable} from '@angular/core';
import {HttpService} from '../../util/http.service';
import {MessageShowEnum} from '../../constant/message.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleService {


  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpService) {}

  /**
   * 查询用户角色
   * @param userId
   */
  userList(userId: string) {
    const url = `${this.baseUrl}//role/list/${userId}`;
    return this.http.get(url, MessageShowEnum.UNAUTHORIZED_ERROR);
  }

}
