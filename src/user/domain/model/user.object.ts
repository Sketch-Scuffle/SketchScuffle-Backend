export class UserObject {
  declare id: string;
  declare nick: string;
  declare avatarUrl: string;

  constructor(id: string, nick: string, avatarUrl: string) {
    this.id = id;
    this.nick = nick;
    this.avatarUrl = avatarUrl;
  }
}
