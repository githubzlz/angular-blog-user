import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { ShareModule } from 'src/app/core/share/share.module';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    IndexRoutingModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
})
export class IndexModule {
  constructor() {}
}
