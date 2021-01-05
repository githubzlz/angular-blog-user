export class MenuModule {
  constructor(
    public level?: number,
    public title?: string,
    public url?: string,
    public icon?: string,
    public open?: boolean,
    public selected?: boolean,
    public disabled?: boolean,
    public children?: MenuModule[]
  ) {}

  /**
   * 路由导航设置
   */
  public static catalog: MenuModule[] = [
    {
      level: 1,
      title: '主页',
      icon: 'home',
      url: '/index/index',
    },
    {
      level: 1,
      title: '用户信息',
      icon: 'idcard',
      open: false,
      children: [
        {
          level: 2,
          title: '个人中心',
          icon: 'user',
          url: '/user/basicuserinfo',
        },
        {
          level: 2,
          title: '权限信息',
          icon: 'safety',
          url: '/user/safetyinfo',
        },
      ],
    },
    {
      level: 1,
      title: '博客信息',
      icon: 'book',
      children: [
        {
          level: 2,
          title: '博客列表',
          icon: 'unordered-list',
          url: '/blog/bloglist',
        },
        {
          level: 2,
          title: '推荐管理',
          icon: 'line-chart',
          url: '/blog/blogstatistic',
        },
        {
          level: 2,
          title: '分类管理',
          icon: 'cluster',
          url: '/blog/typemanage',
        },
      ],
    },
    {
      level: 1,
      title: '写博客',
      icon: 'read',
      open: false,
      children: [
        {
          level: 2,
          title: '写博客',
          icon: 'edit',
          url: '/write/write',
        },
        {
          level: 2,
          title: '回收站',
          icon: 'rest',
          url: '/write/recycle',
        },
      ],
    },
    {
      level: 1,
      title: '关于网站',
      icon: 'info-circle',
      url: '/webinfo',
    },
  ];
}
