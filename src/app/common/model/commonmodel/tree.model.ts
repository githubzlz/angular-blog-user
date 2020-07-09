export class TreeMoel {
  constructor() {
    this.write = false;
  }
  public id?: string;

  /**
   * 父级id
   */
  public pId?: string;

  /**
   * 名称
   */
  public name?: string;

  /**
   * 本级树的数据
   */
  public data?: any;

  /**
   * 子级数据
   */
  public children?: Array<TreeMoel>;

  public write?: boolean;
}
