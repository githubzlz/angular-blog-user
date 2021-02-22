import { Component, OnInit } from '@angular/core';
import { MenuModule } from './menu.conf';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import {LoginUser} from '../../common/model/userinfo/loginuser.model';
import {LoginService} from '../../common/util/login.service';
import {ResultSetModel} from '../../common/model/commonmodel/resultset.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public menus: MenuModule[] = MenuModule.catalog;
  public data: any;
  isCollapsed = false;
  // 当前用户
  loginUser: LoginUser = new LoginUser();
  constructor(
    private router: Router,
    private message: NzMessageService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.initLoginUserDate();
  }

  initLoginUserDate() {
    const loginUser: LoginUser = JSON.parse(window.sessionStorage.getItem('user_info'));
    this.loginUser.username = loginUser.username;
    this.loginUser.phone = loginUser.phone;
    this.loginUser.email = loginUser.email;
  }

  /**
   * 个人中心
   */
  toBaseUserInfo() {
    this.router.navigate(['/user/basicuserinfo']);
  }

  /**
   * 退出登录
   */
  logOut() {
    this.loginService.logOut().subscribe(date => {
      window.sessionStorage.clear();
      if(ResultSetModel.isSuccess(date)){
        window.location.href = date.message;
      } else {
        window.location.href = 'https://www.zlztsb.com:4443';
      }
    });
  }
}
