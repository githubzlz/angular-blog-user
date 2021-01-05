import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpService} from '../util/http.service';
import {MessageShowEnum} from '../constant/message.enum';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpService) {}

  /**
   * 发送邮箱验证码
   */
  sendEmailCheckCode(email: string) {
    const url = `${this.baseUrl}/sendemail`;
    return this.http.post(url, `{"email":"${email}"}`);
  }

}
