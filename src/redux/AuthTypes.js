// @flow
import User from "../models/User";

export type AuthState = {
  user: ?User,
  isLoading: boolean,
  error: ?Error
};

export type AuthAction =
  | LOGIN_START
  | LOGOUT_START
  | REGISTRATION_START
  | LOGIN_SUCCESS
  | REGISTRATION_SUCCESS
  | SET_USER
  | LOGOUT_SUCCESS
  | LOGIN_FAILURE
  | LOGOUT_FAILURE
  | REGISTRATION_FAILURE
  | CLEAR_AUTH_ERROR;

export type LOGIN_START = { type: "LOGIN_START", creds: LoginParams };
export type LOGOUT_START = { type: "LOGOUT_START" };
export type REGISTRATION_START = {
  type: "REGISTRATION_START",
  info: RegParams
};
export type LOGIN_SUCCESS = { type: "LOGIN_SUCCESS", user: User };
export type REGISTRATION_SUCCESS = { type: "REGISTRATION_SUCCESS", user: User };
export type SET_USER = { type: "SET_USER", user: User };
export type LOGOUT_SUCCESS = { type: "LOGOUT_SUCCESS" };
export type LOGIN_FAILURE = { type: "LOGIN_FAILURE", error: Error };
export type LOGOUT_FAILURE = { type: "LOGOUT_FAILURE", error: Error };
export type REGISTRATION_FAILURE = {
  type: "REGISTRATION_FAILURE",
  error: Error
};
export type CLEAR_AUTH_ERROR = { type: "CLEAR_AUTH_ERROR" };

export type RegParams = {
  email: string,
  username: string,
  password: string,
  memberType: "user" | "provider",
  firstName: string,
  lastName: string
};
export type LoginParams = {
  email?: string,
  username?: string,
  password: string
};
