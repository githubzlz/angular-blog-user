import {environment} from 'src/environments/environment';
import {Injectable} from '@angular/core';
import {HttpService} from '../../util/http.service';
import {LoginUser} from '../../model/userinfo/loginuser.model';
import {MessageShowEnum} from '../../constant/message.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {


  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpService) {}

  /**
   * 查询用户列表
   * @param user
   */
  userList(user: LoginUser) {
    const url = `${this.baseUrl}/user/list`;
    return this.http.post(url, user, MessageShowEnum.UNAUTHORIZED_ERROR);
  }

}
