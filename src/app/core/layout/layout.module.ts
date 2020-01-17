import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    ShareModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule {
  constructor() {
  }
 }
