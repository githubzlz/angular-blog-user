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
  ngOnInit() {}

  onClick() {
    const div = document.getElementById('login_frame_div');
    div.style.visibility = 'hidden';
  }
}
