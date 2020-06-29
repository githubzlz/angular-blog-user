import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../core/layout/layout.component';
import { WebInfoComponent } from './web-info/web-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/index/index.module').then((m) => m.IndexModule),
      },
    ],
  },
  {
    path: 'user',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'blog',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/blog/blog.module').then((m) => m.BlogModule),
      },
    ],
  },
  {
    path: 'other',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/other/other.module').then((m) => m.OtherModule),
      },
    ],
  },
  {
    path: 'write',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/write/write.module').then((m) => m.WriteModule),
      },
    ],
  },
  {
    path: 'webinfo',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: WebInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
  constructor() {}
}
