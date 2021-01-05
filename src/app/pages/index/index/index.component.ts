import {AfterViewInit, Component, OnInit} from '@angular/core';
import { BarStatisticsInfoModel } from 'src/app/common/model/index-statistics/bar.model';
import { PieStatisticsInfoModel } from 'src/app/common/model/index-statistics/pie.model';
import { LineStatisticsInfoModel } from 'src/app/common/model/index-statistics/line.model';
import { Router } from '@angular/router';
import echarts0 from 'echarts';

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
  echarts: any;
  myChart: any;
  myChart2: any;

  ngOnInit(): void {
    this.echarts = echarts0;
    this.myChart = this.echarts.init(document.getElementById('chart1') as HTMLDivElement);
    this.myChart.setOption(this.barStatisticsInfoModel.blogNumber);

    this.myChart2 = this.echarts.init(document.getElementById('chart2') as HTMLDivElement);
    this.myChart2.clear();
    this.myChart2.setOption(this.lineStatisticsInfoModel.option);

    this.myChart2 = this.echarts.init(document.getElementById('chart3') as HTMLDivElement);
    this.myChart2.clear();
    this.myChart2.setOption(this.barStatisticsInfoModel.option);

    this.myChart2 = this.echarts.init(document.getElementById('chart4') as HTMLDivElement);
    this.myChart2.clear();
    this.myChart2.setOption(this.pieStatisticsInfoModel.option);
  }

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
  onValueChange(data) {};
  onPanelChange(data) {};
}
