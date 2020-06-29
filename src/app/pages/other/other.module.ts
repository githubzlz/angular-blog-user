import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/core/share/share.module';
import { EditorMdModule } from 'src/app/core/editormd/editor-md.module';
import { FormsModule } from '@angular/forms';
import { OtherRoutingModule } from './other-routing.module';
import { DetailBlogInfoComponent } from './blog-info-detail/detailBlogInfo.component';

@NgModule({
  declarations: [DetailBlogInfoComponent],
  imports: [
    CommonModule,
    ShareModule,
    EditorMdModule,
    FormsModule,
    OtherRoutingModule,
  ],
})
export class OtherModule {}
