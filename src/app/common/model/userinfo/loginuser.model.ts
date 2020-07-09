export class LoginUser {
  public name?: string;
  public authorities?: Array<string>;
  public clients?: Array<string>;
  public id?: string;
  public email?: string;
  public phone?: string;
  constructor() {
    this.name = '';
  }
}
