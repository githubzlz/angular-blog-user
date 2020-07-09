import { Component, OnInit } from '@angular/core';
import { BarStatisticsInfoModel } from 'src/app/common/model/index-statistics/bar.model';
import { PieStatisticsInfoModel } from 'src/app/common/model/index-statistics/pie.model';
import { LineStatisticsInfoModel } from 'src/app/common/model/index-statistics/line.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  barStatisticsInfoModel: BarStatisticsInfoModel = new BarStatisticsInfoModel();
  pieStatisticsInfoModel: PieStatisticsInfoModel = new PieStatisticsInfoModel();
  lineStatisticsInfoModel: LineStatisticsInfoModel = new LineStatisticsInfoModel();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getMoreBlogInfo() {
    this.router.navigate(['/blog/bloglist'], {
      skipLocationChange: false,
    });
  }
  getMoreStatisticInfo() {
    this.router.navigate(['/blog/blogstatistic'], {
      skipLocationChange: false,
    });
  }
}
