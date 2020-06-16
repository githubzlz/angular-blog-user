import { Component, OnInit } from '@angular/core';
import { MenuModule } from './menu.conf';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/util/login.service';
import { LoginUser } from 'src/app/common/model/userinfo/loginuser.model';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import { NzMessageService } from 'ng-zorro-antd';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public menus: MenuModule[] = MenuModule.catalog;
  public data: any;
  isCollapsed = false;
  // 当前登陆人
  loginUser: LoginUser = new LoginUser('', null, null, null);
  constructor(
    private router: Router,
    private loginService: LoginService,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    this.login();
  }

  /**
   * 登陆
   */
  login() {
    this.loginService.getLoginUser().subscribe(
      (data: ResultSetModel) => {
        if (data.entity) {
          this.loginUser = data.entity;
        } else {
          this.loginUser.name = '';
        }
      },
      () => {
        this.loginUser.name = '';
      }
    );
  }

  /**
   * 登出
   */
  logout() {
    this.loginService.logout();
    this.message.create('success', `您已退出,欢迎下次使用`);
    // location.reload();
  }

  // /**
  //  * 点击进行路由跳转，并将data数据传出
  //  */
  // routerOut(url: string) {
  //   this.routeOutLet(url, this.data);
  //   console.log(url);
  // }

  // /**
  //  * 路由跳转并且传值
  //  */
  // routeOutLet(url: string, data: any) {
  //   this.router.navigate([url], {
  //     skipLocationChange: true,
  //     queryParams: {
  //       data: JSON.stringify(data),
  //     },
  //   });
  // }
}
