export class BlogTypeModel {
  /**
   * 用户名
   */
  public userId?: string;

  /**
   * 分类名称
   */
  public typeName?: string;

  /**
   * 分类等级
   */
  public level?: number;

  /**
   * 分类父级id
   */
  public pId?: string;

  /**
   * 分级码
   */
  public levelCode?: string;

  public id?: string;
  constructor() {}
}
