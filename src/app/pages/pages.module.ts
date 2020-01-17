import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutModule } from '../core/layout/layout.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    PagesRoutingModule,
  ]
})
export class PagesModule {
  constructor() {
  }
 }
