export class LineStatisticsInfoModel {
  public option?: any;
  constructor() {
    this.option = {
      title: {
        text: '浏览量统计',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['点赞', '粉丝', '星星'],
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
        boundaryGap: false,
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
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '点赞',
          type: 'line',
          stack: '总量',
          data: [
            120,
            135,
            159,
            200,
            210,
            230,
            250,
            255,
            289,
            312,
            350,
            487,
            699,
            800,
            1056,
          ],
        },
        {
          name: '粉丝',
          type: 'line',
          stack: '总量',
          data: [
            12,
            24,
            48,
            82,
            156,
            166,
            179,
            200,
            210,
            231,
            240,
            256,
            368,
            480,
            560,
          ],
        },
        {
          name: '星星',
          type: 'line',
          stack: '总量',
          data: [
            150,
            232,
            201,
            154,
            190,
            330,
            410,
            120,
            132,
            101,
            134,
            90,
            230,
            210,
            210,
          ],
        },
      ],
    };
  }
}
