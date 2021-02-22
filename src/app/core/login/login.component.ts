import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../common/service/user/user.service";
import {ResultSetModel} from "../../common/model/commonmodel/resultset.model";

@Component({
  template: `

  `,
  selector: 'app-login'
})

export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public activatedRouter: ActivatedRoute,
              public router: Router,
              public userservice: UserService) {

  }
  ngOnInit() {
    window.sessionStorage.clear();
    this.activatedRouter.queryParams.subscribe(param => {
      if (!param.code) {
        window.location.href = 'https://www.zlztsb.com:18080/login';
      } else {
        // 获取token
        this.userservice.getToken(param.code).subscribe((date: ResultSetModel) => {
          // 获取成功就 设置到session中，然后去获取用户信息
          if (date.code !== 1) {
            window.location.href = 'https://www.zlztsb.com:18080/login';
            return;
          } else {
            window.sessionStorage.setItem('access_token', date.entity.token);
          }

          // 获取用户信息
          this.userservice.loginUserInfo().subscribe(data => {
            const result: ResultSetModel = data;
            if (result.code === 1) {
              const userInfo = JSON.stringify(result.entity);
              window.sessionStorage.setItem('user_info', userInfo);
              this.router.navigate(['/index']);
            }
          });
        });
      }

      // if (!param.access_token) {
      //   window.location.href = 'http://localhost:8080/login';
      // } else {
      //   window.sessionStorage.setItem('access_token', param.access_token);
      //   this.userservice.loginUserInfo().subscribe(data => {
      //     const result: ResultSetModel = data;
      //     if (result.code === 1) {
      //       const userInfo = JSON.stringify(result.entity);
      //       window.sessionStorage.setItem('user_info', userInfo);
      //       this.router.navigate(['/index']);
      //     }
      //   });
      // }
    });

  }

  ngAfterViewInit() {
  }


}
