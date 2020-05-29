import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

/**
 * 请求拦截器，添加请求头(在appmodule注册了)
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService implements HttpInterceptor {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  /**
   * 登陆地址
   */
  loginUrl = environment.OAUTH_LOGIN_URL;

  /**
   * oauth请求头
   */
  authorization: string;

  /**
   * cookie
   */
  token: string;

  constructor(private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): import('rxjs').Observable<HttpEvent<any>> {
    // 检查本地cookie
    const str = document.cookie;
    // 获取不到就去登陆
    const name = str.split('=')[0];
    if (str === undefined || name !== 'token') {
      this.login();
    } else {
      this.token = str.split('=')[1];
    }
    const jwtReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.token),
    });
    return next.handle(jwtReq);
  }

  /**
   * 打开登陆界面
   */
  login() {
    const div = document.getElementById('login_frame_div');
    div.style.visibility = 'visible';
  }

  /**
   * 获取登陆人
   */
  getLoginUser() {
    const url = this.baseUrl + '/check/login_state';
    return this.http.post(url, null);
  }
}
