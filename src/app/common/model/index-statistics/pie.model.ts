export class PieStatisticsInfoModel {
  public option?: any;

  constructor() {
    this.option = {
      title: {
        text: '文章类型点赞贡献量统计',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 'middle',
        data: ['JAVA', 'PYTHON', 'C++', 'MYSQL', 'ORICLE'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      series: [
        {
          name: '获赞量',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 335, name: 'JAVA' },
            { value: 310, name: 'PYTHON' },
            { value: 234, name: 'C++' },
            { value: 135, name: 'MYSQL' },
            { value: 1548, name: 'ORICLE' },
          ],
        },
      ],
    };
  }
}
