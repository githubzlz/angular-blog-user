export class ResultSetModel {
  public code?: number;
  public entity?: any;
  public message?: string;
  constructor() {}
  static isSuccess(result: ResultSetModel) {
    return result && result.code === 1;
  }
}
