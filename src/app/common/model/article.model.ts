export class ArticleModel {
  constructor(
    public title?: string,
    public md?: string,
    public summary?: string,
    public types?: number[],
    public tags?: string[],
    public visibleStrategy?: number,
    public provenance?: number,
    public html?: string,
  ) { }
}
