import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { finalize, last, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ResultSetModel} from '../model/commonmodel/resultset.model';
import {NzMessageService} from 'ng-zorro-antd';
import {MessageShowEnum} from '../constant/message.enum';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient,
              private message: NzMessageService, ) {

  }

  post(url: string, body: any, show?: MessageShowEnum): Observable<any> {
    return this.http.post(url, body).pipe(
      tap(res => {
        const result: ResultSetModel = res;
        if (result) {
          this.showMessage(show, res);
        }
      }, error => {
      }),
      finalize(() => {
      })
    );
  }

  get(url: string, show?: MessageShowEnum): Observable<any> {
    return this.http.get(url).pipe(
      tap(res => {
        const result: ResultSetModel = res;
        if (result) {
          this.showMessage(show, res);
        }
      }, error => {
      }),
      finalize(() => {
      })
    );
  }

  /**
   * 消息提示
   * @param show
   * @param res
   * @private
   */
  private showMessage(show: MessageShowEnum, res: ResultSetModel) {
    if (!show) {
      show = MessageShowEnum.ALL;
    }
    switch (show) {
      case MessageShowEnum.ALL:
        if (res.code === -1) {
          this.message.error(res.message);
        } else if (res.code === 1) {
          this.message.success(res.message);
        } else if (res.code === 401) {
          this.message.error(res.message);
        } else if (res.code === 403) {
          this.message.warning(res.message);
        } else {
          this.message.info(res.message);
        }
        break;
      case MessageShowEnum.NOR_ERROR:
        if (res.code === -1) {
          this.message.error(res.message);
        }
        break;
      case MessageShowEnum.SUCCESS:
        if (res.code === 1) {
          this.message.success(res.message);
        }
        break;
      case MessageShowEnum.UNAUTHORIZED_ERROR:
        if (res.code === 401 || res.code === 403) {
          this.message.warning(res.message);
        }
        break;
      case MessageShowEnum.NONE:
        break;
    }
  }

}
