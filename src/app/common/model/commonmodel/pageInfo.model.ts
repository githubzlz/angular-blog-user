import { OrderItemModel } from './orderItem.model';

export class PageInfoModel {
  /**
   * 当前页码
   */
  pageNum?: any;

  /**
   * 每页的数据数量
   */
  pageSize?: any;

  /**
   * 数据总量
   */
  totalSize?: any;

  /**
   * 按当前分页数量分页，共有的页数
   */
  totalPageNum?: any;

  /**
   * 排序字段
   */
  orders?: Array<OrderItemModel>;

  /**
   * 筛选字段
   */
  exclude?: Array<any>;

  /**
   * 封装查询到的信息
   */
  list?: Array<any>;
  constructor() {
    this.exclude = new Array();
    this.pageNum = 1;
    this.pageSize = 10;
  }
}
