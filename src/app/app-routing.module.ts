import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginCanActivate} from './common/util/login.canactivate';
import {LoginComponent} from './core/login/login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginCanActivate],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  }, {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
