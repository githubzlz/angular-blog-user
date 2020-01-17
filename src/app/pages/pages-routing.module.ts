import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../core/layout/layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  {
    path: 'index',
    component: LayoutComponent,
    children: [
    {
      path: '', loadChildren: () => import('../pages/index/index.module').then(m => m.IndexModule),
    }
  ]},
  {
    path: 'write',
    component: LayoutComponent,
    children: [
    {
      path: '', loadChildren: () => import('../pages/write/write.module').then(m => m.WriteModule),
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
  constructor() {
  }
 }
