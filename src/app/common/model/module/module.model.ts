import {PageInfoModel} from '../commonmodel/pageInfo.model';
import {MenuModel} from './menu.model';

export class ModuleModel {

  /**
   * 模块id
   */
  public id: string;

  /**
   * 模块标题
   */
  public title: string;

  /**
   * 模块介绍
   */
  public introduction: string;

  /**
   * 模块图片路径
   */
  public imageUrl: string;

  /**
   * 0 不发布 1发布
   */
  public isPublish: number;

  /**
   * 0 未删除 1 删除
   */
  public isDeleted: number;

  /**
   * 菜单
   */
  public menus: Array<MenuModel>;

  /**
   * 是否展示输入框
   */
  public showInput = false;

  /**
   * 父级id
   */
  public parentId: string;

  /**
   * 层级
   */
  public level: number;

  /**
   * 子级数量
   */
  public isLastLevel: number;

  public blogAmount: number;

  public blogAmountTotal: number;

  public childCategoryAmountTotal: number;

  public creator: string;

  public createdTime: string;

  public lastModifier: string;

  public lastModifiedTime: string;

  public pageInfo: PageInfoModel;

  public isExpand: boolean;

  public children: ModuleModel[];

  public blogs: string[];

  constructor() {
    this.isExpand = false;
  }
}
