export class BarStatisticsInfoModel {
  public option?: any;
  public blogNumber?: any;
  constructor() {
    this.option = {
      title: {
        text: '近15天创作量统计',
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: [
          '6/21',
          '6/22',
          '6/23',
          '6/24',
          '6/25',
          '6/26',
          '6/27',
          '6/21',
          '6/22',
          '6/23',
          '6/24',
          '6/25',
          '6/26',
          '6/27',
          '6/27',
        ],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '文章数量',
          barWidth: '60%',
          data: [12, 20, 15, 8, 7, 11, 13, 12, 20, 15, 8, 7, 11, 13, 4],
          type: 'bar',
        },
      ],
    };
    this.blogNumber = {
      title: {
        text: '文章数量统计',
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: ['JAVA', 'PYTHON', 'C++', 'MYSQL', 'ORICLE'],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '文章数量',
          barWidth: '60%',
          data: [12, 20, 15, 8, 7],
          type: 'bar',
        },
      ],
    };
  }
}
