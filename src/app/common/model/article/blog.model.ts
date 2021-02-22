import { BlogContentModel } from './blogContent.model';
import { PageInfoModel } from '../commonmodel/pageInfo.model';
import { BlogTagModel } from '../tag/blogTag.model';
import {BlogStatisticsModel} from './blogStatistics.model';

export class BlogModel {
  constructor() {
    this.blogStatistics = new BlogStatisticsModel();
    this.blogContent = new BlogContentModel();
    this.pageInfo = new PageInfoModel();
    this.blogRecommend = {
      id: null,
      recommendType: null,
      imageUrl: null,
      createdTime: null
    };
    this.checked = false;
    this.expand = false;
    this.fileList = new Array<any>();
    this.categoryIds = [];
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
  public tags?: Array<any>;

  /**
   * 标签的集合
   */
  public tags2?: Array<BlogTagModel>;

  /**
   * 文章浏览信息
   */
  public blogStatistics?: BlogStatisticsModel;

  /**
   * 文章内容
   */
  public blogContent?: BlogContentModel;

  public blogPublicInfos: any;

  public createdTime?: Date;

  public pageInfo?: PageInfoModel;

  public creator?: string;

  public blogType?: string;

  public blogRecommend?: {
    id: string,
    recommendType: number,
    imageUrl: string,
    createdTime: string,
  };
  public checked?: boolean;
  public expand?: boolean;
  public fileList?: any[];

  /**
   * 模块
   */
  public categoryIds: string[];
}
