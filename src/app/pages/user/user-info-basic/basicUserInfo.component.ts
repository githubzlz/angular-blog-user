import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/common/util/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './basicUserInfo.component.html',
  styleUrls: ['./basicUserInfo.component.css'],
})
export class BasicUserInfoComponent implements OnInit {
  loginUrl = environment.BASE_DATA_SERVER_URL;
  safeUrl: any;
  token: any;
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  click() {
    this.loginService.getLoginUser().subscribe((data) => {
      console.log(data);
    });
  }
}
