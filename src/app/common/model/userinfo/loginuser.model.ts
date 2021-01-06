import {PageInfoModel} from '../commonmodel/pageInfo.model';

export class LoginUser {
  public username?: string;
  public id?: string;
  public email?: string;
  public phone?: string;
  public password?: string;
  public checkCode?: string;
  public creator?: string;
  public createdTime?: string;
  public lastModifier?: string;
  public lastModifiedTime?: string;
  public state?: number;
  public locked?: number;
  public pageInfo?: PageInfoModel;
  public roles: any[];

  public role: string;
  public stateSort: any;
  public lockedSort: any;
  constructor() {
    this.username = '';
  }
}
