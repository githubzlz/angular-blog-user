import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../../common/model/userinfo/loginuser.model';
import {UserService} from '../../../../common/service/user.service';
import {PageInfoModel} from '../../../../common/model/commonmodel/pageInfo.model';
import {ResultSetModel} from '../../../../common/model/commonmodel/resultset.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<LoginUser>;
  selectModule: LoginUser;
  listStatus = [{ text: '正常', value: '0', byDefault: true }, { text: '停用', value: '1' }, { text: '注销', value: '2' }];
  listLocks = [{ text: '正常', value: '0', byDefault: true }, { text: '锁定', value: '1' }];

  constructor(private userService: UserService) {
    this.resetUserSelectModule();

  }


  ngOnInit() {
  }

  /**
   * 重置查询对象
   */
  resetUserSelectModule() {
    this.selectModule = new LoginUser();
    this.selectModule.pageInfo = new PageInfoModel();
    this.getUserList();
  }

  /**
   * 分页查询用户列表
   */
  getUserList() {
    console.log(this.selectModule);
    this.userService.userList(this.selectModule).subscribe(data => {
      const result: ResultSetModel = data;
      if (ResultSetModel.isSuccess(result)) {
        const pageInfo: PageInfoModel = result.entity;
        this.users = pageInfo.list;
      }
    });
  }

  /**
   * 排序
   */
  stateSort(event?: any) {
    this.selectModule.stateSort = event;
    this.getUserList();
  }

  /**
   * 筛选
   */
  stateFilter(event?: any) {
    this.selectModule.state = event;
    this.getUserList();
  }

  lockSort(event?: any) {
    this.selectModule.lockedSort = event;
    this.getUserList();
  }
  lockFilter(event?: any) {
    this.selectModule.locked = event;
    this.getUserList();
  }

}
