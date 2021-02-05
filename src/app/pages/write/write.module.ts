import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteRoutingModule } from './write-routing.module';
import { WriteComponent } from './write/write.component';
import { ShareModule } from 'src/app/core/share/share.module';
import { EditorMdModule } from 'src/app/core/editormd/editor-md.module';
import { FormsModule } from '@angular/forms';
import { RecycleComponent } from './recycle/recycle.component';
import {WriteBlogResolve} from '../../common/resolve/WriteBlogResolve';

@NgModule({
  declarations: [WriteComponent, RecycleComponent],
  imports: [
    CommonModule,
    ShareModule,
    EditorMdModule,
    FormsModule,
    WriteRoutingModule,
  ],
  providers:[
    WriteBlogResolve
  ]
})
export class WriteModule {}
