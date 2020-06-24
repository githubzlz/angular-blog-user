import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { BlogComponent } from './blog/blog.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
  },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {
  constructor() {}
}
