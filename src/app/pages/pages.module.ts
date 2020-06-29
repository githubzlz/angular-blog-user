import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutModule } from '../core/layout/layout.module';
import { WebInfoComponent } from './web-info/web-info.component';

@NgModule({
  declarations: [WebInfoComponent],
  imports: [CommonModule, LayoutModule, PagesRoutingModule],
})
export class PagesModule {
  constructor() {}
}
