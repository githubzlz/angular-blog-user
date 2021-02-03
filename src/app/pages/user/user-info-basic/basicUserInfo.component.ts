import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/common/model/userinfo/loginuser.model';
import {UserService} from "../../../common/service/user/user.service";
import {ResultSetModel} from "../../../common/model/commonmodel/resultset.model";

@Component({
  selector: 'app-base-user',
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
  constructor(private userservice: UserService) {}

  ngOnInit() {
    this.initLoginUserDate();
  }

  initLoginUserDate() {
    this.userservice.loginUserInfo().subscribe((date: ResultSetModel) => {
      if (ResultSetModel.isSuccess(date)) {
        const userInfo = JSON.stringify(date.entity);
        window.sessionStorage.setItem('user_info', userInfo);
        this.loginUser.username = date.entity.username;
        this.loginUser.phone = date.entity.phone;
        this.loginUser.email = date.entity.email;
      }
    });
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
