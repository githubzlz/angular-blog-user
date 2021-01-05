import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/common/model/userinfo/loginuser.model';

@Component({
  selector: 'app-user',
  templateUrl: './basicUserInfo.component.html',
  styleUrls: ['./basicUserInfo.component.css'],
})
export class BasicUserInfoComponent implements OnInit {
  // 当前用户
  loginUser: LoginUser = new LoginUser();

  editInfomation: any = {
    state: true,
    name: '编辑',
  };
  constructor() {}

  ngOnInit() {
    this.initLoginUserDate();
  }

  initLoginUserDate() {
    const loginUser: LoginUser = JSON.parse(window.sessionStorage.getItem('loginUser'));
    this.loginUser.username = loginUser.username;
    this.loginUser.phone = loginUser.phone;
    this.loginUser.email = loginUser.email;
  }

  editInfo() {
    this.editInfomation.state = false;
  }
  cancleEdit() {
    this.editInfomation.state = true;
  }

  saveEdit() {
    this.editInfomation.state = true;
  }
}
