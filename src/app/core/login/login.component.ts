import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/common/util/login.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  baseUrl: string = environment.BASE_DATA_SERVER_URL;
  safeUrl: any;
  constructor(private login: LoginService, private sanitizer: DomSanitizer) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseUrl + '/login'
    );
  }
  ngOnInit() {
    document.getElementById('login_frame').style.width =
      document.body.clientWidth + 'px';
    document.getElementById('login_frame').style.height =
      document.body.clientHeight + 'px';
    const dom = document.getElementById('login_frame');
    window.onresize = function a() {
      document.getElementById('login_frame').style.width =
        document.body.clientWidth + 'px';
      document.getElementById('login_frame').style.height =
        document.body.clientHeight + 'px';
    };
  }
}
