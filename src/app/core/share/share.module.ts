import { NgModule } from '@angular/core';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, IconsProviderModule, NgZorroAntdModule],
  exports: [CommonModule, IconsProviderModule, NgZorroAntdModule],
})
export class ShareModule {}
