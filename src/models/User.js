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
    if (!obj) return;
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

  static fromStationOwnerResponse(obj: Object): User {
    const user = new User();
    user.id = Number(obj.ID);
    user.username = obj.user_login;
    user.email = obj.user_email;
    user.url = obj.user_url;
    user.registeredStr = obj.user_registered;
    const [firstName, lastName] = obj.display_name.split(" ");
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }

  static fromApi(obj: Object): User {
    // debugger;
    const user = new User();

    // I've written this to work with login || register APIs.
    // TO=DO: unify these APIs!!! Also the stationOwnerResponse API, which I've written my own function for

    user.id = obj.id || obj.user_id; // because two different API responses? Don't I have the power to make them consistent?
    user.username = obj.username;
    user.email = obj.email;
    user.url = obj.url; // login API only
    user.registeredStr = obj.registered; // login API only
    user.firstName = obj.firstname || obj.first_name;
    user.lastName = obj.lastname || obj.last_name;
    user.description = obj.description;

    if (obj.capabilities)
      // login API
      user.memberType = obj.capabilities?.employer ? "provider" : "user";

    if (obj.subscriptions?.length)
      // register API
      user.memberType =
        obj.subscriptions[0].subscription_plan_id === "986"
          ? "provider"
          : "user";

    user.avatarUrl = obj.avatar; // login API only
    return user;
  }

  get fullName() {
    // return this.firstName;
    return [this.firstName, this.lastName].join(" ");
  }
}
