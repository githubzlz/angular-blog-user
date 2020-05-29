import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { ShareModule } from 'src/app/core/share/share.module';
import { UserComponent } from './user/user.component';
import { BlogComponent } from './blog/blog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent, BlogComponent],
  imports: [CommonModule, ShareModule, FormsModule, IndexRoutingModule],
})
export class IndexModule {
  constructor() {}
}
