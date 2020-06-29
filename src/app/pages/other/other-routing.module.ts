import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailBlogInfoComponent } from './blog-info-detail/detailBlogInfo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'blogdetailinfo',
  },
  {
    path: 'blogdetailinfo',
    component: DetailBlogInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherRoutingModule {
  constructor() {}
}
