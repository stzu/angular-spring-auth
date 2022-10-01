export class User {

  public username: string;

  public permissions: string[];

  constructor(username: string, permissions: string[]) {
    this.username = username;
    this.permissions = permissions;
  }

}
