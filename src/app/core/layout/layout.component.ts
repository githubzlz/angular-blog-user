import { Component, OnInit } from '@angular/core';
import { MenuModule } from './menu.conf';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/util/login.service';
import { LoginUser } from 'src/app/common/model/userinfo/loginuser.model';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';

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
  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit() {
    this.loginService.getLoginUser().subscribe((data: ResultSetModel) => {
      if (data.entity) {
        this.loginUser = data.entity;
      } else {
        this.loginUser.name = '未登录';
      }
    });
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
