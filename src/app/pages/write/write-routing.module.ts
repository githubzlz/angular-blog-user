import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteComponent } from './write/write.component';
import { RecycleComponent } from './recycle/recycle.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'write',
  },
  {
    path: 'write',
    component: WriteComponent,
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
