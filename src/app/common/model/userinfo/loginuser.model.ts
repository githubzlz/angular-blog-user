export class LoginUser {
  constructor(
    public name: string,
    public authorities: Array<string>,
    clients: Array<string>,
    id: string
  ) {
    this.name = '';
  }
}
