import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/common/util/login.service';
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
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.testDate();
  }

  testDate() {
    this.loginUser.name = '朱林忠';
    this.loginUser.phone = '17805459767';
    this.loginUser.email = 'sdbz_zlz@163.com';
  }

  getLoginUserInfo() {
    this.loginService.getLoginUser().subscribe((data) => {
      console.log(data);
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
