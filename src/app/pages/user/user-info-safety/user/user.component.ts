import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../../common/model/userinfo/loginuser.model';
import {UserService} from '../../../../common/service/user/user.service';
import {PageInfoModel} from '../../../../common/model/commonmodel/pageInfo.model';
import {ResultSetModel} from '../../../../common/model/commonmodel/resultset.model';
import {RoleService} from '../../../../common/service/user/role.service';
import {RoleModel} from '../../../../common/model/userinfo/role.model';

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
  roleShowModal = false;

  roles: Array<RoleModel>;
  removeRoles: Array<RoleModel>;
  constructor(private userService: UserService,
              private roleService: RoleService) {
    this.resetUserSelectModule();
    this.removeRoles = new Array<RoleModel>(10);
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

  /**
   * 打开抽屉
   */
  openRoleModal(userId: string) {
    console.log(userId);
    this.roleShowModal = true;
    this.roleService.userList(userId).subscribe(data => {
      const result: ResultSetModel = data;
      if (ResultSetModel.isSuccess(result)) {
        this.roles = result.entity;
        this.roles.forEach(role => {
          role.visible = true;
        });
      }
    });
  }

  /**
   * 暂时移除角色
   * @param index index
   */
  removeRole(index: number) {
    this.removeRoles.push(this.roles[index]);
    this.roles[index].visible = false;
  }

  handleModalOk() {
    this.roleShowModal = false;
  }

  handleModalClose() {
    this.roleShowModal = false;
  }

  confirmToOtherPage() {

  }
  cancelToOtherPage() {

  }
}
