import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicUserInfoComponent } from './user-info-basic/basicUserInfo.component';
import { ShareModule } from 'src/app/core/share/share.module';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserInfoSafetyComponent } from './user-info-safety/userInfoSafety.component';
import { UserComponent } from './user-info-safety/user/user.component';
import { RoleComponent } from './user-info-safety/role/role.component';
import { PermissionComponent } from './user-info-safety/permission/permission.component';

@NgModule({
  declarations: [BasicUserInfoComponent, UserInfoSafetyComponent, UserComponent, RoleComponent, PermissionComponent],
  imports: [CommonModule, ShareModule, FormsModule, UserRoutingModule],
})
export class UserModule {}
