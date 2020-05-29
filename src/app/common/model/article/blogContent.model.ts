export class BlogContentModel {
  /**
   * id
   */
  public id?: string;

  /**
   * 文章id
   */
  public blogId?: string;

  /**
   * html
   */
  public contentHtml?: string;

  /**
   * md
   */
  public contentMd?: string;

  /**
   * html的大小
   */
  public htmlSize?: string;

  /**
   * md的大小
   */
  public mdSize?: string;
  constructor() {}
}
