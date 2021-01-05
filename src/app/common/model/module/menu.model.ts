import {PageInfoModel} from '../commonmodel/pageInfo.model';
import {BlogModel} from "../article/blog.model";

export class MenuModel {

  /**
   * 目录id
   */
  public id: string;

  /**
   * 模块id
   */
  public moduleId: string;

  /**
   * 目录名
   */
  public name: string;

  /**
   * 文章
   */
  public blogList: Array<BlogModel>;

  /**
   * 是否展示输入框
   */
  public showInput = false;

  public creator: string;

  public createdTime: string;

  public lastModifier: string;

  public lastModifiedTime: string;

  public pageInfo: PageInfoModel;

  constructor() {
  }
}
