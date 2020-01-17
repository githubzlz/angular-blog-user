import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'user'
  },
  {
    path: 'user', component: UserComponent
  }, {
    path: 'blog', component: BlogComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
  constructor() {
  }
}
