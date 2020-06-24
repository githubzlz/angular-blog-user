import { BlogPublicInfoModel } from './BlogPublicInfo.model';
import { BlogContentModel } from './blogContent.model';
import { PageInfoModel } from '../commonmodel/pageInfo.model';

export class ArticleModel {
  constructor() {
    this.blogPublicInfos = new BlogPublicInfoModel();
    this.blogContent = new BlogContentModel();
    this.pageInfo = new PageInfoModel();
  }
  /**
   * id
   */
  public id?: string;

  /**
   * 创建人
   */
  public username?: any;

  /**
   * 标题
   */
  public title?: any;

  /**
   * 摘要
   */
  public summary?: any;

  /**
   * 作者
   */
  public author?: any;

  /**
   * 标签（字符串"，"分割）
   */
  public tag?: any;

  /**
   * 类型（字符串"，"分割）
   */
  public type?: any;

  /**
   *  0 未删除 1 删除
   */
  public isDeleted?: any;

  /**
   * 出处 0 原创 1 转载 2 翻译
   */
  public provenance?: any;

  /**
   * 可见策略 0 所有人 1 粉丝 2 付费
   */
  public visibleStrategy?: any;

  /**
   * 0 不允许 1 允许
   */
  public isShow?: any;

  /**
   * 标签的集合
   */
  public tags?: Array<string>;
  /**
   * 类型的集合
   */
  public types?: Array<string>;

  /**
   * 文章浏览信息
   */
  public blogPublicInfos?: BlogPublicInfoModel;

  /**
   * 文章内容
   */
  public blogContent?: BlogContentModel;

  public createdTime?: Date;

  public pageInfo?: PageInfoModel;

  public creator?: string;
}
