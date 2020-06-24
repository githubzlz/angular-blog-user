import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteRoutingModule } from './write-routing.module';
import { WriteComponent } from './write/write.component';
import { ShareModule } from 'src/app/core/share/share.module';
import { EditorMdModule } from 'src/app/core/editormd/editor-md.module';
import {FormsModule} from '@angular/forms';
import { MoreComponent } from './more/more.component';


@NgModule({
  declarations: [WriteComponent, MoreComponent],
  imports: [
    CommonModule,
    ShareModule,
    EditorMdModule,
    FormsModule,
    WriteRoutingModule
  ]
})
export class WriteModule { }
