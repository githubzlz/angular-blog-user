import {AfterViewInit, Component, OnInit} from '@angular/core';
import { LoginService } from 'src/app/common/util/login.service';
import {LoginUser} from '../../common/model/userinfo/loginuser.model';
import {ResultSetModel} from '../../common/model/commonmodel/resultset.model';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {EmailService} from "../../common/service/email.service";
declare var loginBackInit;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit, AfterViewInit {

  safeUrl: any;
  loginUser: LoginUser = new LoginUser();
  loginMethod = 'up';
  passwordVisible = false;
  showInputSuffix = {
    username: false,
    password: false
  };
  showTimeCountDown = false;
  countDownTime;
  checkCode = '';

  constructor(private loginService: LoginService,
              private emailService: EmailService,
              private message: NzMessageService,
              private router: Router) {

  }
  ngOnInit() {
    loginBackInit();
  }

  ngAfterViewInit() {
  }

  /**
   * 去注册界面/登录界面
   */
  switchLoginMethod(type: string) {
    this.loginMethod = type;
    const uPLogin = document.getElementById('uPLogin');
    const uMLogin = document.getElementById('uMLogin');
    if (this.loginMethod === 'up') {
      uMLogin.setAttribute('style', 'width: 0');
      uPLogin.setAttribute('style', 'width: 100%');
    } else if (this.loginMethod === 'um') {
      uPLogin.setAttribute('style', 'width: 0');
      uMLogin.setAttribute('style', 'width: 100%');
    }
  }



  /**
   * 去注册
   */
  toRegister() {
  }

  /**
   * 登录
   */
  login() {
    if (!this.checkCode) {
      this.message.warning('请输入验证码');
      return;
    }
    this.loginService.checkCheckCode(this.checkCode).subscribe(data => {
      const check: ResultSetModel = data;
      if (check && check.code === 1 && this.loginCheck()) {
        this.loginService.login(this.loginUser).subscribe(data1 => {
          const resultSet: ResultSetModel = data1;
          if (ResultSetModel.isSuccess(resultSet)) {
            window.sessionStorage.setItem('loginUser', JSON.stringify(resultSet.entity));
            this.router.navigate(['/index']);
          } else {
            this.refreshCheckCode();
          }
        });
      } else {
        this.refreshCheckCode();
      }
    });
  }

  /**
   * 登录表单检查
   */
  loginCheck(): boolean {
    if (this.loginMethod === 'up') {
      if (!this.loginUser.username || this.loginUser.username === ''
        || !this.loginUser.password
        || this.loginUser.password === '') {
        return false;
      }
    } else if (this.loginMethod === 'um') {
      if (!this.loginUser.email || this.loginUser.username === ''
        || !this.loginUser.checkCode
        || this.loginUser.checkCode === '') {
        return false;
      }
    }
    return true;
  }

  /**
   * 获得焦点，显示input框后缀
   * @param type type
   */
  focus(type: number) {
    console.log(11111);
    if (type === 1) {
      this.showInputSuffix.username = true;
    }
    if (type === 2) {
      this.showInputSuffix.password = true;
    }
  }

  /**
   * 失去焦点，隐藏input框后缀
   * @param type type
   */
  blur(type: number) {
    console.log(11111);
    if (type === 1) {
      this.showInputSuffix.username = false;
    }
    if (type === 2) {
      this.showInputSuffix.password = false;
    }
  }

  /**
   * 检查验证码是否正确
   */
  checkFontCode(): boolean {
    return true;
  }

  /**
   * 发送验证码
   */
  sendCheckCode() {
    if (!this.checkCode) {
      this.message.warning('请输入验证码');
      return;
    }
    // 验证验证码
    this.loginService.checkCheckCode(this.checkCode).subscribe(data => {
      const check: ResultSetModel = data;
      if (ResultSetModel.isSuccess(check)) {
        // 验证码正确则申请发送邮件
        this.emailService.sendEmailCheckCode(this.loginUser.email).subscribe(data => {
          const result: ResultSetModel = data;
          if (ResultSetModel.isSuccess(result)) {
            this.showTimeCountDown = true;
            this.countDownTime = '验证码发送成功';
            setTimeout(() => {
              this.countDownTime = 118;
              this.countDown();
            }, 2000);
          }
        });
      }
    });
  }

  /**
   * 倒计时,递归调用，直到时间为0
   */
  countDown() {
    if (this.countDownTime <= 0) {
      this.showTimeCountDown = false;
      return;
    }
    setTimeout(() => {
      this.countDownTime--;
      this.countDown();
    }, 1000);
  }

  /**
   * 刷新验证码
   */
  refreshCheckCode() {
    this.checkCode = '';
    const random = Math.random() * 10000;
    document.getElementById('img').innerHTML =
      `<img src="http://localhost:10800/getCheckCode/${random}" width="90" height="42" style="margin-left: 20px">`;
  }
}
