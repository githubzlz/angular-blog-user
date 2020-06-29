import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicUserInfoComponent } from './user-info-basic/basicUserInfo.component';
import { ShareModule } from 'src/app/core/share/share.module';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserInfoSafetyComponent } from './user-info-safety/userInfoSafety.component';

@NgModule({
  declarations: [BasicUserInfoComponent, UserInfoSafetyComponent],
  imports: [CommonModule, ShareModule, FormsModule, UserRoutingModule],
})
export class UserModule {}
