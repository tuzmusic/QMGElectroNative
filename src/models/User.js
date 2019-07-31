// @flow

export default class User {
  id: number;
  username: string;
  email: string;
  url: string;
  registeredStr: string;
  firstName: string;
  lastName: string;
  description: string;
  memberType: "user" | "provider";
  avatarUrl: string;

  constructor(obj: Object) {
    this.id = obj.id;
    this.username = obj.username;
    this.email = obj.email;
    this.url = obj.url;
    this.registeredStr = obj.registeredStr;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.description = obj.description;
    this.memberType = obj.memberType;
    this.avatarUrl = obj.avatarUrl;
  }

  static fromApi(obj: Object): User {
    const user = new User();
    user.id = obj.id;
    user.username = obj.username;
    user.email = obj.email;
    user.url = obj.url;
    user.registeredStr = obj.registered;
    user.firstName = obj.firstname;
    user.lastName = obj.lastname;
    user.description = obj.description;
    user.memberType = obj.capabilities?.employer ? "provider" : "user";
    user.avatarUrl = obj.avatar;
    return user;
  }

  get fullName() {
    // return this.firstName;
    return [this.firstName, this.lastName].join(" ");
  }
}
