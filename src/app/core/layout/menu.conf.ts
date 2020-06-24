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
      title: '写博客',
      icon: 'home',
      url: '/write/write',
    },
    {
      level: 1,
      title: '用户信息',
      icon: 'home',
      open: false,
      children: [
        {
          level: 2,
          title: '用户信息',
          icon: 'home',
          url: '/index/user',
        },
      ],
    },
    {
      level: 1,
      title: '博客信息',
      icon: 'home',
      children: [
        {
          level: 2,
          title: '博客信息',
          icon: 'home',
          url: '/index/blog',
        },
        {
          level: 2,
          title: '更多',
          icon: 'home',
          url: '/write/more',
        },
      ],
    },
  ];
}
