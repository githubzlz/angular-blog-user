import { Component, OnInit } from '@angular/core';
import { MenuModule } from './menu.conf';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public menus: MenuModule[] = MenuModule.catalog;
  public data: any;
  isCollapsed = false;
  constructor(
    private router: Router,
    private message: NzMessageService
  ) {}
  ngOnInit() {
  }


  // /**
  //  * 点击进行路由跳转，并将data数据传出
  //  */
  // routerOut(url: string) {
  //   this.routeOutLet(url, this.data);
  //   console.log(url);
  // }

  // /**
  //  * 路由跳转并且传值
  //  */
  // routeOutLet(url: string, data: any) {
  //   this.router.navigate([url], {
  //     skipLocationChange: true,
  //     queryParams: {
  //       data: JSON.stringify(data),
  //     },
  //   });
  // }
}
