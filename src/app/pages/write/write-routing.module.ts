import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteComponent } from './write/write.component';
import { MoreComponent } from './more/more.component';

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
    path: 'more',
    component: MoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteRoutingModule {}
