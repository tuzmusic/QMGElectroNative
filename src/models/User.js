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
    user.memberType = obj.capabilities.employer ? "provider" : "user";
    user.avatarUrl = obj.avatar;
    return user;
  }
}
