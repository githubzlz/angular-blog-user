import {environment} from 'src/environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginUser} from '../model/userinfo/loginuser.model';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {finalize, tap} from "rxjs/operators";
import {ok} from "assert";
import {HttpService} from "./http.service";
import {MessageShowEnum} from "../constant/message.enum";

@Injectable({
  providedIn: 'root',
})
export class LoginService implements HttpInterceptor{

  /**
   * 是否登录
   */
  isLoggedIn = false;

  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      withCredentials: true
    });
    // return next.handle(authReq).pipe(
    //   tap(event => {
    //     if (event instanceof HttpResponse) {
    //       // 成功
    //       console.log('success');
    //     }
    //   }, error => {
    //     // 失败
    //     console.log(error);
    //   }),
    //   finalize(() => {
    //     // 请求完成
    //     console.log('complete');
    //   })
    // );
    return next.handle(authReq);
  }


  /**
   * 检查是否登录
   * @return boolean
   */
  checkLogin(): boolean {
    const loginUser = window.sessionStorage.getItem('loginUser');
    return !!loginUser;
  }

  /**
   * 登录
   * @param loginUser
   */
  login(loginUser: LoginUser) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, loginUser);
  }

  /**
   * 退出登录
   */
  logOut() {
    window.sessionStorage.clear();
    const url = `${this.baseUrl}/logout`;
    return this.http.get(url);
  }

  /**
   * 验证验证码
   */
  checkCheckCode(code: string) {
    const url = `${this.baseUrl}/checkCode/check/${code}`;
    return this.http.get(url, MessageShowEnum.NOR_ERROR);
  }

}
