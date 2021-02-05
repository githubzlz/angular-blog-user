import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteComponent } from './write/write.component';
import { RecycleComponent } from './recycle/recycle.component';
import {WriteBlogResolve} from '../../common/resolve/WriteBlogResolve';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'write',
  },
  {
    path: 'write',
    component: WriteComponent,
    resolve: {
      write: WriteBlogResolve
    }
  },
  {
    path: 'recycle',
    component: RecycleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteRoutingModule {}
