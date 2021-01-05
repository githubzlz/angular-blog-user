export class BlogStatisticsModel {
  /**
   * id
   */
  public id?: string;

  /**
   * 文章id
   */
  public blogId?: string;

  /**
   * 星星数量
   */
  public stars?: number;

  /**
   * 点赞数量
   */
  public goods?: number;

  /**
   * 评论数量
   */
  public comments?: number;

  /**
   * 阅读数量
   */
  public readings?: number;

  /**
   * 收藏数量
   */
  public collect?: number;
  constructor() {}
}
