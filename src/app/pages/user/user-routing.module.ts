import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicUserInfoComponent } from './user-info-basic/basicUserInfo.component';
import { UserInfoSafetyComponent } from './user-info-safety/userInfoSafety.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'basicuserinfo',
  },
  {
    path: 'basicuserinfo',
    component: BasicUserInfoComponent,
  },
  {
    path: 'safetyinfo',
    component: UserInfoSafetyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
  constructor() {}
}
