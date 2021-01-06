import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../common/service/user.service';

@Component({
  selector: 'app-user-info-safety',
  templateUrl: './userInfoSafety.component.html',
  styleUrls: ['./userInfoSafety.component.css'],
})
export class UserInfoSafetyComponent implements OnInit {

  page = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {}

}
