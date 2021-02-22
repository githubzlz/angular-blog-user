import {environment} from 'src/environments/environment';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements HttpInterceptor {

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
    const token = window.sessionStorage.getItem('access_token');
    let headers;
    if (token) {
      headers = new HttpHeaders( {
        Authorization: 'Bearer ' + token
      });
    } else {
      headers = new HttpHeaders( {});
    }
    const authReq = req.clone({
      withCredentials: true,
      headers
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
    const token = window.sessionStorage.getItem('access_token');
    const userInfo = window.sessionStorage.getItem('user_info');
    // 转化为boolean类型返回
    return !!token && !!userInfo;
  }

  /**
   * 退出登录
   */
  logOut() {
    const url = `https://www.zlztsb.com:18080/login/token/logout`;
    const token = window.sessionStorage.getItem('access_token');
    return this.http.get(url);
  }

}
