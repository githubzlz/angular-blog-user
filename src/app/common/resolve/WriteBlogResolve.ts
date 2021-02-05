import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {BlogService} from '../service/blog.service';
import {Observable} from 'rxjs';
import {ResultSetModel} from '../model/commonmodel/resultset.model';
import {map} from 'rxjs/operators';


@Injectable()
export class WriteBlogResolve implements Resolve<ResultSetModel> {
  constructor(private blogService: BlogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResultSetModel> {
    const id = route.queryParams.bid;
    if (!id) {
      return null;
    }
    return this.blogService.getBlogInfoById(id).pipe(
      map((res: ResultSetModel) => {
        if (ResultSetModel.isSuccess(res)) {
          return res.entity;
        } else {
          return null;
        }
      })
    );
  }
}
