export class User {

  public username: string;

  public permissions: string[];

  public hasPermission(permission: string): boolean {
    return this.permissions.some(item => item === permission);
  }

  constructor(username: string, permissions: string[]) {
    this.username = username;
    this.permissions = permissions;
  }

}
